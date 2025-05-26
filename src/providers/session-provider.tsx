"use client"

import {useSessionStore} from "@/stores/hooks/use-session-store"
import {supabaseClient} from "@/utils/supabase"
import React, {use, useEffect, useState} from "react"
import {produce} from "immer"
import {Session} from "@supabase/supabase-js"
import useUpdateEffect from "beautiful-react-hooks/useUpdateEffect"
import {selectUser} from "@/services/api/user/select-user"
import {insertUser} from "@/services/api/user/insert-user"

type SessionProviderProps = {
	children: React.ReactNode
	className?: string
}

function SessionProvider({children, className}: SessionProviderProps) {
	const {session, setSession} = useSessionStore()
	const [isLoading, setIsLoading] = useState(true)

	const handleSessionChange = async (newSession: Session | null) => {
		if (newSession) {
			const profile = await selectUser({uid: newSession.user.id}).catch(() => null)

			const profileData = profile || {
				uid: newSession.user.id,
				display_name: (newSession.user.user_metadata.name ||
					newSession.user.email?.split("@")[0]) as string,
				photo_url: (newSession.user.user_metadata.picture ||
					newSession.user.user_metadata.avatar_url) as string,
				email: newSession.user.email as string,
			}

			if (!profile) await insertUser(profileData).catch(() => null)
			setSession(
				produce(newSession, (draft) => {
					draft.user.user_metadata = profileData
				}),
			)
		} else setSession(null)
	}

	useEffect(() => {
		supabaseClient.auth.getSession().then(({data: {session}}) => {
			handleSessionChange(session)
			console.log("session", session)
		})

		const {
			data: {subscription},
		} = supabaseClient.auth.onAuthStateChange((_event, session) => {
			handleSessionChange(session)
		})

		return () => subscription.unsubscribe()
	}, [])

	return children
}

export {SessionProvider}

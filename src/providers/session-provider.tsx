"use client"

import {insertUser} from "@/services/api/users/insert-user"
import {selectUser} from "@/services/api/users/select-user"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {supabaseClient} from "@/utils/supabase"
import React, {use, useEffect, useState} from "react"
import {produce} from "immer"
import {Session} from "@supabase/supabase-js"
import useUpdateEffect from "beautiful-react-hooks/useUpdateEffect"

type SessionProviderProps = {
	children: React.ReactNode
	className?: string
}

function SessionProvider({children, className}: SessionProviderProps) {
	const {session, setSession} = useSessionStore()
	const [isLoading, setIsLoading] = useState(true)

	const handleSessionChange = async (newSession: Session | null) => {
		// if (newSession?.access_token === session?.access_token) return
		if (newSession) {
			const profile = await selectUser({uid: newSession.user.id}).catch(() => null)

			const profileData = profile || {
				uid: newSession.user.id,
				displayName: (newSession.user.user_metadata.name ||
					newSession.user.email?.split("@")[0]) as string,
				photoUrl: (newSession.user.user_metadata.picture ||
					newSession.user.user_metadata.avatar_url) as string,
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

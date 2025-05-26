import {Loader} from "@/components/ui/loader"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {cn} from "@/utils/helpers/shadcn-ui"
import {supabaseClient} from "@/utils/supabase"
import {useRouter} from "next/navigation"
import React, {useEffect} from "react"

type Props = {
	children: React.ReactNode
}

function AuthRequired({children}: Props) {
	const router = useRouter()
	const {session} = useSessionStore()

	useEffect(() => {
		supabaseClient.auth.getSession().then(({data: {session}}) => {
			if (!session) {
				router.replace("/auth/sign-in")
			}
		})
	}, [session])

	if (!session)
		return (
			<div className="min-h-screen w-full flex items-center justify-center">
				<Loader
					size={48}
					strokeWidth={1}
					className="text-blue-600"
				/>
			</div>
		)

	return children
}

export {AuthRequired}

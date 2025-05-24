"use client"

import {AuthSignUp} from "@/features/auth/auth-sign-up/auth-sign-up"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {LayoutWrapper} from "@/widgets/layout/layout-wrapper"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {useEffect} from "react"

export default function SignInPage() {
	const {session} = useSessionStore()
	const {replace} = useRouter()

	useEffect(() => {
		if (session) replace("/")
	}, [session])

	return (
		<LayoutWrapper>
			<div className="md:max-w-sm mx-auto max-md:px-12 mt-24 space-y-12">
				{/* Heading */}
				<div className="text-center space-y-1">
					<p className="font-medium text-md">Sign up</p>
				</div>

				<div className="space-y-6">
					<AuthSignUp />
					<p className="text-sm text-gray-500 text-center">
						Already have an account?
						<Link
							className="text-blue-600 hover:underline ml-2"
							href="/auth/sign-in">
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</LayoutWrapper>
	)
}

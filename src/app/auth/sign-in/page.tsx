"use client"

import {AuthSignIn} from "@/features/auth/auth-sign-in/auth-sign-in"
import {useSessionStore} from "@/stores/hooks/use-session-store"
// import {LayoutWrapper} from "@/widgets/layout/layout-wrapper"
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
		// <LayoutWrapper>
		<div className="md:max-w-sm mx-auto max-md:px-12 mt-24 space-y-12">
			{/* Heading */}
			<div className="text-center space-y-1">
				<p className="font-medium text-md">Sign in</p>
				{/* <p className="text-sm leading-[1.5] text-gray-700">
					Welcome back! Sign in to your profile <br />
					And continue your journey!
				</p> */}
			</div>

			<div className="space-y-6">
				<AuthSignIn />
				<p className="text-sm text-gray-500 text-center">
					Don't have an account yet?
					<Link
						className="text-blue-600 hover:underline ml-2"
						href="/auth/sign-up">
						Sign Up
					</Link>
				</p>
			</div>
			{/* 
			<p className="text-xs text-gray-500 text-center">
				By continuing, you automatically agree to our{" "}
				<Link
					className="text-gray-900 hover:underline"
					href="/privacy-policy">
					privacy policy
				</Link>{" "}
				and{" "}
				<Link
					className="text-gray-900 hover:underline"
					href="/offer">
					terms of service
				</Link>
			</p> */}
		</div>
		// </LayoutWrapper>
	)
}

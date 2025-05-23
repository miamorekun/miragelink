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
				<p className="font-medium text-md">Вход в FeedFlux</p>
				<p className="text-sm leading-[1.5] text-gray-700">
					Рады вас видеть! Войдите в профиль FeedFlux <br />И продолжайте свое путешествие!
				</p>
			</div>

			<div className="space-y-6">
				<AuthSignIn />
				<p className="text-sm text-gray-500 text-center">
					Еще не создали аккаунт?
					<Link
						className="text-primary-500 hover:underline ml-2"
						href="/auth/sign-up">
						Регистрация
					</Link>
				</p>
			</div>

			<p className="text-xs text-gray-500 text-center">
				Продолжая вы автоматически соглашаетесь соглашаетесь с нашей{" "}
				<Link
					className="text-gray-900 hover:underline"
					href="/privacy-policy">
					политикой конфиденциальности
				</Link>{" "}
				и{" "}
				<Link
					className="text-gray-900 hover:underline"
					href="/offer">
					договором публичной оферты
				</Link>
			</p>
		</div>
		// </LayoutWrapper>
	)
}

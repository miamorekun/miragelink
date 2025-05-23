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
					<p className="font-medium text-md">Регистрация в FeedFlux</p>
					<p className="text-sm leading-[1.5] text-gray-700">
						Рады вас видеть! Создайте профиль в FeedFlux <br />И продолжайте свое путешествие!
					</p>
				</div>

				<div className="space-y-6">
					<AuthSignUp />
					<p className="text-sm text-gray-500 text-center">
						Уже есть аккаунт?
						<Link
							className="text-primary-500 hover:underline ml-2"
							href="/auth/sign-in">
							Вход
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
		</LayoutWrapper>
	)
}

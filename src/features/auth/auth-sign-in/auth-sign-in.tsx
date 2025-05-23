"use client"

import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {AuthWithOauth} from "../auth-with-oauth"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {InputWithController} from "@/components/ui/input-with-controller"
import {useSessionSignInWithPassword} from "@/services/hooks/session/use-session-sign-in-with-password"
import {Loader} from "@/components/ui/loader"
import {useRouter} from "next/navigation"

type Props = {
	className?: string
}

const formSchema = z.object({
	email: z.string().email("Введите корректный email"),
	password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
})

type TFormSchema = z.infer<typeof formSchema>

function AuthSignIn({className}: Props) {
	// State
	const {push} = useRouter()

	const {control, handleSubmit: onSubmit} = useForm<TFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	// Mutations
	const {mutate: signIn, isPending: isSignInPending} = useSessionSignInWithPassword()

	// Handlers
	const handleSubmit = (data: TFormSchema) => {
		signIn(
			{email: data.email, password: data.password},
			{
				onSuccess(data, variables, context) {
					push("/")
				},
			},
		)
	}

	return (
		<div
			className={cn("space-y-6", className, isSignInPending && "opacity-50 pointer-events-none")}>
			<AuthWithOauth />

			<form
				onSubmit={onSubmit(handleSubmit)}
				className="space-y-6">
				<div className="flex items-center gap-x-6 justify-center">
					<div className="w-full h-[1px] bg-gray-200" />
					<span className="text-sm text-gray-500">Или</span>
					<div className="w-full h-[1px] bg-gray-200" />
				</div>

				<div className="space-y-2">
					<p className="text-xs text-gray-700">Email</p>
					<div>
						<InputWithController
							control={control}
							name="email"
							placeholder="Введите email"
							className="w-full h-[42px] bg-gray-100"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<p className="text-xs text-gray-700">Пароль</p>

					<div>
						<InputWithController
							control={control}
							name="password"
							placeholder="Введите пароль"
							className="w-full h-[42px] bg-gray-100"
							type="password"
						/>
					</div>

					<Link
						className="inline-block text-xs text-gray-700 hover:underline"
						href="/auth/reset-password">
						<p className="text-xs text-gray-500">Забыли пароль?</p>
					</Link>
				</div>

				<Button
					type="submit"
					className="w-full h-[42px]">
					{isSignInPending && <Loader />}
					Войти
				</Button>
			</form>
		</div>
	)
}

export {AuthSignIn}

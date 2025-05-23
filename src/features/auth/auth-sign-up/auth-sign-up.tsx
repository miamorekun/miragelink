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
import {useSessionSignUpWithPassword} from "@/services/hooks/session/use-session-sign-up-with-password"
import {Loader} from "@/components/ui/loader"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {IoAlertCircle} from "react-icons/io5"
import toast from "react-hot-toast"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {useRouter} from "next/navigation"

type Props = {
	className?: string
}

const formSchema = z
	.object({
		email: z.string().email("Введите корректный email"),
		password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
		confirmPassword: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Пароли не совпадают",
		path: ["confirmPassword"],
	})

type TFormSchema = z.infer<typeof formSchema>

function AuthSignUp({className}: Props) {
	// State
	const {push} = useRouter()

	const {control, handleSubmit: onSubmit} = useForm<TFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	})

	// Mutations
	const {
		mutate: signUp,
		isPending: isSignUpPending,
		data: signUpData,
	} = useSessionSignUpWithPassword()

	// Handlers
	const handleSubmit = (data: TFormSchema) => {
		signUp(
			{email: data.email, password: data.password},
			{
				onSuccess: ({data}) => {
					if (data?.user?.email_confirmed_at) {
						toast.success("Ваш аккаунт успешно зарегистрирован!")
						push("/")
					}
				},
			},
		)
	}

	return (
		<div
			className={cn("space-y-6", className, isSignUpPending && "opacity-50 pointer-events-none")}>
			<AuthWithOauth />

			<form
				onSubmit={onSubmit(handleSubmit)}
				className="space-y-6">
				<div className="flex items-center gap-x-6 justify-center">
					<div className="w-full h-[1px] bg-gray-200" />
					<span className="text-sm text-gray-500">Или</span>
					<div className="w-full h-[1px] bg-gray-200" />
				</div>

				{signUpData && signUpData.data?.user?.confirmation_sent_at && (
					<Alert variant="success">
						<AlertTitle>Осталось еще немного!</AlertTitle>
						<AlertDescription>Мы отправили письмо на ваш email для подтверждения.</AlertDescription>
					</Alert>
				)}

				{signUpData && signUpData.data?.user?.email_confirmed_at && (
					<Alert variant="success">
						<AlertTitle>Поздарвляем!</AlertTitle>
						<AlertDescription>Ваш аккаунт успешно зарегистрирован.</AlertDescription>
					</Alert>
				)}

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
				</div>

				<div className="space-y-2">
					<p className="text-xs text-gray-700">Повторите пароль</p>

					<div>
						<InputWithController
							control={control}
							name="confirmPassword"
							placeholder="Введите пароль"
							className="w-full h-[42px] bg-gray-100"
							type="password"
						/>
					</div>
				</div>

				<Button
					type="submit"
					className="w-full h-[42px]">
					{isSignUpPending && <Loader />}
					Зарегистрироваться
				</Button>
			</form>
		</div>
	)
}

export {AuthSignUp}

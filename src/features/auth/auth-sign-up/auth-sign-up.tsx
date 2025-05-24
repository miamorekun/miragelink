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
		email: z.string().email("Please enter a valid email"),
		password: z.string().min(8, "Password must contain at least 8 characters"),
		confirmPassword: z.string().min(8, "Password must contain at least 8 characters"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
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
						toast.success("Your account has been successfully registered!")
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
					<span className="text-sm text-gray-500">or</span>
					<div className="w-full h-[1px] bg-gray-200" />
				</div>

				{signUpData && signUpData.data?.user?.confirmation_sent_at && (
					<Alert variant="success">
						<AlertTitle>Almost there!</AlertTitle>
						<AlertDescription>We've sent a confirmation email to your address.</AlertDescription>
					</Alert>
				)}

				{signUpData && signUpData.data?.user?.email_confirmed_at && (
					<Alert variant="success">
						<AlertTitle>Congratulations!</AlertTitle>
						<AlertDescription>Your account has been successfully registered.</AlertDescription>
					</Alert>
				)}

				<div className="space-y-2">
					<p className="text-xs text-gray-700">Email</p>
					<div>
						<InputWithController
							control={control}
							name="email"
							placeholder="Enter email"
							className="w-full h-[42px] bg-gray-100"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<p className="text-xs text-gray-700">Password</p>

					<div>
						<InputWithController
							control={control}
							name="password"
							placeholder="Enter password"
							className="w-full h-[42px] bg-gray-100"
							type="password"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<p className="text-xs text-gray-700">Confirm Password</p>

					<div>
						<InputWithController
							control={control}
							name="confirmPassword"
							placeholder="Enter password"
							className="w-full h-[42px] bg-gray-100"
							type="password"
						/>
					</div>
				</div>

				<Button
					type="submit"
					className="w-full h-[42px]">
					{isSignUpPending && <Loader />}
					Sign Up
				</Button>
			</form>
		</div>
	)
}

export {AuthSignUp}

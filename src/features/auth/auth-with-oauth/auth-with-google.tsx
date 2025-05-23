import {Button} from "@/components/ui/button"
import {useSessionSignInWithOAuth} from "@/services/hooks/session/use-session-sign-in-with-oauth"
import React from "react"

import {FcGoogle} from "react-icons/fc"

type Props = {
	className?: string
}

function AuthWithGoogle({className}: Props) {
	const {mutate: signInWithOAuth, isPending: isSignInWithOAuthPending} = useSessionSignInWithOAuth()

	return (
		<Button
			disabled={isSignInWithOAuthPending}
			onClick={() => signInWithOAuth({provider: "google"})}
			variant={"outline"}
			className="w-full font-normal">
			<FcGoogle size={16} />
			<span>Войти с Google</span>
		</Button>
	)
}

export {AuthWithGoogle}

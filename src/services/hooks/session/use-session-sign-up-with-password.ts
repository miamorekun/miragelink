import {supabaseClient} from "@/utils/supabase"
import {
	AuthResponse,
	OAuthResponse,
	SignInWithOAuthCredentials,
	SignUpWithPasswordCredentials,
} from "@supabase/supabase-js"
import {UseMutationOptions, useMutation} from "@tanstack/react-query"
import toast from "react-hot-toast"

type Params = SignUpWithPasswordCredentials

export const useSessionSignUpWithPassword = (
	options?: UseMutationOptions<AuthResponse, Error, Params>,
) => {
	return useMutation({
		mutationFn: (params) =>
			supabaseClient.auth.signUp(params).then((res) => {
				if (res.error) {
					throw new Error(res.error.message)
				}
				return res
			}),
		onError: (error) => {
			toast.error(error.message)
		},
		...options,
	})
}

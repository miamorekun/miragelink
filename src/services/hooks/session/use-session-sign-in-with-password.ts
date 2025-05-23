import {supabaseClient} from "@/utils/supabase"
import {AuthResponse, SignInWithPasswordCredentials} from "@supabase/supabase-js"
import {UseMutationOptions, useMutation} from "@tanstack/react-query"
import toast from "react-hot-toast"

type Params = SignInWithPasswordCredentials

export const useSessionSignInWithPassword = (
	options?: UseMutationOptions<AuthResponse, Error, Params>,
) => {
	return useMutation({
		mutationFn: (params) =>
			supabaseClient.auth.signInWithPassword(params).then((res) => {
				if (res.error) throw new Error(res.error.message)
				return res
			}),
		onError(error, variables, context) {
			toast.error(error.message)
		},
		...options,
	})
}

import {supabaseClient} from "@/utils/supabase"
import {OAuthResponse, SignInWithOAuthCredentials} from "@supabase/supabase-js"
import {UseMutationOptions, useMutation} from "@tanstack/react-query"

type Params = SignInWithOAuthCredentials

export const useSessionSignInWithOAuth = (
	options?: UseMutationOptions<OAuthResponse, Error, Params>,
) => {
	return useMutation({
		mutationFn: (params) => supabaseClient.auth.signInWithOAuth(params),
		...options,
	})
}

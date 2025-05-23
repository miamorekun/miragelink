import {supabaseClient} from "@/utils/supabase"
import {AuthError} from "@supabase/supabase-js"
import {UseMutationOptions, useMutation} from "@tanstack/react-query"

type Response = {
	error: AuthError | null
}

export const useSessionSignOut = (options?: UseMutationOptions<Response, Error>) => {
	return useMutation({
		mutationFn: () => supabaseClient.auth.signOut(),
		...options,
	})
}

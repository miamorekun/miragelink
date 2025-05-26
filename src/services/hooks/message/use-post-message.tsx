import {
	postMessage,
	PostMessageParams,
	PostMessageResponse,
} from "@/services/api/message/post-message"
import {useMutation, UseMutationOptions} from "@tanstack/react-query"

export type UsePostMessageParams = PostMessageParams
export type UsePostMessageOptions = UseMutationOptions<
	PostMessageResponse,
	Error,
	PostMessageParams
>

export const usePostMessage = (options?: UsePostMessageOptions) => {
	return useMutation({
		mutationFn: (params) => postMessage(params),
		...options,
	})
}

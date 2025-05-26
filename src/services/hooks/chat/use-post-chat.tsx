import {postChat, PostChatParams, PostChatResponse} from "@/services/api/chat/post-chat"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {useMutation} from "@tanstack/react-query"
import {UseMutationOptions} from "@tanstack/react-query"

export type UsePostChatParams = PostChatParams
export type UsePostChatOptions = UseMutationOptions<PostChatResponse, Error, PostChatParams>

export const usePostChat = (options?: UsePostChatOptions) => {
	return useMutation({
		mutationFn: (params) => postChat(params),
		...options,
	})
}

import {postChat, PostChatParams, PostChatResponse} from "@/services/api/chat/post-chat"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {useMutation} from "@tanstack/react-query"
import {UseMutationOptions} from "@tanstack/react-query"

export type UsePostChatParams = PostChatParams
export type UsePostChatOptions = UseMutationOptions<PostChatResponse, Error, PostChatParams>

export const postChatQueryKey = (params: UsePostChatParams) => {
	return [QueryKeys.CHAT, params.user2Id]
}

export const postChatQueryOptions = (params: UsePostChatParams, options?: UsePostChatOptions) => {
	return {
		queryKey: postChatQueryKey(params),
		queryFn: () => postChat(params),
		...options,
	}
}

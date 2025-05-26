"use client"

import {
	getChatById,
	GetChatByIdParams,
	GetChatByIdResponse,
} from "@/services/api/chat/get-chat-by-id"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {useQuery, UseQueryOptions} from "@tanstack/react-query"

export type UseGetChatByIdParams = GetChatByIdParams
export type UseGetChatByIdOptions = UseQueryOptions<GetChatByIdResponse>

export const getChatByIdQueryKey = (params: UseGetChatByIdParams) => {
	return [QueryKeys.CHAT, params.chatId]
}

export const getChatByIdQueryOptions = (
	params: UseGetChatByIdParams,
	options?: UseGetChatByIdOptions,
) => {
	return {
		queryKey: getChatByIdQueryKey(params),
		queryFn: () => getChatById(params),
		...options,
	}
}
export const useGetChatById = (params: UseGetChatByIdParams, options?: UseGetChatByIdOptions) => {
	return useQuery(getChatByIdQueryOptions(params, options))
}

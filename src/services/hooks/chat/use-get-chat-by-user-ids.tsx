"use client"

import {
	getChatByUserIds,
	GetChatByUserIdsParams,
	GetChatByUserIdsResponse,
} from "@/services/api/chat/get-chat-by-user-ids"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {queryOptions, useQuery, UseQueryOptions} from "@tanstack/react-query"

export type UseGetChatByUserIdsParams = GetChatByUserIdsParams
export type UseGetChatByUserIdsOptions = Partial<UseQueryOptions<GetChatByUserIdsResponse>>

export const getChatByUserIdsQueryKey = (params: UseGetChatByUserIdsParams) => {
	return [QueryKeys.CHAT, params]
}

export const getChatByUserIdsQueryOptions = (
	params: UseGetChatByUserIdsParams,
	options?: UseGetChatByUserIdsOptions,
) => {
	return queryOptions({
		queryKey: getChatByUserIdsQueryKey(params),
		queryFn: () => getChatByUserIds(params),
		retry: false,
		refetchInterval: Infinity,
		...options,
	})
}

export const useGetChatByUserIds = (
	params: UseGetChatByUserIdsParams,
	options?: UseGetChatByUserIdsOptions,
) => {
	return useQuery(getChatByUserIdsQueryOptions(params, options))
}

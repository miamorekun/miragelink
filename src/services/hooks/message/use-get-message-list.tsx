import {
	getMessageList,
	GetMessageListParams,
	GetMessageListResponse,
} from "@/services/api/message/get-message-list"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {queryOptions, useQuery, UseQueryOptions} from "@tanstack/react-query"

export type UseGetMessageListQueryParams = GetMessageListParams
export type UseGetMessageListQueryOptions = Partial<UseQueryOptions<GetMessageListResponse>>

export const getMessageListQueryKey = (params: UseGetMessageListQueryParams) => [
	QueryKeys.MESSAGE,
	params.chatId,
]

export const getMessageListQueryOptions = (
	params: UseGetMessageListQueryParams,
	options?: UseGetMessageListQueryOptions,
) => {
	return queryOptions({
		queryKey: getMessageListQueryKey(params),
		queryFn: () => getMessageList(params),
		...options,
	})
}

export const useGetMessageList = (
	params: UseGetMessageListQueryParams,
	options?: UseGetMessageListQueryOptions,
) => {
	return useQuery(getMessageListQueryOptions(params, options))
}

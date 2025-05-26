import {
	getMessageById,
	GetMessageByIdParams,
	GetMessageByIdResponse,
} from "@/services/api/message/get-message-by-id"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {queryOptions, useQuery, UseQueryOptions} from "@tanstack/react-query"

export type UseGetMessageByIdQueryParams = GetMessageByIdParams
export type UseGetMessageByIdQueryOptions = UseQueryOptions<GetMessageByIdResponse>

export const getMessageByIdQueryKey = (params: UseGetMessageByIdQueryParams) => [
	QueryKeys.MESSAGE,
	params.messageId,
]

export const getMessageByIdQueryOptions = (
	params: UseGetMessageByIdQueryParams,
	options?: UseGetMessageByIdQueryOptions,
) => {
	return queryOptions({
		queryKey: getMessageByIdQueryKey(params),
		queryFn: () => getMessageById(params),
		...options,
	})
}

export const useGetMessageById = (
	params: UseGetMessageByIdQueryParams,
	options?: UseGetMessageByIdQueryOptions,
) => {
	return useQuery(getMessageByIdQueryOptions(params, options))
}

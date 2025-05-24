import {
	getFeedPostList,
	GetFeedPostListParams,
	GetFeedPostListResponseDto,
} from "@/services/api/feed-post/get-feed-post-list"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {queryOptions, useQuery, UseQueryOptions} from "@tanstack/react-query"

export type UseGetFeedPostListParams = GetFeedPostListParams
const getQueryKey = (params: UseGetFeedPostListParams) => [QueryKeys.FEED_POST, params]
export const getGetFeedPostListOptions = (
	params: UseGetFeedPostListParams,
	options?: Partial<UseQueryOptions<GetFeedPostListResponseDto>>,
) => {
	return queryOptions({
		queryKey: getQueryKey(params),
		queryFn: () => getFeedPostList(params),
		...options,
	})
}

export const useGetFeedPostList = (
	params: UseGetFeedPostListParams,
	options?: Partial<UseQueryOptions<GetFeedPostListResponseDto>>,
) => {
	return useQuery(getGetFeedPostListOptions(params, options))
}

import {
	getFeedPostList,
	GetFeedPostListParams,
	GetFeedPostListResponseDto,
} from "@/services/api/feed-post/get-feed-post-list"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {
	InfiniteData,
	infiniteQueryOptions,
	QueryKey,
	queryOptions,
	useInfiniteQuery,
	UseInfiniteQueryOptions,
} from "@tanstack/react-query"

export type UseGetFeedPostInfiniteListParams = Omit<GetFeedPostListParams, "page">

const getQueryKey = (params: UseGetFeedPostInfiniteListParams) => [QueryKeys.FEED_POST, params]

export const getFeedPostInfiniteListOptions = (
	params: UseGetFeedPostInfiniteListParams,
	options?: Partial<
		UseInfiniteQueryOptions<
			GetFeedPostListResponseDto,
			Error,
			InfiniteData<GetFeedPostListResponseDto>
		>
	>,
) => {
	return infiniteQueryOptions({
		queryKey: getQueryKey(params),
		queryFn: ({pageParam}) => getFeedPostList({...params, page: pageParam as number}),
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			return Boolean(lastPage.meta.total >= lastPage.meta.page * lastPage.meta.pageSize)
				? lastPage.meta.page + 1
				: null
		},
		initialPageParam: 1,
		...options,
	})
}

export const useFeedPostInfiniteList = (
	params: UseGetFeedPostInfiniteListParams,
	options?: Partial<
		UseInfiniteQueryOptions<
			GetFeedPostListResponseDto,
			Error,
			InfiniteData<GetFeedPostListResponseDto>
		>
	>,
) => {
	return useInfiniteQuery(getFeedPostInfiniteListOptions(params, options))
}

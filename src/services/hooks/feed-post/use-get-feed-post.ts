import {getFeedPost, GetFeedPostParams} from "@/services/api/feed-post/get-feed-post"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {
	queryOptions,
	useQuery,
	UseQueryOptions,
	useSuspenseQuery,
	UseSuspenseQueryOptions,
} from "@tanstack/react-query"
import {TFeedPost} from "@/types/feed-post.types"

export const getGetFeedPostQueryKey = (id: string) => [QueryKeys.FEED_POST, id]
export const getGetFeedPostOptions = (
	params: GetFeedPostParams,
	options?: Partial<UseQueryOptions<TFeedPost>>,
) => {
	return queryOptions({
		queryKey: getGetFeedPostQueryKey(params.id),
		queryFn: () => getFeedPost(params),
		...options,
	})
}

export const useGetFeedPost = (
	params: GetFeedPostParams,
	options?: Partial<UseQueryOptions<TFeedPost>>,
) => {
	return useQuery(getGetFeedPostOptions(params, options))
}

export const useSuspenseGetFeedPost = (
	params: GetFeedPostParams,
	options?: Partial<UseSuspenseQueryOptions<TFeedPost>>,
) => {
	return useSuspenseQuery(
		getGetFeedPostOptions(params, options) as UseSuspenseQueryOptions<TFeedPost>,
	)
}

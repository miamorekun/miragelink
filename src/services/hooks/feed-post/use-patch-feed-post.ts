import {patchFeedPost, Params} from "@/services/api/feed-post/patch-feed-post"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {getGetFeedPostQueryKey} from "./use-get-feed-post"

export const usePatchFeedPost = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({id, data}: {id: string; data: Params}) => patchFeedPost(id, data),
		onSuccess: (_, {id}) => {
			queryClient.invalidateQueries({queryKey: getGetFeedPostQueryKey(id)})
		},
	})
}

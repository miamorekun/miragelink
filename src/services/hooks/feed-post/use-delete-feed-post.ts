import {deleteFeedPost} from "@/services/api/feed-post/delete-feed-post"
import {useMutation, useQueryClient} from "@tanstack/react-query"

// export const useDeleteFeedPost = () => {
// 	const queryClient = useQueryClient()

// 	return useMutation({
// 		mutationFn: deleteFeedPost,
// 		onSuccess: (_, id) => {
// 			queryClient.invalidateQueries({queryKey: getQueryKey(id)})
// 		},
// 	})
// }

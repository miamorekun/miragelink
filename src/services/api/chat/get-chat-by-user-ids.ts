import {TChat} from "@/types/chat.types"
import {TUser} from "@/types/user.types"
import {supabaseClient} from "@/utils/supabase"

export type GetChatByUserIdsParams = {
	userIds: string[]
}

export type GetChatByUserIdsResponse = TChat | null
export const getChatByUserIds = async (params: GetChatByUserIdsParams) => {
	const {userIds} = params
	const [userId1, userId2] = userIds
	const user1_id = userId1 < userId2 ? userId1 : userId2
	const user2_id = userId1 < userId2 ? userId2 : userId1

	return supabaseClient
		.from("chats")
		.select("*")
		.match({user1_id, user2_id})
		.single()
		.then((res) => {
			if (res.error) throw new Error(res.error.message)
			return res.data as unknown as GetChatByUserIdsResponse
		})
}

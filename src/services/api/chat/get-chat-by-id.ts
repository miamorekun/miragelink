import {supabaseClient} from "@/utils/supabase"
import {TChat} from "../../../types/chat.types"
import {PostgrestSingleResponse} from "@supabase/supabase-js"

export type GetChatByIdParams = {
	chatId: string
}

export type GetChatByIdResponse = TChat

export const getChatById = async (params: GetChatByIdParams): Promise<GetChatByIdResponse> => {
	const {chatId} = params

	try {
		const response: PostgrestSingleResponse<TChat> = await supabaseClient
			.from("chats")
			.select(
				`
        id,
        user1_id,
        user2_id
      `,
			)
			.eq("id", chatId)
			.single()

		if (response.error) {
			console.error("Error fetching chat:", response.error.message)
			throw new Error(response.error.message)
		}

		return response.data
	} catch (error) {
		console.error("Unexpected error in getChatById:", error)
		throw error
	}
}

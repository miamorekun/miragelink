import {supabaseClient} from "@/utils/supabase"
import {TChat} from "../../../types/chat.types"

export type PostChatParams = {
	user2Id: string
}

export type PostChatResponse = TChat

export const postChat = async (params: PostChatParams): Promise<PostChatResponse> => {
	const {user2Id} = params

	try {
		const {
			data: {user},
		} = await supabaseClient.auth.getUser()
		if (!user) throw new Error("User not authenticated")

		const user1Id = user.id

		// Check if a chat already exists between user1Id and user2Id
		const {data: existingChat, error: fetchError} = await supabaseClient
			.from("chats")
			.select("id, user1_id, user2_id")
			.or(
				`and(user1_id.eq.${user1Id},user2_id.eq.${user2Id}),and(user1_id.eq.${user2Id},user2_id.eq.${user1Id})`,
			)
			.single()

		if (fetchError && fetchError.code !== "PGRST116") {
			console.error("Error checking existing chat:", fetchError.message)
			throw new Error(fetchError.message)
		}

		if (existingChat) {
			return existingChat as TChat
		}

		const chatData: Partial<TChat> = {
			user1_id: user1Id < user2Id ? user1Id : user2Id,
			user2_id: user1Id < user2Id ? user2Id : user1Id,
		}

		const {data, error} = await supabaseClient
			.from("chats")
			.insert(chatData)
			.select("id, user1_id, user2_id")
			.single()

		if (error) {
			console.error("Error creating chat:", error.message)
			throw new Error(error.message)
		}

		return data as PostChatResponse
	} catch (error) {
		console.error("Unexpected error in postChat:", error)
		throw error
	}
}

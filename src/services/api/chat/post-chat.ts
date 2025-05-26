import {supabaseClient} from "@/utils/supabase"
import {TChat} from "../../../types/chat.types"

export type PostChatParams = {
	toUserId: string
}

export type PostChatResponse = TChat

export const postChat = async (params: PostChatParams): Promise<PostChatResponse> => {
	const {toUserId} = params

	try {
		const {
			data: {user},
		} = await supabaseClient.auth.getUser()
		if (!user) throw new Error("User not authenticated")

		const userId = user.id
		const user1_id = userId < toUserId ? userId : toUserId
		const user2_id = userId < toUserId ? toUserId : userId

		// Check if a chat already exists between user1Id and user2Id
		const {data: existingChat, error: fetchError} = await supabaseClient
			.from("chats")
			.select("*")
			.match({user1_id, user2_id})
			.single()

		if (fetchError && fetchError.code !== "PGRST116") {
			console.error("Error checking existing chat:", fetchError.message)
			throw new Error(fetchError.message)
		}

		if (existingChat) {
			return existingChat as PostChatResponse
		}

		// Create a new chat
		const chatData: Partial<TChat> = {user1_id, user2_id}
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

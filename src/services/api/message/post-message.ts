import {supabaseClient} from "@/utils/supabase"
import {TMessage} from "../../../types/message.types"

// Function params
export type PostMessageParams = {
	chatId: string
	senderId: string
	content: string
}

// Function response type
export type PostMessageResponse = TMessage

// Post message function
export const postMessage = async (params: PostMessageParams): Promise<PostMessageResponse> => {
	const {chatId, senderId, content} = params

	// Check if the user is authenticated
	const {
		data: {user},
	} = await supabaseClient.auth.getUser()
	if (!user) throw new Error("User not authenticated")

	// Insert the message into the database
	const {data, error} = await supabaseClient
		.from("messages")
		.insert({
			chat_id: chatId,
			sender_id: senderId,
			content,
		})
		.select("*")
		.single()

	if (error) {
		console.error("Error posting message:", error.message)
		throw new Error(error.message)
	}

	if (!data) {
		throw new Error("Failed to post message")
	}

	return data as PostMessageResponse
}

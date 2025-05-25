import { supabaseClient } from "@/utils/supabase";
import { TMessage } from "../../../types/message.types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export type GetMessagesListParams = {
  chatId: string;
};

export type GetMessagesListResponse = TMessage[];

export const getMessagesList = async (
  params: GetMessagesListParams,
): Promise<GetMessagesListResponse> => {
  const { chatId } = params;

  try {
    // Check if the user is authenticated
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const userId = user.id;

    // Check if the chat exists and if the user is part of it
    const { data: chat, error: fetchChatError } = await supabaseClient
      .from("chats")
      .select("id, user1_id, user2_id")
      .eq("id", chatId)
      .single();

    if (fetchChatError) {
      console.error("Error fetching chat:", fetchChatError.message);
      throw new Error(fetchChatError.message);
    }

    if (!chat || (chat.user1_id !== userId && chat.user2_id !== userId)) {
      throw new Error("You do not have permission to access this chat");
    }

    // Retrieve messages for the chat
    const response: PostgrestSingleResponse<TMessage[]> = await supabaseClient
      .from("messages")
      .select(
        `
        id,
        chat_id,
        sender_id,
        content,
        created_at,
        updated_at
      `,
      )
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    if (response.error) {
      console.error("Error fetching messages:", response.error.message);
      throw new Error(response.error.message);
    }

    return response.data as GetMessagesListResponse;
  } catch (error) {
    console.error("Unexpected error in getMessagesList:", error);
    throw error;
  }
};

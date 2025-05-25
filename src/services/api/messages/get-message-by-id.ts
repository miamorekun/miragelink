import { supabaseClient } from "@/utils/supabase";
import { TMessage } from "../../../types/message.types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

// Function params
export type GetMessageByIdParams = {
  chatId: string;
  messageId: string;
};

// Function response type
export type GetMessageByIdResponse = TMessage;

// Get message by ID function
export const getMessageById = async (
  params: GetMessageByIdParams,
): Promise<GetMessageByIdResponse> => {
  const { chatId, messageId } = params;
  const response: PostgrestSingleResponse<TMessage> = await supabaseClient
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
    .eq("id", messageId)
    .single();

  if (response.error) {
    console.error("Error fetching message:", response.error.message);
    throw new Error(response.error.message);
  }
  if (!response.data) {
    throw new Error("Message not found");
  }
  return response.data as GetMessageByIdResponse;
};

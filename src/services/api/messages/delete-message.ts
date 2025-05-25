import { supabaseClient } from "@/utils/supabase";

// Function params
export type DeleteMessageParams = {
  messageId: string;
};

// Function response type
export type DeleteMessageResponse = void;

// Delete message function
export const deleteMessage = async (
  params: DeleteMessageParams,
): Promise<DeleteMessageResponse> => {
  const { messageId } = params;
  const response = await supabaseClient
    .from("messages")
    .delete()
    .eq("id", messageId);

  if (response.error) {
    console.error("Error deleting message:", response.error.message);
    throw new Error(response.error.message);
  }

  if (response.data != null) {
    throw new Error("Message not found or already deleted");
  }

  return;
};

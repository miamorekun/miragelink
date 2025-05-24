export type TChat = {
  id: string; // Chat UUID
  user1_id: string; // First user ID
  user2_id: string; // Second user ID
};

export type TChatForm = {
  user1_id: string;
  user2_id: string;
};

export type TMessage = {
  id: string; // Message UUID
  chat_id: string; // Chat ID (linked Chat.id)
  sender_id: string; // Sender ID (linked auth.users.id)
  content: string; // Message content
  created_at: string; // Time of creation
  updated_at?: string; // Time of last update (optional)
};

export type TMessageForm = {
  chat_id: string;
  content: string;
  sender_id?: string; // Опционально, так как можно взять из auth
};
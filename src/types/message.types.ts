export type TMessage = {
	id: string // Message UUID
	chat_id: string // Chat ID (linked Chat.id)
	sender_id: string // Sender ID (linked auth.users.id)
	content: string // Message content
	created_at: string // Time of creation
	updated_at?: string // Time of last update (optional)
}

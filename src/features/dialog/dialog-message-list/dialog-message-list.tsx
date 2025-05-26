import {useGetChatByUserIds} from "@/services/hooks/chat/use-get-chat-by-user-ids"
import {useGetMessageList} from "@/services/hooks/message/use-get-message-list"
import {cn} from "@/utils/helpers/shadcn-ui"
import {useSearchParams} from "next/navigation"
import React from "react"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {Message} from "@/components/message/message"

type Props = {
	className?: string
}

function DialogMessageList({className}: Props) {
	// const {session} = useSessionStore()
	// const searchParams = useSearchParams()
	// const dialogId = searchParams.get("dialogId")

	// const {data: chat} = useGetChatByUserIds({
	// 	userIds: [session!.user!.id, dialogId!],
	// })

	// const {data: messages} = useGetMessageList({chatId: chat?.id!}, {enabled: !!chat?.id})

	// return (
	// 	<div className={cn(`flex flex-col flex-grow relative`, className)}>
	// 		<div className="absolute inset-0 px-9 overflow-y-auto py-9"></div>
	// 	</div>
	// )

	// State
	const {session} = useSessionStore()
	const searchParams = useSearchParams()
	const dialogId = searchParams.get("dialogId")

	// Queries
	const {data: chat, isPending: isPendingChat} = useGetChatByUserIds(
		{userIds: [session!.user!.id, dialogId!]},
		{enabled: Boolean(session?.user?.id && dialogId)},
	)

	const {data: messages} = useGetMessageList({chatId: chat?.id!}, {enabled: !!chat?.id})

	return (
		<div className={cn("relative", className)}>
			<div className="absolute inset-0 overflow-y-auto py-9 px-9 space-y-3">
				{messages?.map((message) => (
					<Message
						key={message.id}
						message={message}
					/>
				))}
			</div>
		</div>
	)
}

export {DialogMessageList}

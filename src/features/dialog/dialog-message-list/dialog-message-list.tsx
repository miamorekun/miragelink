import {useGetChatByUserIds} from "@/services/hooks/chat/use-get-chat-by-user-ids"
import {useGetMessageList} from "@/services/hooks/message/use-get-message-list"
import {cn} from "@/utils/helpers/shadcn-ui"
import {useSearchParams} from "next/navigation"
import React, {useLayoutEffect, useRef} from "react"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {Message} from "@/components/message/message"

type Props = {
	className?: string
}

function DialogMessageList({className}: Props) {
	// State
	const {session} = useSessionStore()
	const searchParams = useSearchParams()
	const dialogId = searchParams.get("dialogId")
	const containerRef = useRef<HTMLDivElement>(null)

	// Queries
	const {data: chat, isPending: isPendingChat} = useGetChatByUserIds(
		{userIds: [session!.user!.id, dialogId!]},
		{enabled: Boolean(session?.user?.id && dialogId)},
	)

	const {data: messages} = useGetMessageList(
		{chatId: chat?.id!},
		{enabled: !!chat?.id, refetchInterval: 3000},
	)

	useLayoutEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight
		}
	}, [messages])

	return (
		<div className={cn("relative", className)}>
			<div
				ref={containerRef}
				className="absolute inset-0 overflow-y-auto py-9 px-9 space-y-3">
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

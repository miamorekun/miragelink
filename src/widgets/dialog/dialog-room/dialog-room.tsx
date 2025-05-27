"use client"

import {DialogMessageList} from "@/features/dialog/dialog-message-list"
import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {DialogRoomHeader} from "../dialog-room-header"
import {DialogMessageInput} from "@/features/dialog/dialog-message-input"
import {useSearchParams} from "next/navigation"
import {IoChatbox, IoChatboxEllipsesOutline, IoChatboxOutline} from "react-icons/io5"
import {useGetChatByUserIds} from "@/services/hooks/chat/use-get-chat-by-user-ids"
import {useSessionStore} from "@/stores/hooks/use-session-store"

type Props = {
	className?: string
}

function DialogRoom({className}: Props) {
	// const {session} = useSessionStore()
	// const searchParams = useSearchParams()
	// const dialogId = searchParams.get("dialogId")
	// // Queries
	// const {data: chat, isPending: isPendingChat} = useGetChatByUserIds(
	// 	{userIds: [session!.user!.id, dialogId!]},
	// 	{enabled: !!session?.user?.id && !!dialogId},
	// )
	// if (!dialogId)
	// 	return (
	// 		<div className="w-full h-full flex flex-col gap-6 flex-grow justify-center items-center text-blue-900 text-sm">
	// 			<IoChatboxEllipsesOutline size={24} />
	// 			<p>Choose a dialog to start chatting</p>
	// 		</div>
	// 	)
	// return (
	// 	<div className={cn(`w-full h-full flex flex-col flex-grow`, className)}>
	// 		<DialogRoomHeader />
	// 		{chat && <DialogMessageList className="flex-grow flex-1" />}
	// 		{!chat && !isPendingChat && (
	// 			<div className="flex-grow flex flex-col gap-6 justify-center items-center text-blue-900 text-sm">
	// 				<p>No messages yet</p>
	// 			</div>
	// 		)}
	// 		{isPendingChat && (
	// 			<div className="flex-grow flex flex-col gap-6 justify-center items-center text-blue-900 text-sm">
	// 				<p>Loading...</p>
	// 			</div>
	// 		)}
	// 		{!isPendingChat && <DialogMessageInput chat={chat ?? null} />}
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

	return (
		<div className={cn(`flex flex-col`, className)}>
			<DialogRoomHeader />
			<DialogMessageList className="flex-grow" />
			<DialogMessageInput />
		</div>
	)
}

export {DialogRoom}

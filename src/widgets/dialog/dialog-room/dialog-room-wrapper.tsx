import {cn} from "@/utils/helpers/shadcn-ui"
import {useSearchParams} from "next/navigation"
import React from "react"
import {IoChatboxEllipsesOutline} from "react-icons/io5"
import {DialogRoom} from "./dialog-room"
import {useGetChatByUserIds} from "@/services/hooks/chat/use-get-chat-by-user-ids"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {Loader} from "@/components/ui/loader"

type Props = {
	className?: string
}

function DialogRoomWrapper({className}: Props) {
	// State
	const {session} = useSessionStore()

	const searchParams = useSearchParams()
	const dialogId = searchParams.get("dialogId")

	// const {data: chat, isPending: isPendingChat} = useGetChatByUserIds(
	// 	{userIds: [session!.user!.id, dialogId!]},
	// 	{enabled: Boolean(session?.user?.id && dialogId)},
	// )

	return (
		<div className={cn(`bg-white`, className)}>
			{!dialogId && (
				<div className="w-full h-full flex flex-col gap-6 justify-center items-center text-blue-900 text-sm">
					<IoChatboxEllipsesOutline size={24} />
					<p>Choose a dialog to start chatting</p>
				</div>
			)}

			{/* {isPendingChat && (
				<div className="w-full h-full flex flex-col gap-6 justify-center items-center text-blue-900 text-sm">
					<Loader
						strokeWidth={1.5}
						size={24}
						className="text-blue-600"
					/>
					<p>Loading...</p>
				</div>
			)} */}

			{dialogId && (
				<DialogRoom
					key={dialogId}
					className="w-full h-full"
				/>
			)}
		</div>
	)
}

export {DialogRoomWrapper}

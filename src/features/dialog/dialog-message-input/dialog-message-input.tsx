import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {cn} from "@/utils/helpers/shadcn-ui"
import React, {useState} from "react"
import {IoSend} from "react-icons/io5"
import {useGetChatByUserIds} from "@/services/hooks/chat/use-get-chat-by-user-ids"
import {useSearchParams} from "next/navigation"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {TChat} from "@/types/chat.types"
import {usePostChat} from "@/services/hooks/chat/use-post-chat"
import {usePostMessage} from "@/services/hooks/message/use-post-message"
import {Loader} from "@/components/ui/loader"

type Props = {
	className?: string
	// chat: TChat | null
}

function DialogMessageInput({className}: Props) {
	// State
	const {session} = useSessionStore()
	const [value, setValue] = useState("")

	const searchParams = useSearchParams()
	const dialogId = searchParams.get("dialogId")

	// Queries
	const {data: chat, isPending: isPendingChat} = useGetChatByUserIds(
		{userIds: [session!.user!.id, dialogId!]},
		{enabled: Boolean(session?.user?.id && dialogId)},
	)

	// Mutations
	const {mutateAsync: postMessage, isPending: isPendingPostMessage} = usePostMessage()
	const {mutateAsync: postChat, isPending: isPendingPostChat} = usePostChat()

	// Handlers
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// if (!chat) {
		// 	await postChat({toUserId: dialogId!})
		// }
		// await postMessage({chatId: chat!.id, content: value, senderId: session!.user!.id})
	}

	const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	return (
		<form
			onSubmit={onSubmit}
			className={cn(`pb-6 px-9`, className)}>
			<div className="flex items-center gap-x-3">
				<div className="flex-1 focus-within:border-blue-500 hover:border-blue-500 transition-colors border border-gray-200 bg-gray-50 rounded-md h-11 flex items-center gap-x-3 pl-4 pr-1">
					<Input
						disabled={isPendingPostChat || isPendingPostMessage}
						value={value}
						onChange={onChangeInputValue}
						className="w-full h-full placeholder:text-gray-500 text-sm"
						variant="primitive"
						placeholder="Type message..."
					/>
				</div>
				<button
					// onClick={onSubmit}
					className="w-11 h-11 bg-blue-600 flex items-center justify-center rounded-md text-white">
					{/* {isPendingPostChat || isPendingPostMessage ? (
						<Loader
							size={18}
							className="text-white"
						/>
					) : (
						<IoSend
							size={18}
							className="text-xl"
						/>
					)} */}
				</button>
			</div>
		</form>
	)
}

export {DialogMessageInput}

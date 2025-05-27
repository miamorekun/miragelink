import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {cn} from "@/utils/helpers/shadcn-ui"
import React, {ChangeEvent, useState} from "react"
import {IoSend} from "react-icons/io5"
import {useGetChatByUserIds} from "@/services/hooks/chat/use-get-chat-by-user-ids"
import {useSearchParams} from "next/navigation"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {usePostChat} from "@/services/hooks/chat/use-post-chat"
import {usePostMessage} from "@/services/hooks/message/use-post-message"
import {Loader} from "@/components/ui/loader"
import {useQueryClient} from "@tanstack/react-query"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {E2EEncryptorStore} from "@/stores/e2e-encryptor/e2e-encryptor-store"
import {selectUser} from "@/services/api/user/select-user"

type Props = {
	className?: string
}

function DialogMessageInput({className}: Props) {
	const {session} = useSessionStore()
	const [value, setValue] = useState("")
	const searchParams = useSearchParams()
	const dialogId = searchParams.get("dialogId")
	const queryClient = useQueryClient()

	const {data: chat} = useGetChatByUserIds(
		{userIds: [session?.user?.id, dialogId!].filter(Boolean) as string[]},
		{enabled: Boolean(session?.user?.id && dialogId)},
	)

	const {mutateAsync: postMessage, isPending: isPendingPostMessage} = usePostMessage()
	const {mutateAsync: postChat, isPending: isPendingPostChat} = usePostChat()

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!value.trim() || !dialogId || !session?.user?.id) return

		try {
			let chatId = chat?.id
			if (!chatId) {
				const createdChat = await postChat({toUserId: dialogId})
				chatId = createdChat?.id
			}

			const {privateKey: myPrivateKey} = await E2EEncryptorStore.getKeys()
			const toUser = await selectUser({uid: dialogId})
			if (!toUser?.public_key) return

			const toUserPublicKey = await E2EEncryptorStore.importKey(toUser.public_key)
			const encryptedValue = await E2EEncryptorStore.encrypt(value, {
				privateKey: myPrivateKey,
				publicKey: toUserPublicKey,
			})

			const content = {
				iv: encryptedValue.iv,
				ciphertext: btoa(String.fromCharCode(...new Uint8Array(encryptedValue.ciphertext))),
			}

			await postMessage({
				chatId,
				content: JSON.stringify(content),
				senderId: session.user.id,
			})

			setTimeout(() => {
				;[QueryKeys.MESSAGE, QueryKeys.CHAT, QueryKeys.USER].forEach((key) =>
					queryClient.invalidateQueries({queryKey: [key]}),
				)
			}, 100)

			setValue("")
		} catch (error) {
			console.error("Error sending message:", error)
		}
	}

	return (
		<form
			onSubmit={onSubmit}
			className={cn(`pb-6 px-9`, className)}
			autoComplete="off">
			<div className="flex items-center gap-x-3">
				<div className="flex-1 focus-within:border-blue-500 hover:border-blue-500 transition-colors border border-gray-200 bg-gray-50 rounded-md h-11 flex items-center gap-x-3 pl-4 pr-1">
					<Input
						disabled={isPendingPostChat || isPendingPostMessage}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						className="w-full h-full placeholder:text-gray-500 text-sm"
						variant="primitive"
						placeholder="Type message..."
					/>
				</div>
				<Button
					type="submit"
					disabled={isPendingPostChat || isPendingPostMessage || !value}
					className="w-11 h-11 bg-blue-600 flex items-center justify-center rounded-md text-white">
					{isPendingPostChat || isPendingPostMessage ? (
						<Loader
							size={24}
							className="!text-xl text-white"
						/>
					) : (
						<IoSend
							size={24}
							className="!text-xl"
						/>
					)}
				</Button>
			</div>
		</form>
	)
}

export {DialogMessageInput}

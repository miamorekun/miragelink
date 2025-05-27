import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {cn} from "@/utils/helpers/shadcn-ui"
import React, {ChangeEvent, useState} from "react"
import {IoSend} from "react-icons/io5"
import {useGetChatByUserIds} from "@/services/hooks/chat/use-get-chat-by-user-ids"
import {useSearchParams} from "next/navigation"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {TChat} from "@/types/chat.types"
import {usePostChat} from "@/services/hooks/chat/use-post-chat"
import {usePostMessage} from "@/services/hooks/message/use-post-message"
import {Loader} from "@/components/ui/loader"
import {encryptMessage, generateKeyPair} from "@/utils/helpers/crypto.helpers"
import {useGetUserPublicKeyById} from "@/services/hooks/user/use-get-user-public-key-by-id"
import {generateKey} from "crypto"
import {useQueryClient} from "@tanstack/react-query"
import {getMessageListQueryKey} from "@/services/hooks/message/use-get-message-list"

type Props = {
	className?: string
	// chat: TChat | null
}

// Generate a key pair for encryption
const keyPair = await generateKeyPair()
const privateKey = keyPair?.privateKey
if (!privateKey) {
	throw new Error("Private key not found")
}

function DialogMessageInput({className}: Props) {
	// State
	const {session} = useSessionStore()
	const [value, setValue] = useState("")

	const searchParams = useSearchParams()
	const dialogId = searchParams.get("dialogId")
	const queryClient = useQueryClient()

	// Queries
	const {data: chat, isPending: isPendingChat} = useGetChatByUserIds(
		{userIds: [session?.user?.id, dialogId!].filter(Boolean) as string[]},
		{enabled: Boolean(session?.user?.id && dialogId)},
	)

	// Mutations
	const {mutateAsync: postMessage, isPending: isPendingPostMessage} = usePostMessage()
	const {mutateAsync: postChat, isPending: isPendingPostChat} = usePostChat()

	// Handlers
	const {
		data: recipientPublicKey,
		isLoading: isLoadingPublicKey,
		error: publicKeyError,
	} = useGetUserPublicKeyById(dialogId || "")

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Validate inputs
		if (!value.trim() || !dialogId || !session?.user?.id) {
			console.error("Validation failed: Empty message, missing dialogId, or user not logged in")
			return
		}

		//if (publicKeyError) {
		//	console.error("Failed to load recipient public key:", publicKeyError)
		//	return
		//}

		//if (isLoadingPublicKey || !recipientPublicKey) {
		//	console.error("Recipient public key not available")
		//	return
		//}

		try {
			let chatId = chat?.id

			// Create chat if none exists
			if (!chatId) {
				const createdChat = await postChat({toUserId: dialogId})
				chatId = createdChat?.id
				if (!chatId) {
					throw new Error("Failed to create chat")
				}
			}

			// Get sender's private key
			const keyPair = await generateKeyPair()
			const privateKey = keyPair?.privateKey
			if (!privateKey) {
				throw new Error("Sender private key not found")
			}

			// Encrypt message
			//const encrypted = await encryptMessage(value, privateKey, recipientPublicKey)

			// Stringify encrypted content for postMessage
			//const content = JSON.stringify({
			//	iv: Array.from(encrypted.iv),
			//	ciphertext: Array.from(new Uint8Array(encrypted.ciphertext)),
			//})
			const content = value // For simplicity, using plain text here. Replace with encrypted content in prod.
			// Send encrypted message
			await postMessage({
				chatId,
				content,
				senderId: session.user.id,
			})

			// Invalidate message list query to refresh messages
			queryClient.invalidateQueries({
				queryKey: getMessageListQueryKey({
					chatId: chat!.id,
				}),
			})

			setValue("")
		} catch (error) {
			console.error("Error sending message:", error)
		}
	}

	function onChangeInputValue(event: ChangeEvent<HTMLInputElement>): void {
		setValue(event.target.value)
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
						onChange={onChangeInputValue}
						className="w-full h-full placeholder:text-gray-500 text-sm"
						variant="primitive"
						placeholder="Type message..."
					/>
				</div>
				<Button
					type="submit"
					disabled={isPendingPostChat || isPendingPostMessage || !value.trim()}
					className="w-11 h-11 bg-blue-600 flex items-center justify-center rounded-md text-white">
					{isPendingPostChat || isPendingPostMessage ? (
						<Loader
							size={18}
							className="text-white"
						/>
					) : (
						<IoSend
							size={18}
							className="text-xl"
						/>
					)}
				</Button>
			</div>
		</form>
	)
}

export {DialogMessageInput}

import {useGetChatByUserIds} from "@/services/hooks/chat/use-get-chat-by-user-ids"
import {useGetMessageList} from "@/services/hooks/message/use-get-message-list"
import {cn} from "@/utils/helpers/shadcn-ui"
import {useSearchParams} from "next/navigation"
import React, {useEffect, useLayoutEffect, useRef, useState} from "react"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {Message} from "@/components/message/message"
import {TMessage} from "@/types/message.types"
import {E2EEncryptorStore} from "@/stores/e2e-encryptor/e2e-encryptor-store"
import {E2EEncryptorEncryptedValue} from "@/types/e2e-encryptor.types"
import {selectUser} from "@/services/api/user/select-user"

type Props = {className?: string}

function DialogMessageList({className}: Props) {
	const {session} = useSessionStore()
	const dialogId = useSearchParams().get("dialogId")
	const containerRef = useRef<HTMLDivElement>(null)
	const [decryptedMessages, setDecryptedMessages] = useState<TMessage[]>([])

	const {data: chat} = useGetChatByUserIds(
		{userIds: [session!.user!.id, dialogId!]},
		{enabled: Boolean(session?.user?.id && dialogId)},
	)

	const {data: messages} = useGetMessageList(
		{chatId: chat?.id!},
		{enabled: !!chat?.id, refetchInterval: 3000},
	)

	useLayoutEffect(() => {
		containerRef.current?.scrollTo({top: containerRef.current.scrollHeight})
	}, [messages])

	useEffect(() => {
		if (!messages?.length) return

		const decryptMessages = async () => {
			const {privateKey} = await E2EEncryptorStore.getKeys()
			const user = await selectUser({uid: dialogId!})
			if (!user?.public_key) return

			const toUserPublicKey = await E2EEncryptorStore.importKey(user.public_key)
			const decryptedMessages = await Promise.all(
				messages.map(async (message) => {
					const value = JSON.parse(message.content) as {
						iv: Uint8Array<ArrayBuffer>
						ciphertext: string
					}

					const modifiedValue: E2EEncryptorEncryptedValue = {
						iv: value.iv,
						ciphertext: new Uint8Array(
							atob(value.ciphertext)
								.split("")
								.map((c) => c.charCodeAt(0)),
						).buffer,
					}

					const decryptedContent = await E2EEncryptorStore.decrypt(modifiedValue, {
						privateKey,
						publicKey: toUserPublicKey,
					})

					return {
						...message,
						content: decryptedContent,
					}
				}),
			)

			setDecryptedMessages(decryptedMessages)
		}

		decryptMessages()
	}, [messages])

	return (
		<div className={cn("relative", className)}>
			<div
				ref={containerRef}
				className="absolute inset-0 overflow-y-auto py-9 px-9 space-y-3">
				{decryptedMessages.map((message) => (
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

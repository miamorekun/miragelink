import {TMessage} from "@/types/message.types"
import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {useGetUserById} from "@/services/hooks/user/use-get-user-by-id"
import moment from "moment"

type Props = {
	className?: string
	message: TMessage
}

function Message({className, message}: Props) {
	const {session} = useSessionStore()

	const isOwn = session?.user.id === message.sender_id
	const {data: user} = useGetUserById({uid: message.sender_id})

	return (
		<div className="flex justify-start">
			<div
				className={cn(
					`p-3 min-w-[256px] rounded-md space-y-1.5`,
					isOwn ? "bg-blue-50 text-blue-900" : "bg-gray-50 text-gray-900",
					className,
				)}>
				<p className="text-sm font-medium text-blue-700">{user?.display_name}</p>
				<p className="text-sm text-blue-950">{message.content}</p>
				<p className="text-xs text-blue-900/50">{moment(message.created_at).fromNow()}</p>
			</div>
		</div>
	)
}

export {Message}

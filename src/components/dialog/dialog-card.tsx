import {TUser} from "@/types/user.types"
import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {DialogAvatar} from "./dialog-avatar"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {IoBookmark, IoBookmarkOutline} from "react-icons/io5"
import Link from "next/link"
import {useSearchParams} from "next/navigation"

type Props = {
	className?: string
	dialog: TUser
}

function DialogCard({className, dialog}: Props) {
	const {session} = useSessionStore()
	const searchParams = useSearchParams()

	const isMe = session?.user?.id === dialog.uid
	const isActive = searchParams.get("dialogId") === dialog.uid

	return (
		<Link
			href={`/?dialogId=${dialog.uid}`}
			className={cn(
				`px-3 py-2 flex items-center gap-x-3 cursor-pointer rounded-md hover:bg-blue-50/75 transition-colors`,
				isActive && "bg-blue-50/75",
				className,
			)}>
			<div>
				{!isMe && <DialogAvatar dialog={dialog} />}

				{isMe && (
					<div
						className={cn(
							`h-9 w-9 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 font-medium text-sm`,
							className,
						)}>
						<IoBookmark />
					</div>
				)}
			</div>
			<div className="flex-1">
				<div className="flex items-center justify-between">
					{!isMe && <p className="text-sm text-blue-950">{dialog.email || dialog.display_name}</p>}
					{isMe && <p className="text-sm text-blue-950">Saved Messages</p>}
				</div>
				<p className="text-xs text-gray-500">No messages yet</p>
			</div>
		</Link>
	)
}

export {DialogCard}

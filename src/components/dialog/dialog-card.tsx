import {TUser} from "@/types/user.types"
import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {DialogAvatar} from "./dialog-avatar"

type Props = {
	className?: string
	isActive?: boolean
	dialog: TUser
}

function DialogCard({className, dialog, isActive}: Props) {
	return (
		<div
			className={cn(
				`px-3 py-2 flex items-center gap-x-3 cursor-pointer rounded-md hover:bg-gray-100/75 transition-colors`,
				isActive && "bg-gray-100/75",
				className,
			)}>
			<div>
				<DialogAvatar dialog={dialog} />
			</div>
			<div className="flex-1">
				<div className="flex items-center justify-between">
					<p className="text-sm text-blue-950 font-medium">{dialog.displayName}</p>
					{/* <span>

          </span> */}
				</div>
				<p className="text-xs text-gray-500">No messages yet</p>
			</div>
		</div>
	)
}

export {DialogCard}

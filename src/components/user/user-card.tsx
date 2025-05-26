import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {UserAvatar} from "./user-avatar"
import {TUser} from "@/types/user.types"
import {SessionMenu} from "@/features/session/session-menu"
import {stat} from "fs"

type Props = {
	className?: string
	user: TUser
	slots?: {
		sessionMenu?: React.ReactNode
	}
	status?: "online" | "offline"
}

function UserCard({className, user, slots, status = "online"}: Props) {
	return (
		<div
			className={cn(`px-3 py-2 flex items-center gap-x-3 rounded-md transition-colors`, className)}>
			<div>
				<UserAvatar user={user} />
			</div>

			<div className="flex-1">
				<div className="flex items-center justify-between">
					<p className="text-sm text-blue-950 font-medium">{user.email || user.display_name}</p>
				</div>
				<p className={cn("text-xs text-blue-600", status === "offline" && "text-gray-500")}>
					{status}
				</p>
			</div>

			{slots?.sessionMenu && <div>{slots.sessionMenu}</div>}
		</div>
	)
}

export {UserCard}

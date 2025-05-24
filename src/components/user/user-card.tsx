import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {UserAvatar} from "./user-avatar"
import {TUser} from "@/types/user.types"
import {SessionMenu} from "@/features/session/session-menu"

type Props = {
	className?: string
	user: TUser
	slots?: {
		sessionMenu?: React.ReactNode
	}
}

function UserCard({className, user, slots}: Props) {
	return (
		<div
			className={cn(`px-3 py-2 flex items-center gap-x-3 rounded-md transition-colors`, className)}>
			<div>
				<UserAvatar user={user} />
			</div>

			<div className="flex-1">
				<div className="flex items-center justify-between">
					<p className="text-sm text-blue-950 font-medium">{user.displayName}</p>
				</div>
				<p className="text-xs text-blue-600">Online</p>
			</div>

			{slots?.sessionMenu && <div>{slots.sessionMenu}</div>}
		</div>
	)
}

export {UserCard}

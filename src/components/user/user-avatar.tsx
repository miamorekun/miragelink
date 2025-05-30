import {TUser} from "@/types/user.types"
import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"

type Props = {
	className?: string
	user: Partial<TUser> & Pick<TUser, "uid">
}

function UserAvatar({className, user}: Props) {
	return (
		<div
			className={cn(
				`h-9 w-9 rounded-full flex items-center justify-center bg-blue-50 text-blue-800 font-medium text-sm`,
				className,
			)}>
			{user.display_name?.slice(0, 1).toUpperCase()}
		</div>
	)
}

export {UserAvatar}

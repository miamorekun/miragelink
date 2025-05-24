import {Button} from "@/components/ui/button"
import {UserCard} from "@/components/user"
import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {IoTrashOutline} from "react-icons/io5"

type Props = {
	className?: string
}

function DialogRoomHeader({className}: Props) {
	return (
		<div className={cn(`flex items-center justify-between bg-white px-9 border-b`, className)}>
			<UserCard
				user={{
					displayName: "user_2381@gmail.com",
					uid: "123",
				}}
				className="py-4 px-0"
			/>

			<Button
				variant={"secondary"}
				size={"icon_xs"}>
				<IoTrashOutline />
			</Button>
		</div>
	)
}

export {DialogRoomHeader}

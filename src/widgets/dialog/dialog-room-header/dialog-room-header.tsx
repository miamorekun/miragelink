import {Button} from "@/components/ui/button"
import {UserCard} from "@/components/user"
import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {IoTrashOutline} from "react-icons/io5"
import {useSearchParams} from "next/navigation"
import {useGetUserById} from "@/services/hooks/user/use-get-user-by-id"

type Props = {
	className?: string
}

function DialogRoomHeader({className}: Props) {
	const searchParams = useSearchParams()
	const dialogId = searchParams.get("dialogId")

	const {data: user, isPending: isPendingUser} = useGetUserById(
		{uid: dialogId!},
		{enabled: !!dialogId},
	)

	return (
		<div className={cn(`flex items-center px-9 border-b`, className)}>
			{user && (
				<UserCard
					className="py-4 px-0"
					user={user}
				/>
			)}

			{isPendingUser && (
				<UserCard
					className="py-4 px-0"
					user={{
						uid: dialogId!,
						email: "Loading...",
						display_name: "Loading...",
						created_at: "",
					}}
					status="offline"
				/>
			)}

			{/* {user && (
				<Button
					variant={"secondary"}
					size={"icon_xs"}>
					<IoTrashOutline />
				</Button>
			)} */}
		</div>
	)
}

export {DialogRoomHeader}

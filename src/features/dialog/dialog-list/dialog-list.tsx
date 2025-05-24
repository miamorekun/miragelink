import {DialogCard} from "@/components/dialog"
import {DialogAvatar} from "@/components/dialog/dialog-avatar"
import {Dialog} from "@radix-ui/react-dialog"
import {TUser} from "@/types/user.types"

import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"

type Props = {
	className?: string
}

const dialogs: TUser[] = [
	{
		displayName: "John Doe",
		uid: "123",
	},
	{
		displayName: "Emma Wilson",
		uid: "456",
	},
	{
		displayName: "Michael Brown",
		uid: "789",
	},
	{
		displayName: "Sarah Johnson",
		uid: "101",
	},
	{
		displayName: "David Lee",
		uid: "102",
	},
	{
		displayName: "Lisa Anderson",
		uid: "103",
	},
	{
		displayName: "Robert Taylor",
		uid: "104",
	},
	{
		displayName: "Jennifer Martinez",
		uid: "105",
	},
	{
		displayName: "William Garcia",
		uid: "106",
	},
	{
		displayName: "Elizabeth White",
		uid: "107",
	},
	{
		displayName: "James Thompson",
		uid: "108",
	},
	{
		displayName: "Patricia Moore",
		uid: "109",
	},
]

function DialogList({className}: Props) {
	return (
		<div className={cn(``, className)}>
			<DialogCard
				isActive
				dialog={{
					displayName: "Lukas",
					uid: "123",
				}}
			/>

			{dialogs.map((dialog) => (
				<DialogCard
					key={dialog.uid}
					dialog={dialog}
				/>
			))}
		</div>
	)
}

export {DialogList}

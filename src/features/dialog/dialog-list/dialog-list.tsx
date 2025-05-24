import {DialogCard} from "@/components/dialog"
import {DialogAvatar} from "@/components/dialog/dialog-avatar"
import {Dialog} from "@radix-ui/react-dialog"
import {TUser} from "@/types/user.types"

import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {UserCard} from "@/components/user"
import {DialogSearch} from "../dialog-search"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {SessionMenu} from "@/features/session/session-menu"

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
	const {session} = useSessionStore()

	return (
		<div className={cn(`h-full relative w-full flex flex-col flex-grow space-y-6`, className)}>
			{/* Active User */}
			{session && session.user && (
				<UserCard
					className="bg-gray-100/75 p-4 rounded-none"
					user={{
						displayName: session.user.email || "",
						uid: session.user.id,
					}}
					slots={{
						sessionMenu: <SessionMenu />,
					}}
				/>
			)}

			<DialogSearch className="px-4" />

			<div className="flex-grow relative">
				<div className="absolute top-0 left-0 w-full h-full overflow-y-auto px-1 space-y-0.5">
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
			</div>
		</div>
	)
}

export {DialogList}

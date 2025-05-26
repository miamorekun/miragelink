"use client"

import {DialogCard} from "@/components/dialog"
import {DialogAvatar} from "@/components/dialog/dialog-avatar"
import {Dialog} from "@radix-ui/react-dialog"
import {TUser} from "@/types/user.types"

import {cn} from "@/utils/helpers/shadcn-ui"
import React, {useState} from "react"
import {UserCard} from "@/components/user"
import {DialogSearch} from "../dialog-search"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {SessionMenu} from "@/features/session/session-menu"
import {useGetUserList} from "@/services/hooks/user/user-get-user-list"

type Props = {
	className?: string
}

function DialogList({className}: Props) {
	// State
	const {session} = useSessionStore()
	const [searchQuery, setSearchQuery] = useState("")

	const {
		data: users,
		isPending: isLoadingUsers,
		isError: isErrorUsers,
	} = useGetUserList({
		select(data) {
			const sortedData = data
				.sort((a, b) => a.display_name.localeCompare(b.display_name))
				.sort((a, b) => {
					if (a.uid === session?.user?.id) return -1
					if (b.uid === session?.user?.id) return 1
					return 0
				})

			const filteredData = sortedData.filter(
				(user) =>
					user.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					user.email.toLowerCase().includes(searchQuery.toLowerCase()),
			)

			return filteredData
		},
	})

	return (
		<div className={cn(`flex flex-col`, className)}>
			<DialogSearch
				className="px-4"
				value={searchQuery}
				onChange={setSearchQuery}
			/>

			<div className="flex-grow relative mt-4 pb-4">
				<div className="absolute top-0 left-0 w-full h-full overflow-y-auto px-1 space-y-0.5">
					{users?.map((user) => (
						<DialogCard
							key={user.uid}
							dialog={user}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export {DialogList}

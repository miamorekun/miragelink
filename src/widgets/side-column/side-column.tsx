import {UserCard} from "@/components/user"
import {DialogList} from "@/features/dialog/dialog-list/dialog-list"
import {SessionMenu} from "@/features/session/session-menu"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"

type Props = {
	className?: string
}

function SideColumn({className}: Props) {
	const {session} = useSessionStore()

	return (
		<div className={cn(`bg-white flex flex-col`, className)}>
			<UserCard
				className="p-4"
				// @ts-ignore
				user={session!.user.user_metadata}
				slots={{
					sessionMenu: <SessionMenu />,
				}}
			/>

			<DialogList className="flex-grow" />
		</div>
	)
}

export {SideColumn}

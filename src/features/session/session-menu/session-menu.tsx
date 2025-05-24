"use client"

import {Button} from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useSessionSignOut} from "@/services/hooks/session/use-session-sign-out"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {cn} from "@/utils/helpers/shadcn-ui"
import Link from "next/link"
import {space} from "postcss/lib/list"
import React, {useState} from "react"
import {
	IoChevronDown,
	IoChevronDownOutline,
	IoClose,
	IoCloseOutline,
	IoLogIn,
	IoLogInOutline,
	IoLogOut,
	IoLogOutOutline,
	IoMenuOutline,
	IoPerson,
	IoPersonCircle,
	IoPersonCircleOutline,
	IoPersonOutline,
} from "react-icons/io5"
import {LazyLoadImage} from "react-lazy-load-image-component"

type Props = {
	className?: string
}

function SessionMenu({className}: Props) {
	const {session} = useSessionStore()
	const [open, setOpen] = useState(false)

	const {mutate: signOut} = useSessionSignOut()

	return (
		<div className={cn(``, className)}>
			<DropdownMenu
				open={open}
				onOpenChange={(open) => setOpen(open)}>
				<DropdownMenuTrigger asChild>
					<Button
						className="rounded-full"
						size={"icon_xs"}
						variant="ghost">
						{open ? (
							<IoCloseOutline className="text-gray-500" />
						) : (
							<IoChevronDownOutline className="text-gray-500" />
						)}
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					className="min-w-[196px] mt-1"
					align="end">
					{session && (
						<React.Fragment>
							<Link
								passHref
								legacyBehavior
								href={`/profile/${session.user.id}`}>
								<DropdownMenuItem>
									<IoPersonCircleOutline />
									Мой профиль
								</DropdownMenuItem>
							</Link>
							<DropdownMenuItem onClick={() => signOut()}>
								<IoLogOutOutline />
								Выйти
							</DropdownMenuItem>
						</React.Fragment>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export {SessionMenu}

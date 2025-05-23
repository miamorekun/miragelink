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

	if (!session) {
		return (
			<Link href="/auth/sign-in">
				<Button
					className="rounded-full"
					size={"sm"}
					variant="default">
					<IoLogInOutline className="text-base" />
					Sign in
				</Button>
			</Link>
		)
	}

	return (
		<div className={cn(``, className)}>
			<DropdownMenu
				open={open}
				onOpenChange={(open) => setOpen(open)}>
				<DropdownMenuTrigger asChild>
					<Button
						className="rounded-full bg-gray-100 font-normal text-xs"
						size={"sm"}
						variant="secondary">
						{open ? (
							<IoCloseOutline className="text-gray-500" />
						) : (
							<IoChevronDownOutline className="text-gray-500" />
						)}

						{!session ? "Мой профиль" : `${session.user.user_metadata.name || session.user?.email}`}
						{!session ? (
							<IoPersonCircle className="text-gray-500" />
						) : (
							<React.Fragment>
								{session.user.user_metadata.avatar_url ? (
									<div className="relative bg-gray-200 w-5 h-5 rounded-full">
										<LazyLoadImage
											src={session.user.user_metadata.avatar_url}
											alt="avatar"
											className="absolute inset-0 w-full h-full rounded-full"
										/>
									</div>
								) : (
									<IoPersonCircle className="text-gray-500" />
								)}
							</React.Fragment>
						)}
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					className="min-w-[196px] mt-1"
					align="end">
					{!session && (
						<React.Fragment>
							<Link
								passHref
								legacyBehavior
								href="/auth/sign-in">
								<DropdownMenuItem>Войти</DropdownMenuItem>
							</Link>
							<Link
								passHref
								legacyBehavior
								href="/auth/sign-up">
								<DropdownMenuItem>Зарегестрироваться</DropdownMenuItem>
							</Link>
						</React.Fragment>
					)}

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

import {cn} from "@/utils/helpers/shadcn-ui"
import Link from "next/link"
import React from "react"

type Props = {
	className?: string
	href: string
	children: React.ReactNode
}

function LayoutNavItem({className, href, children}: Props) {
	return (
		<Link
			href={href}
			className={cn(`text-[12px] text-gray-700 hover:text-gray-950 transition-all`, className)}>
			{children}
		</Link>
	)
}

export {LayoutNavItem}

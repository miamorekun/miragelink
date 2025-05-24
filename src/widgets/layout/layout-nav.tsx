import React from "react"
import {cn} from "@/utils/helpers/shadcn-ui"

import {LayoutNavItem} from "./layout-nav-item"

type Props = {
	className?: string
}

function LayoutNav({className}: Props) {
	return (
		<div className={cn(`bg-gray-50 border-b border-gray-100`, className)}>
			<div className="max-w-5xl mx-auto px-6 flex items-center justify-between py-2">
				<div className="flex items-center gap-x-6">
					<LayoutNavItem href="/">Privacy</LayoutNavItem>
					<LayoutNavItem href="/">Terms and conditions</LayoutNavItem>
					<LayoutNavItem href="/">Cookie policy</LayoutNavItem>
					<LayoutNavItem href="/">Contacts</LayoutNavItem>
				</div>
			</div>
		</div>
	)
}

export {LayoutNav}

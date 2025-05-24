import {LayoutLogo} from "@/widgets/layout/layout-logo"
import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {SessionMenu} from "@/features/session/session-menu"

type Props = {
	className?: string
}

function LayoutHeader({className}: Props) {
	return (
		<header className={cn(`bg-white`, className)}>
			<div className="max-w-5xl flex items-center justify-between mx-auto px-6 py-5">
				{/* <LayoutLogo /> */}
				{/* <SearchWithAIInput /> */}
				{/* <SessionMenu /> */}
			</div>
		</header>
	)
}

export {LayoutHeader}

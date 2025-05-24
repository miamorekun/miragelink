import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {LayoutHeader} from "./layout-header"
import {LayoutNav} from "./layout-nav"
import {LayoutFooter} from "./layout-footer"

type Props = {
	children?: React.ReactNode
	className?: string
}

function LayoutWrapper({className, children}: Props) {
	return (
		<React.Fragment>
			<div>
				<LayoutNav />
				{/* <LayoutHeader /> */}
			</div>
			{children}

			<LayoutFooter />
		</React.Fragment>
	)
}

export {LayoutWrapper}

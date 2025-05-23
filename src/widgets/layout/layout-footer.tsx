import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"

type Props = {
	className?: string
}

function LayoutFooter({className}: Props) {
	return <div className={cn(`mt-24`, className)} />
}

export {LayoutFooter}

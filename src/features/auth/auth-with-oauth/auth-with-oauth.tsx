import {Button} from "@/components/ui/button"
import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"

import {AuthWithGoogle} from "./auth-with-google"

type Props = {
	className?: string
}

function AuthWithOauth({className}: Props) {
	return (
		<div className={cn("space-y-1", className)}>
			<AuthWithGoogle />
		</div>
	)
}

export {AuthWithOauth}

import {Input} from "@/components/ui/input"
import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {IoSearch, IoSearchOutline} from "react-icons/io5"

type Props = {
	className?: string
}

function DialogSearch({className}: Props) {
	return (
		<div className={cn(``, className)}>
			<div className="border border-gray-200 bg-gray-50 rounded-md h-9 flex items-center gap-x-3 px-3">
				<IoSearchOutline size={16} />
				<Input
					className="w-full h-full placeholder:text-gray-500 text-xs"
					variant="primitive"
					placeholder="Search.."
				/>
			</div>
		</div>
	)
}

export {DialogSearch}

import {Input} from "@/components/ui/input"
import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {IoSearch, IoSearchOutline} from "react-icons/io5"

type Props = {
	className?: string
	value: string
	onChange: (value: string) => void
}

function DialogSearch({className, value, onChange}: Props) {
	return (
		<div className={cn(``, className)}>
			<div className="focus-within:border-blue-500 hover:border-blue-500 transition-colors border border-gray-200 bg-gray-50 rounded-md h-9 flex items-center gap-x-3 px-3">
				<IoSearchOutline size={16} />
				<Input
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="w-full h-full placeholder:text-gray-500 text-xs"
					variant="primitive"
					placeholder="Search.."
				/>
			</div>
		</div>
	)
}

export {DialogSearch}

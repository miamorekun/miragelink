import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {IoSend} from "react-icons/io5"

type Props = {
	className?: string
}

function DialogMessageInput({className}: Props) {
	return (
		<div className={cn(`pb-6 px-9`, className)}>
			<div className="flex items-center gap-x-3">
				<div className="flex-1 focus-within:border-blue-500 hover:border-blue-500 transition-colors border border-gray-200 bg-gray-50 rounded-md h-11 flex items-center gap-x-3 pl-4 pr-1">
					<Input
						className="w-full h-full placeholder:text-gray-500 text-sm"
						variant="primitive"
						placeholder="Type message..."
					/>
				</div>

				<button className="w-11 h-11 bg-blue-600 flex items-center justify-center rounded-md text-white">
					<IoSend
						size={18}
						className="text-xl"
					/>
				</button>
			</div>
		</div>
	)
}

export {DialogMessageInput}

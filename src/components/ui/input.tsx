import * as React from "react"

import {cn} from "@/utils/helpers/shadcn-ui"

const inputVariants = {
	default:
		"flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-950 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-sm dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:file:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300",
	primitive:
		"text-sm h-auto w-auto border-none bg-transparent text-inherit placeholder:text-inherit focus-visible:outline-none",
}

const Input = React.forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input"> & {
		variant?: keyof typeof inputVariants
	}
>(({className, type, variant = "default", ...props}, ref) => {
	return (
		<input
			type={type}
			className={cn(inputVariants[variant], className)}
			ref={ref}
			{...props}
		/>
	)
})
Input.displayName = "Input"

export {Input}

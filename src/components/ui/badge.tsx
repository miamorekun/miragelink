import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/utils/helpers/shadcn-ui"

const badgeVariants = cva(
	"inline-flex items-center rounded-full border border-gray-200 px-2 h-6 text-xs transition-colors focus:outline-none dark:border-gray-800",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-gray-900 text-gray-50 hover:bg-gray-900/80 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/80",
				secondary:
					"border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
				secondaryBlue:
					"border-transparent bg-blue-50 text-blue-800 hover:bg-blue-100 dark:bg-blue-800 dark:text-blue-50 dark:hover:bg-blue-800/80",
				destructive:
					"border-transparent bg-red-500 text-gray-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/80",
				outline: "text-gray-950 dark:text-gray-50",
				ghost: "border-none bg-transparent hover:bg-gray-100 text-gray-900",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({className, variant, ...props}: BadgeProps) {
	return (
		<div
			className={cn(badgeVariants({variant}), className)}
			{...props}
		/>
	)
}

export {Badge, badgeVariants}

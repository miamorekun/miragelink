import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/utils/helpers/shadcn-ui"

const alertVariants = cva(
	"relative w-full rounded-lg border border-gray-200 p-3 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-gray-950 dark:border-gray-800 dark:[&>svg]:text-gray-50",
	{
		variants: {
			variant: {
				default: "bg-white text-gray-950 dark:bg-gray-950 dark:text-gray-50",
				destructive:
					"border-red-500/50 text-red-500 dark:border-red-500 [&>svg]:text-red-500 dark:border-red-900/50 dark:text-red-900 dark:dark:border-red-900 dark:[&>svg]:text-red-900",
				success:
					"border-green-500/50 text-green-800 bg-green-50 dark:border-green-500 [&>svg]:text-green-500 dark:border-green-900/50 dark:text-green-900 dark:dark:border-green-900 dark:[&>svg]:text-green-900",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
)

const Alert = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({className, variant, ...props}, ref) => (
	<div
		ref={ref}
		role="alert"
		className={cn(alertVariants({variant}), className)}
		{...props}
	/>
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({className, ...props}, ref) => (
		<h5
			ref={ref}
			className={cn("text-sm font-medium leading-none tracking-tight", className)}
			{...props}
		/>
	),
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => (
	<div
		ref={ref}
		className={cn("mt-1 text-xs [&_p]:leading-relaxed", className)}
		{...props}
	/>
))
AlertDescription.displayName = "AlertDescription"

export {Alert, AlertTitle, AlertDescription}

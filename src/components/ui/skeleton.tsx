import {cn} from "@/utils/helpers/shadcn-ui"

function Skeleton({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-gray-200/75 dark:bg-gray-800", className)}
			{...props}
		/>
	)
}

export {Skeleton}

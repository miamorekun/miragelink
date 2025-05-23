import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import useViewportSpy from "beautiful-react-hooks/useViewportSpy"

export type InfiniteScrollProps = {
	className?: string
	children: React.ReactNode
	fetchNextPage: () => void
	hasNextPage: boolean
	loader: React.ReactNode
	threshold?: number
	rootMargin?: string
}

function InfiniteScroll(props: InfiniteScrollProps) {
	const {
		className,
		children,
		fetchNextPage,
		hasNextPage,
		loader,
		threshold = 0.1,
		rootMargin = "0px",
	} = props
	const ref = React.useRef<HTMLDivElement>(null)
	const inView = useViewportSpy(ref, {threshold, rootMargin})

	React.useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
	}, [inView, hasNextPage, fetchNextPage])

	return (
		<React.Fragment>
			{children}

			<div
				ref={ref}
				className={cn(`w-full`, !hasNextPage && "hidden")}>
				{loader}
			</div>
		</React.Fragment>
	)
}

export {InfiniteScroll}

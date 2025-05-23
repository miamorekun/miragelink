import useMediaQuery from "beautiful-react-hooks/useMediaQuery"
import {Breakpoints} from "@/utils/theme"

export const useMediaDevice = () => {
	const isMobile = useMediaQuery(`(max-width: ${Breakpoints.sm}px)`)
	const isTablet = useMediaQuery(
		`(min-width: ${Breakpoints.sm + 1}px) and (max-width: ${Breakpoints.md}px)`,
	)
	const isDesktop = useMediaQuery(`(min-width: ${Breakpoints.md + 1}px)`)

	return {isMobile, isTablet, isDesktop}
}

import {cn} from "@/utils/helpers/shadcn-ui"
import {IconBaseProps} from "react-icons/lib"
import {TbLoader2} from "react-icons/tb"

export const Loader = ({className, size = 16, ...props}: IconBaseProps) => {
	return (
		<TbLoader2
			className={cn("animate-[spin_750ms_linear_infinite] text-gray-500", className)}
			size={size}
			{...props}
		/>
	)
}

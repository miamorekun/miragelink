import {cn} from "@/utils/helpers/shadcn-ui"
import React from "react"
import {Control, Controller} from "react-hook-form"
import {Input} from "./input"

type Props = {
	name: string
	control: Control<any>
} & React.ComponentProps<"input">

function InputWithController({control, name, ...props}: Props) {
	return (
		<Controller
			name={name}
			control={control}
			render={({field: {onChange, value, name, ref, onBlur, disabled}, fieldState: {error}}) => (
				<React.Fragment>
					<Input
						disabled={disabled}
						ref={ref}
						onBlur={onBlur}
						onChange={onChange}
						value={value}
						name={name}
						{...props}
					/>
					{error && <p className="text-xs text-red-600 mt-2">{error.message}</p>}
				</React.Fragment>
			)}
		/>
	)
}

export {InputWithController}

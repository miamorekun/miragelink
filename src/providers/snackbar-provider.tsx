"use client"

import {useThemeStore} from "@/stores/hooks/use-theme-store"
import {ThemeColors} from "@/utils/theme"
import React from "react"
import {Toaster} from "react-hot-toast"

type SnackbarProviderProps = {
	children?: React.ReactNode
}

function SnackbarProvider({children}: SnackbarProviderProps) {
	const {theme} = useThemeStore()

	return (
		<React.Fragment>
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 5000,
					className: "",
					style: {
						// border: "1px solid #713200",
						color: theme == "dark" ? ThemeColors.gray[50] : ThemeColors.gray[700],
						fontSize: "14px",
						background: theme == "dark" ? ThemeColors.gray[800] : ThemeColors.gray[100],
					},
				}}
			/>
			{children}
		</React.Fragment>
	)
}

export {SnackbarProvider}

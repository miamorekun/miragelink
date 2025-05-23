"use client"

import {useThemeStore} from "@/stores/hooks/use-theme-store"
import {useEffect} from "react"

type ThemeProviderProps = {
	children: React.ReactNode
}

function ThemeProvider({children}: ThemeProviderProps) {
	const {theme} = useThemeStore()

	useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove("light", "dark")
		root.classList.add(theme)
	}, [theme])

	return children
}

export {ThemeProvider}

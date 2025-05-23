import {create} from "zustand"
import {createJSONStorage, persist} from "zustand/middleware"

type State = {
	theme: "light" | "dark"
	setTheme: (theme: "light" | "dark") => void
}

export const useThemeStore = create(
	persist<State>(
		(set) => ({
			theme: "light",
			setTheme: (theme) => set({theme}),
		}),
		{
			name: "theme-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
)

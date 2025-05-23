import type {Config} from "tailwindcss"
const theme = require("./src/utils/theme")

export default {
	darkMode: ["class"],
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/features/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	important: true,
	theme: {
		fontFamily: {
			rubik: ["var(--font-rubik)"],
		},
		fontWeight: theme.FontWeights,
		screens: theme.TailwindScreens,
		container: {
			center: true,
		},
		fontSize: theme.FontSizes,
		colors: theme.ThemeColors,
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config

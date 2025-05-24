import colors from "tailwindcss/colors"

export const Breakpoints = {
	xs: 415,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1280,
	"2xl": 1440,
}

export const TailwindScreens = Object.fromEntries(
	Object.entries(Breakpoints).map(([key, value]) => [key, `${value}px`]),
)

export const FontWeights = {
	normal: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
	extrabold: "800",
	black: "900",
}

export const FontSizes = {
	xs: 13,
	sm: 14,
	base: 16,
	md: 18,
	lg: 20,
	xl: 24,
}

export const ThemeColors = {
	blue: {
		50: "#E5EFFF",
		100: "#CCE0FF",
		200: "#99C0FF",
		300: "#66A1FF",
		400: "#3381FF",
		500: "#3A86FF",
		600: "#004ECC",
		700: "#003B99",
		800: "#002766",
		900: "#001433",
		950: "#000A1A",
	},
	yellow: colors.yellow,
	green: colors.green,
	red: colors.red,
	primary: {
		50: "#FFEEE6",
		100: "#FEDCCD",
		200: "#FDBA9B",
		300: "#FD9768",
		400: "#FC7536",
		500: "#FB5407",
		600: "#C94203",
		700: "#973102",
		800: "#642102",
		900: "#321001",
		950: "#190800",
	},
	gray: colors.neutral,
	black: "#000000",
	white: "#FFFFFF",
	transparent: "transparent",
}

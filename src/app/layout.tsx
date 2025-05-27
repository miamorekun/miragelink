import "@/styles/globals.css"
import type {Metadata} from "next"
import {Geist, Rubik} from "next/font/google"
import {AppProvider} from "@/providers/app-provider"
import {ThemeColors} from "@/utils/theme"
import {Suspense} from "react"

const rubik = Rubik({
	weight: ["400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
	variable: "--font-rubik",
	display: "swap",
})

export const metadata: Metadata = {
	title: "Homepage",
	description: "Homepage",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${rubik.variable} antialiased`}>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	)
}

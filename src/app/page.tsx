"use client"

import {AuthRequired} from "@/components/auth/auth-required"
import {SideColumn} from "@/widgets/side-column"
import {DialogRoomWrapper} from "@/widgets/dialog/dialog-room/dialog-room-wrapper"

export default function HomePage() {
	return (
		<AuthRequired>
			<div className="min-h-screen w-full max-w-screen-xl mx-auto px-6 grid grid-cols-12">
				{/* Sidecolumn */}
				<SideColumn className="col-span-3" />

				{/* Dialog Room */}
				<DialogRoomWrapper className="col-span-9" />
			</div>
		</AuthRequired>
	)
}

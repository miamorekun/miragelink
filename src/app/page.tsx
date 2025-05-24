"use client"

import {UserCard} from "@/components/user"
import {DialogList} from "@/features/dialog/dialog-list/dialog-list"
import {DialogMessageInput} from "@/features/dialog/dialog-message-input"
import {DialogMessageList} from "@/features/dialog/dialog-message-list"
import {DialogSearch} from "@/features/dialog/dialog-search"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {CATEGORY_LIST} from "@/utils/constants/category.constants"
import {DialogRoomHeader} from "@/widgets/dialog/dialog-room-header"
import {LayoutWrapper} from "@/widgets/layout"
import {useEffect} from "react"
import {LazyLoadComponent} from "react-lazy-load-image-component"
import {useRouter} from "next/navigation"
import {Loader} from "@/components/ui/loader"
import {supabaseClient} from "@/utils/supabase"

export default function HomePage() {
	const {session} = useSessionStore()
	const router = useRouter()

	useEffect(() => {
		supabaseClient.auth.getSession().then(({data}) => {
			if (!data.session) {
				router.replace("/auth/sign-in")
			}
		})
	}, [session])

	if (!session) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center">
				<Loader
					size={48}
					className="text-blue-600"
					strokeWidth={1}
				/>
			</div>
		)
	}
	return (
		<LayoutWrapper>
			<div className="min-h-screen flex flex-col">
				<div className="flex flex-col flex-grow">
					<div className="max-w-screen-2xl mx-auto px-6 flex flex-col flex-grow w-full">
						<div className="grid grid-cols-10 flex-grow w-full">
							{/* Sidecolumn */}
							<div className="col-span-3 flex flex-col bg-white border-x border-gray-200">
								{/* Dialogs */}
								<DialogList className="flex-grow w-full" />
							</div>

							{/* Dialog Room */}
							<div className="col-span-7 bg-white flex flex-col ">
								<DialogRoomHeader />
								<DialogMessageList className="flex-grow flex-1" />
								<DialogMessageInput />
							</div>
						</div>
					</div>
				</div>
			</div>
		</LayoutWrapper>
	)
}

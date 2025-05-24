"use client"

import {UserCard} from "@/components/user"
import {DialogList} from "@/features/dialog/dialog-list/dialog-list"
import {DialogSearch} from "@/features/dialog/dialog-search"
import {useSessionStore} from "@/stores/hooks/use-session-store"
import {CATEGORY_LIST} from "@/utils/constants/category.constants"
import {LayoutWrapper} from "@/widgets/layout"
import {LazyLoadComponent} from "react-lazy-load-image-component"

export default function HomePage() {
	const {session} = useSessionStore()

	return (
		<LayoutWrapper>
			<div className="max-w-5xl mx-auto px-6 mt-6">
				<div className="grid grid-cols-12">
					{/* Sidecolumn */}
					<div className="col-span-4">
						<div className="space-y-6">
							{/* Active User */}
							{session && session.user && (
								<UserCard
									user={{
										displayName: session.user.email || "",
										uid: session.user.id,
									}}
								/>
							)}

							{/* Search dialogs */}
							<DialogSearch />

							{/* Dialogs */}
							<DialogList />
						</div>
					</div>

					{/* Dialog Room */}
				</div>
			</div>
		</LayoutWrapper>
	)
}

import {create} from "zustand"
import {Session, User, UserMetadata} from "@supabase/supabase-js"
import {TUser} from "@/types/user.types"

interface AppSession extends Session {
	user: User & {
		user_metadata: UserMetadata & Partial<TUser>
	}
	id_token?: string
}

type State = {
	session: AppSession | null
	setSession: (session: AppSession | null) => void
}

export const useSessionStore = create<State>((set) => ({
	session: null,
	setSession: (session) => set({session}),
}))

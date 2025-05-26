import {TUser} from "@/types/user.types"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {USER_BUSTER, USER_MAX_AGE} from "@/utils/constants/user.constants"
import {supabaseClient} from "@/utils/supabase"

type Params = {
	uid: string
}

export const selectUser = async ({uid}: Params) =>
	supabaseClient
		.from("users")
		.select()
		.eq("uid", uid)
		.single()
		.then((res) => {
			if (res.error) throw new Error(res.error.message)
			return res.data as unknown as TUser | null
		})

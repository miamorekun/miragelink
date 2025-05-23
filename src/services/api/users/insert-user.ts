import {TUser} from "@/types/user.types"
import {supabaseClient} from "@/utils/supabase"

export const insertUser = async (data: TUser) =>
	supabaseClient
		.from("users")
		.insert(data)
		.select()
		.then((res) => {
			if (res.error) throw new Error(res.error.message)
			return res.data as unknown as TUser
		})

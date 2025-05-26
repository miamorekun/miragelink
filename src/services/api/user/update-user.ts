import {TUser} from "@/types/user.types"
import {supabaseClient} from "@/utils/supabase"

export const updateUser = async (data: Partial<TUser> & Pick<TUser, "uid">) =>
	supabaseClient
		.from("users")
		.update(data)
		.eq("uid", data.uid)
		.then((res) => {
			if (res.error) throw new Error(res.error.message)
			return res.data as unknown as TUser
		})

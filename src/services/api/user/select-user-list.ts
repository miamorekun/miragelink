import {TUser} from "@/types/user.types"
import {supabaseClient} from "@/utils/supabase"
import {PostgrestQueryBuilder} from "@supabase/postgrest-js"

export const selectUserList = async () => {
	const response = await supabaseClient.from("users").select("*")
	if (response.error) throw new Error(response.error.message)

	return response.data as TUser[]
}

import {selectUserList} from "@/services/api/user/select-user-list"
import {TUser} from "@/types/user.types"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {useQuery, UseQueryOptions} from "@tanstack/react-query"

export type UseGetUserListQueryOptions = Partial<UseQueryOptions<TUser[]>>

export const getUserListQueryKey = () => [QueryKeys.USER, "list"]

export const useGetUserList = (options?: UseGetUserListQueryOptions) => {
	return useQuery({
		queryKey: getUserListQueryKey(),
		queryFn: selectUserList,
		...options,
	})
}

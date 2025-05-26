import {selectUser} from "@/services/api/user/select-user"
import {TUser} from "@/types/user.types"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {queryOptions, useQuery, UseQueryOptions} from "@tanstack/react-query"

export type UseGetUserParams = {
	uid: string
}

export type UseGetUserOptions = Partial<UseQueryOptions<TUser | null>>

export const getUserQueryKey = (params: UseGetUserParams) => {
	return [QueryKeys.USER, params.uid]
}

export const getUserQueryOptions = (params: UseGetUserParams, options?: UseGetUserOptions) => {
	return queryOptions({
		queryKey: getUserQueryKey(params),
		queryFn: () => selectUser({uid: params.uid}),

		...options,
	})
}

export const useGetUserById = (params: UseGetUserParams, options?: UseGetUserOptions) => {
	return useQuery(getUserQueryOptions(params, options))
}

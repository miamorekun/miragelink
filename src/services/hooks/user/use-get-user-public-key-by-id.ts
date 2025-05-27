// client/src/hooks/useGetUserPublicKeyById.ts
import {getUserPublicKeyById} from "@/services/api/user/get-user-public-key-by-id"
import {QueryKeys} from "@/utils/constants/query-keys.constsants"
import {useQuery, UseQueryOptions} from "@tanstack/react-query"

export type UseGetUserPublicKeyByIdQueryOptions = Partial<UseQueryOptions<CryptoKey, Error>>

export const getUserPublicKeyByIdQueryKey = (userId: string) => [
	QueryKeys.USER,
	"publicKey",
	userId,
]

export const useGetUserPublicKeyById = (
	userId: string,
	options?: UseGetUserPublicKeyByIdQueryOptions,
) => {
	return useQuery({
		queryKey: getUserPublicKeyByIdQueryKey(userId),
		queryFn: () => getUserPublicKeyById(userId),
		enabled: !!userId,
		...options,
	})
}

import {isServer, QueryClient} from "@tanstack/react-query"
import {cache} from "react"
import {QUERY_GC_TIME, QUERY_STALE_TIME} from "../constants/tanstack-query.constants"

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				gcTime: QUERY_GC_TIME,
				staleTime: QUERY_STALE_TIME,
				retry: 1,
			},
		},
	})
}

let browserQueryClient: QueryClient | undefined = undefined
export const getQueryClient = cache(() => {
	if (isServer) {
		return makeQueryClient()
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient()
		return browserQueryClient
	}
})

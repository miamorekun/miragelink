import {queueCallback} from "@/utils/helpers/queue-callback"
import {useCallback} from "react"

export const useQueueCallback = (...args: Parameters<typeof queueCallback>) => {
	return useCallback(queueCallback(...args), args)
}

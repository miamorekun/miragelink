import kyUniversal from "ky"
import {API_URL} from "../../utils/constants/api.constants"

export const api = kyUniversal.extend({
	prefixUrl: `${API_URL}/api`,
	hooks: {
		// beforeRequest: [
		// 	async (request) => {
		// 		// const token = await auth.currentUser?.getIdToken()
		// 		// request.headers.set("x-id-token", `${token}`)
		// 	},
		// ],
		afterResponse: [
			async (req, opt, res) => {
				if (!res.ok) {
					const error = (await res.json()) as Error
					throw new Error(error.message)
				}
			},
		],
	},
	retry: {
		limit: 3,
		methods: ["get", "put", "patch", "head", "delete", "post", "options", "trace"],
		statusCodes: [
			400, 401, 402, 403, 408, 413, 429, 499, 500, 501, 502, 503, 504, 511, 520, 522, 524,
		],
		delay(attemptCount) {
			return 0.5 * 2 ** (attemptCount - 1) * 1000
		},
		backoffLimit: 10_000,
	},
	timeout: 10_000,
})

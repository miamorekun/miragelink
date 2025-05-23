export const getFormDataPayload = (payload: Record<string, any>) => {
	const formData = new FormData()
	Object.entries(payload).forEach(([key, value]) => formData.append(key, value))
	return formData
}

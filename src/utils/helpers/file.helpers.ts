export const getFileBase64Url = async (url: string): Promise<string> => {
	if (!url || typeof url !== "string") {
		throw new Error("Invalid URL provided")
	}

	// Try to create a URL object to validate the URL
	try {
		new URL(url)
	} catch (error) {
		throw new Error("Invalid URL format")
	}

	const response = await fetch(url)
	// check if the response is OK
	if (!response.ok) {
		throw new Error(`Failed to fetch image: ${response.statusText}`)
	}

	const blob = await response.blob()
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onloadend = () => {
			if (reader.result) {
				resolve(reader.result as string)
			} else {
				reject(new Error("Failed to convert image to base64."))
			}
		}

		reader.onerror = () => {
			reject(new Error("Failed to read the image file."))
		}

		reader.readAsDataURL(blob)
	})
}

export function queueCallback<T extends (...args: any[]) => void>(fn: T, delay: number) {
	let queue: Parameters<T>[] = []
	let isProcessing = false

	const processQueue = async () => {
		isProcessing = true

		while (queue.length > 0) {
			const length = queue.length
			const args = queue.shift()!

			if (length == 1) await setTimeout(() => fn(...args), delay)
			else fn(...args)

			await new Promise((resolve) => setTimeout(resolve, delay))
		}

		isProcessing = false
	}

	return (...args: Parameters<T>) => {
		queue.push(args)
		if (!isProcessing) {
			processQueue()
		}
	}
}

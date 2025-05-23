import {idbStore} from "./idb-store"
import {Table} from "dexie"
import {PersistedQuery} from "@tanstack/react-query-persist-client"

export class IdbQueryStore {
	store: Table<PersistedQuery>

	constructor() {
		this.store = idbStore.queries
	}

	async get(params: {queryHash: string}) {
		return this.store.get(params)
	}

	async put(params: {queryHash: string; query: PersistedQuery}) {
		return this.store.put({
			...params.query,
			queryHash: params.queryHash,
		})
	}

	async delete(params: {queryHash: string}) {
		return this.store.delete(params.queryHash)
	}

	async clear() {
		return this.store.clear()
	}
}

export const idbQueryStore = new IdbQueryStore()

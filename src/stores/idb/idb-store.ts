import {PersistedQuery} from "@tanstack/react-query-persist-client"
import Dexie, {Table} from "dexie"

export class IdbStore extends Dexie {
	queries!: Table<PersistedQuery>

	constructor() {
		super("idb-global-store")
		this.version(1).stores({
			queries: "queryHash",
		})
	}
}

export const idbStore = new IdbStore()

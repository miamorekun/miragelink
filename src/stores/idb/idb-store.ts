import {PersistedQuery} from "@tanstack/react-query-persist-client"
import Dexie, {Table} from "dexie"

export class IdbStore extends Dexie {
	keyValues!: Table<{key: string; value: string}>

	constructor() {
		super("idb-global-store")
		this.version(1).stores({
			keyValues: "key",
		})
	}
}

export const idbStore = new IdbStore()

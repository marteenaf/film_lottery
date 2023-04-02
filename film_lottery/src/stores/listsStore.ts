import { defineStore } from "pinia";
import { getLocalFile } from "@/scripts/queries/localQueries";

export const useListStore = defineStore("listStore", {
	state: () => {
		return {
			allLists: [] as List[],
			selectedList: {} as List,
		};
	},
	getters: {
		getAllNames() {
			const names: string[] = this.allLists.map((l) => l.name);
			return names;
		},
	},
	actions: {
		async queryAllLists() {
			this.allLists = await getLocalFile("/src/local_data/lists.json") as List[];
		}
	}
});

interface List {
	name: string,
	createdBy: string,
	movies: Movie[],
	maxLength: number,
	users: string[]

}

interface Movie {
	dbid: number,
	watched: boolean

}
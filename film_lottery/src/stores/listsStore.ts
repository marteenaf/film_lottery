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
			const names: string[] = this.allLists.map((l) => {return {name:l.name, id:l.uuid};});
			return names;
		},
	},
	actions: {
		async queryAllLists() {
			this.allLists = await getLocalFile("/src/local_data/lists.json") as List[];
		},
		setCurrentList(id){
			if(this.allLists.length>0){
				const list = this.allLists.find(l=>l.uuid==id);
				this.selectedList = list?list:{};
			}
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
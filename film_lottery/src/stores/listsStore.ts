import { defineStore } from "pinia";
import { getLocalFile } from "@/scripts/queries/localQueries";
import uuid4 from "uuid4";

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
		},
		async postNewList(name,maxLength,users,createdBy="xxx@gmail.com"){
			const uuid = uuid4();
			const newList: List ={
				name:name,
				createdBy:createdBy,
				movies:[],
				maxLength:maxLength,
				users:[...users],
				uuid:uuid,
			};

			//here we post?
			this.allLists.push(newList);
			this.setCurrentList(uuid);
			console.debug("[POST] New List", newList, this.selectedList);
			console.debug(this.allLists);
		}
	}
});

interface List {
	name: string,
	createdBy: string,
	movies: Movie[],
	maxLength: number,
	users: string[],
	uuid:string,

}

interface Movie {
	dbid: number,
	watched: boolean

}
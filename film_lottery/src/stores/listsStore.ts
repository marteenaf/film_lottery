import { defineStore } from "pinia";
import { getLocalFile } from "@/scripts/Data IO/localQueries";
import uuid4 from "uuid4";

export const useListStore = defineStore("listStore", {
  state: () => {
    return {
      allLists: [] as List[],
      selectedList: null,
    };
  },
  getters: {
    getAllNames() {
      const names: string[] = this.allLists.map((l) => { return { name: l.name, id: l.uuid }; });
      return names;
    },
    getSelectedListMovies() {
      if (this.selectedList && this.selectedList.movies) {
        return this.selectedList.movies.map(m => m.id);
      } else {
        return [];
      }
    }
  },
  actions: {
    async queryAllLists() {
      this.allLists = await getLocalFile("/src/local_data/lists.json") as List[];
    },
    setCurrentList(id) {
      console.debug("Setting list");
      if (this.allLists.length > 0) {
        const list = this.allLists.find(l => l.uuid == id);
        this.selectedList = list ? list : {};
      }
    },
    async postNewList(name, maxLength, users, createdBy = "xxx@gmail.com") {
      const uuid = uuid4();
      const newList: List = {
        name: name,
        createdBy: createdBy,
        movies: [],
        maxLength: maxLength,
        users: [...users],
        uuid: uuid,
      };

      //here we post?
      this.allLists.push(newList);
      this.setCurrentList(uuid);
      console.debug("[POST] New List", newList, this.selectedList);
      console.debug(this.allLists);
    },
    updateCurrentListMovie(object) {
      console.debug(object),
        this.selectedList.movies.find(m => m.dbid == object.dbid).watched = object.watched;
    },
    addMovie(movieId) {
      const myList = this.selectedList;

      if (myList) {
        const exists = myList.movies.filter(m => m.dbid == movieId);
        if (exists.length == 0) {
          if (myList.movies.length < myList.maxLength) {
            myList.movies.push({ dbid: movieId, watched: false });
            this.setCurrentList(myList.uuid);
          } else {
            return "You have already filled all slots in this list";
          }
        } else {
          return "This movie was already added to this list";
        }
      } else {
        return "No list selected";
      }
    },

  }
});

interface List {
  name: string,
  createdBy: string,
  movies: Movie[],
  maxLength: number,
  users: string[],
  uuid: string,

}

interface Movie {
  dbid: number,
  watched: boolean

}
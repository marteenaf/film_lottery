import { defineStore } from "pinia";
//import { getLocalFile } from "@/scripts/Data IO/localQueries";
import { getLists, postList, getListsByUser } from "../scripts/Data IO/queries";
import uuid4 from "uuid4";
import { updateList } from "../scripts/Data IO/queries";
import { useUserStore } from "./usersStore";

export const useListStore = defineStore("listStore", {
  state: () => {
    return {
      allLists: [] as List[],
      selectedList: null,
      userStats: false
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
    },
    checkUserCanAddMovies() {
      // return true or false to check if current user can add movies
      if (this.selectedList && this.selectedList.movies && this.selectedList.users) {
        const users = this.selectedList.users.length + 1;
        const currentUser = useUserStore().getUser;
        if (currentUser) {
          const addedMovies = this.selectedList.movies.filter(m => m.addedBy == currentUser).length;
          const max = Math.floor(this.selectedList.maxLength / users);
          return addedMovies < max;
        }
      }
      return false;
    },
    getLastPickedUser() {
      if (this.selectedList.lastPicked) {
        const movie = this.selectedList.movies.find(m => m.dbid == this.selectedList.lastPicked);
        if (movie) {
          return movie.addedBy;
        }
      }

      return null;
    },
  },
  actions: {
    async queryListsByUsers() {
      //this.allLists = await getLocalFile("/src/local_data/lists.json") as List[];
      const user = useUserStore().getUser;
      this.allLists = await getListsByUser(user) as List[];
    },
    async queryAllLists() {
      this.allLists = await getLists() as List[];
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
      const lowerCaseUsers = users?.map(u => { return u.toLowerCase(); }) || [];
      console.debug(lowerCaseUsers);
      const newList: List = {
        name: name,
        createdBy: createdBy.toLowerCase(),
        movies: [],
        maxLength: maxLength,
        users: [...lowerCaseUsers],
        uuid: uuid,
        lastPicked: null
      };

      //here we post?
      this.allLists.push(newList);
      await postList([newList]);
      this.setCurrentList(uuid);
      console.debug("[POST] New List", newList, this.selectedList);
    },
    async patchSelectedListMovies() {
      const id = this.selectedList.uuid;
      const doc = { movies: this.selectedList.movies };
      await updateList(id, doc);
    },
    updateCurrentListMovie(object) {
      this.selectedList.movies.find(m => m.dbid == object.dbid).watched = object.watched;
      this.selectedList.lastPicked = object.dbid,
        this.patchSelectedListMovies();
    },
    addMovie(movieId, user) {
      const myList = this.selectedList;
      if (myList) {
        const exists = myList.movies.filter(m => m.dbid == movieId);
        if (exists.length == 0) {
          if (myList.movies.length < myList.maxLength) {
            myList.movies.push({ dbid: movieId, watched: false, addedBy: user });
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
    removeMovie(movieId) {
      const myList = this.selectedList;

      if (myList) {
        let index = -1;
        const exists = myList.movies.find((m, i) => { index = i; return m.dbid == movieId; });
        if (exists && index !== -1) {
          myList.movies.splice(index, 1);
          this.setCurrentList(myList.uuid);
        } else {
          return "This movie was already added to this list";
        }
      } else {
        return "No list selected";
      }
    },
    checkSelectedListAuth(id, user) {

      const list = this.allLists.find(list => list.uuid == id);

      if (list) {
        if (list.createdBy == user || list.users.includes(user)) {
          return true;
        }
      }
      return false;
    },
    async deleteList() {
      const myList = this.selectedList;
      const index = this.allLists.indexOf(myList);
      const id = myList.uuid;
      const doc = {
        softDelete: true
      };
      await updateList(id, doc);
      this.selectedList = null;
      this.allLists.splice(index, 1);
    },
    async editList(name, maxLength, users) {
      const myList = this.selectedList;
      myList.name = name;
      myList.maxLength = maxLength;
      myList.users = [...users];
      myList.movies = myList.movies.filter(m => myList.users.includes(m.addedBy) || m.addedBy == myList.createdBy);

      if (!myList.movies.find(m => m.dbid == myList.lastPicked)) {
        myList.lastPicked = null;
      }

      const id = myList.uuid;
      const doc = JSON.parse(JSON.stringify(myList));
      delete doc.uuid;
      delete doc._id;

      await updateList(id, doc);

    }

  }
});

interface List {
  name: string,
  createdBy: string,
  movies: Movie[],
  maxLength: number,
  users: string[],
  uuid: string,
  lastPicked: number

}

interface Movie {
  dbid: number,
  watched: boolean,
  addedBy: string,

}
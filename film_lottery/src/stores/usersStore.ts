import { defineStore } from "pinia";
import { getLocalFile } from "@/scripts/Data IO/localQueries";
import { v4 as uuidv4 } from "uuid";
import { postRequest } from "@/scripts/Data IO/axiosConnection";
import { baseUrl } from "@/scripts/Data IO/envVariables";

interface User {
  email: string,
  userName: string,
}

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      //allUsers: [] as User[],
      currentUser: "",
      isAuthenticated: false,
    };
  },
  getters: {
    getAuthentication: (state) => {
      return state.isAuthenticated;
    },
    getUser: (state) => {
      return state.currentUser;
    }
  },
  actions: {
    async queryAllUsers() {
      //this.allUsers = await getLocalFile("/src/local_data/users.json") as User[];
    },
    async registerNewUser(user) {
      const uuid = uuidv4();
      user.uuid = uuid;
      const url = `${baseUrl}/auth/register`;
      const response = await postRequest(url, user);
      console.log("response", response);
      return response;

    },
    startSession(email) {
      this.currentUser = email;
      this.isAuthenticated = true;
      console.debug("User in session:", this.currentUser, this.isAuthenticated);
    },
    async loginUser(user) {
      const url = `${baseUrl}/auth/login`;
      const response = await postRequest(url, user);
      return response;
    },
    async logoutUser() {
      this.currentUser = "";
      this.isAuthenticated = false;
    }
  }
});
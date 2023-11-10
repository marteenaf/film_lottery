import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { postRequest, setToken } from "@/scripts/Data IO/axiosConnection";
import { baseUrl } from "@/scripts/Data IO/envVariables";

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
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
    async registerNewUser(user) {
      const uuid = uuidv4();
      user.uuid = uuid;
      const url = `${baseUrl}/auth/register`;
      const response = await postRequest(url, user);
      return response;

    },
    startSession(response) {
      this.currentUser = response.user;
      this.isAuthenticated = response.isAuthenticated;
      setToken(response.token);
    },
    async loginUser(user) {
      const url = `${baseUrl}/auth/login`;
      const response = await postRequest(url, user);
      this.startSession(response.data);
      return response;
    },
    async logoutUser() {
      this.currentUser = "";
      this.isAuthenticated = false;
    }
  }
});
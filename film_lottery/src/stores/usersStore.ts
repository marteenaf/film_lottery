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
    endSession() {
      this.currentUser = "";
      this.isAuthenticated = false;
      setToken("");
    },
    async loginUser(user) {
      const url = `${baseUrl}/auth/login`;
      const response = await postRequest(url, user);
      return response;
    },
    async logoutUser() {
      const url = `${baseUrl}/auth/logout`;
      const response = await postRequest(url, {});
      this.endSession();
      return response;
    },
    async refresh() {
      try {
        const url = `${baseUrl}/auth/refresh`;
        const response = await postRequest(url, {});
        console.debug("Refreshing", response);
        if (response.status >= 200 && response.status < 400) {
          this.startSession(response.data);
        } else {
          this.endSession();
        }
        return response;

      } catch (error) {
        throw error.message;
      }
    }
  }
});
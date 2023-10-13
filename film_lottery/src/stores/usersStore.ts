import { defineStore } from "pinia";
import { getLocalFile } from "@/scripts/Data IO/localQueries";

interface User {
	email: string,
	userName: string,
}

export const useUserStore = defineStore("userStore", {
	state: () => {
		return {
			allUsers: [] as User[],
		};
	},
	actions: {
		async queryAllUsers() {
			this.allUsers = await getLocalFile("/src/local_data/users.json") as User[];
		}
	}
});
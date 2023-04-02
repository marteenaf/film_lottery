import HomeView from "@/components/views/HomeView.vue";
import ListView from "@/components/views/ListView.vue";
import NewListView from "@/components/views/NewListView.vue";
import MenuView from "@/components/views/MenuView.vue";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/",
		component: HomeView
	},
	{
		path: "/list/:Lid",
		component: ListView
	},
	{
		path: "/list",
		redirect: "/list/x"
	},
	{
		path: "/new-list/:key",
		component: NewListView
	},
	{
		path: "/new-list",
		redirect: "/new-list/name"
	},
	{
		path: "/menu",
		component: MenuView
	}

];

export const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHashHistory(),
	routes,
});
import HomeView from "@/components/views/HomeView.vue";
import ListView from "@/components/views/ListView.vue";
import NewListView from "@/components/views/NewListView.vue";

import { createRouter,createWebHashHistory } from "vue-router";

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
		path:"/new-list/:key",
		component: NewListView
	}
];

export const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHashHistory(),
	routes,
});
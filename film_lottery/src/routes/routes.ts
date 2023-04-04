import HomeView from "@/components/views/HomeView.vue";
import ListView from "@/components/views/ListView.vue";
import NewListView from "@/components/views/NewListView.vue";
import MenuView from "@/components/views/MenuView.vue";
import AddMoviesView from "../components/views/AddMoviesView.vue";

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
		name: "newListKey",
		component: NewListView
	},
	{
		path: "/new-list",
		name: "newList",
		component: NewListView
	},
	{
		path: "/menu",
		component: MenuView
	},
	{
		path: "/add-movies",
		component: AddMoviesView
	}

];

export const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHashHistory(),
	routes,
});
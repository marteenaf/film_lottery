import HomeView from "@/components/views/HomeView.vue";
import ListView from "@/components/views/ListView.vue";
import NewListView from "@/components/views/NewListView.vue";
import MenuView from "@/components/views/MenuView.vue";
import AddMoviesView from "../components/views/AddMoviesView.vue";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name:"Home",
		component: HomeView
	},
	{
		path: "/list/:Lid",
		name:"ListKey",
		component: ListView
	},
	{
		path: "/list",
		name:"List",
		redirect: "/list/x"
	},
	{
		path: "/new-list/:key",
		name: "NewListKey",
		component: NewListView
	},
	{
		path: "/new-list",
		name: "NewList",
		component: NewListView
	},
	{
		path: "/menu",
		name:"Menu",
		component: MenuView,
		meta: { transition: "slide-left" },
	},
	{
		path: "/add-movies",
		name:"AddMovies",
		component: AddMoviesView
	}

];

export const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHashHistory(),
	routes,
});
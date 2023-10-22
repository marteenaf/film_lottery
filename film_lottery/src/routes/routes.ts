import HomeView from "@/components/views/HomeView.vue";
import ListView from "@/components/views/ListView.vue";
import NewListView from "@/components/views/NewListView.vue";
import MovieCatalogView from "@/components/views/MovieCatalogView.vue";
import PickMovieView from "@/components/views/PickMovieView.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView
  },
  {
    path: "/list/:id",
    name: "ListView",
    component: ListView,
    props: true,
    children: [{
      path: "add",
      name: "AddMovies",
      component: MovieCatalogView
    },]
  },
  {
    path: "/list/create",
    name: "NewListView",
    component: NewListView
  }, {
    path: "/list/:id/pick",
    name: "PickMovies",
    component: PickMovieView
  }
];

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes,
});
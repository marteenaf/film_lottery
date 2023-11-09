import HomeView from "@/components/views/HomeView.vue";
import ListView from "@/components/views/ListView.vue";
import NewListView from "@/components/views/NewListView.vue";
import MovieCatalogView from "@/components/views/MovieCatalogView.vue";
import PickMovieView from "@/components/views/PickMovieView.vue";
import SignUpView from "@/components/views/SignUpView.vue";
import LoginView from "@/components/views/LoginView.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/stores/usersStore";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/list/:id",
    name: "ListView",
    component: ListView,
    props: true,
    children: [{
      path: "add",
      name: "AddMovies",
      component: MovieCatalogView,
      meta: {
        requiresAuth: true,
      }
    },],
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/list/create",
    name: "NewListView",
    component: NewListView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/list/:id/pick",
    name: "PickMovies",
    component: PickMovieView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/sign-up",
    name: "SignUpView",
    component: SignUpView,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView
  }
];

export const router = createRouter({
  //4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes,
});

//check authorisation
router.beforeEach((to, from) => {
  const store = useUserStore();

  console.debug("to", to);
  if (to.meta.requiresAuth) {
    console.debug("Not included", store.getAuthentication, store.getUser);
    //post request to backend to request the user
    if (!store.getAuthentication) {
      console.debug("Auth?", store.getAuthentication);
      //post request to check for authentication? and re-direct?
      return { name: "LoginView" };
    }
  }
});
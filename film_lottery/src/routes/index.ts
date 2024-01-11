import HomeView from "@/components/views/HomeView.vue";
import ListView from "@/components/views/ListView.vue";
import NewListView from "@/components/views/NewListView.vue";
import MovieCatalogView from "@/components/views/MovieCatalogView.vue";
import PickMovieView from "@/components/views/PickMovieView.vue";
import SignUpView from "@/components/views/SignUpView.vue";
import LoginView from "@/components/views/LoginView.vue";
import EditListView from "@/components/views/EditListView.vue";
import { createRouter, createWebHistory, RouteRecordRaw, START_LOCATION } from "vue-router";
import { useUserStore } from "@/stores/usersStore";

const routes: RouteRecordRaw[] = [

  {
    path: "/",
    redirect: "/login",
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "create",
        name: "NewListView",
        component: NewListView,
        meta: {
          requiresAuth: true,
        }
      },
    ]
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
      },
    },],
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
    path: "/list/:id/edit",
    name: "EditListView",
    props: true,
    components: { default: HomeView, overlay: EditListView },
    meta: {
      requiresAuth: true
    }
  }, {
    path: "/list/:id/data",
    name: "DataListView",
    props: true,
    components: { default: HomeView, overlay: EditListView },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/sign-up",
    name: "SignUpView",
    component: SignUpView,
    meta: {
      requiresGuest: true,
    }
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
    meta: {
      requiresGuest: true,
    }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes,
});

router.beforeEach(async (to, from) => {

  const store = useUserStore();

  //console.group("Routing Information");
  //console.log("from route", from.path, from.meta.requiresAuth, from);
  //console.log("to route", to.path, to.meta.requiresAuth, to);
  //console.log("authentication status", store.getAuthentication, store.getUser);
  //console.groupEnd();

  if (!store.getAuthentication) {
    if (to.meta.requiresAuth) {
      return "/login";
    }
  } else {
    if (!to.meta.requiresAuth) {
      return "/home";
    }
  }

});
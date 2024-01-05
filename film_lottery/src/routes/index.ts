import HomeView from "@/components/views/HomeView.vue";
import ListView from "@/components/views/ListView.vue";
import NewListView from "@/components/views/NewListView.vue";
import MovieCatalogView from "@/components/views/MovieCatalogView.vue";
import PickMovieView from "@/components/views/PickMovieView.vue";
import SignUpView from "@/components/views/SignUpView.vue";
import LoginView from "@/components/views/LoginView.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw, START_LOCATION } from "vue-router";
import { useUserStore } from "@/stores/usersStore";

const routes: RouteRecordRaw[] = [

  {
    path: "/",
    redirect: "/login",
    meta: {
      requiresAuth: true
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
      }
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
  //4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  strict: true,
  routes,
});

//check authorisation
router.beforeResolve(async (to, from) => {
  const store = useUserStore();

  //console.group("Routing Information");
  //console.log("from route", from.path, from.meta.requiresAuth, from);
  //console.log("to route", to.path, to.meta.requiresAuth, to);
  //console.log("authentication status", store.getAuthentication, store.getUser);
  //console.groupEnd();

  //simplofy this
  if (from !== START_LOCATION) {
    if (to.meta.requiresAuth) {
      //post request to backend to request the user
      if (!store.getAuthentication) {
        //post request to check for authentication? and re-direct?
        return { name: "LoginView" };
      }
    } else {
      //handle authentication routes (like login) only if coming from a route that requires
      if (from.meta.requiresAuth) {
        const confirmation = await confirm("You will be logged out of the session");
        if (confirmation) {
          //send request to logout route
          //logout from the store
          store.logoutUser();
        } else {
          return false;
        }
      }
    }
  }
  //re-load

});
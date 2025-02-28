<template>
  <v-app>
    <v-layout v-if="userStore.isAuthenticated" style="max-height:100dvh!important">
      <v-app-bar>
        <template v-slot:prepend>
          <v-app-bar-nav-icon><home-button :routePath="'/home'"></home-button></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>Movie Lottery</v-app-bar-title>
        <template v-slot:append>
          <p class="mr-3">{{ userStore.getUser }}</p>
          <v-app-bar-nav-icon icon="logout" @click="logout"></v-app-bar-nav-icon>
        </template>
      </v-app-bar>
      <v-main>
        <router-view name="overlay"></router-view>
        <router-view></router-view>
      </v-main>
    </v-layout>
    <v-layout v-else>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import HomeButton from "./components/reusable/HomeButton.vue";
import { useUserStore } from "./stores/usersStore.ts";
export default {
  name: "App",
  components: {
    HomeButton
  },
  data() {
    return {
      userStore: useUserStore()
    };
  },
  methods: {
    async logout() {
      const confirmation = await confirm("You will be logged out of the session");
      if (confirmation) {
        //send request to logout route
        //logout from the store
        await this.userStore.logoutUser();
        this.$router.push({ name: "LoginView" });
      } else {
        return false;
      }
    }
  },
  computed: {
    homeIcon() {
      let icon = "home";
      if (!this.$route.path.includes("home")) {
        icon = "view_list";
      }
      return icon;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

a {
  text-decoration: none;
  color: #2c3e50;
}
</style>

<template>
  <v-app>
    <v-layout style="max-height:100vh!important">
      <v-app-bar>

        <template v-slot:prepend>
          <v-app-bar-nav-icon><home-button :routePath="'/'"></home-button></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Movie Lottery</v-app-bar-title>
      </v-app-bar>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import HomeButton from "./components/reusable/HomeButton.vue";
import { useListStore } from "./stores/listsStore";
export default {
  name: "App",
  components: {
    HomeButton
  },
  async mounted() {
    await useListStore().queryAllLists();
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

<template>
  <v-app>
    <v-layout>
      <v-main>
        <v-app-bar>
          <home-button :routePath="'/'"></home-button>
          <h1>Movie Lottery</h1>
        </v-app-bar>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import HomeButton from "./components/reusable/HomeButton.vue";
import { useListStore } from "./stores/listsStore";
import { testFetch } from "./scripts/fetchTest";
export default {
  name: "App",
  components: {
    HomeButton
  },
  async mounted() {
    await useListStore().queryAllLists();
    await testFetch();
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

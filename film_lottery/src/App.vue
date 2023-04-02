<template>
  <!-- <TestComponent /> -->
 <HomeView />

</template>

<script>
import HomeView from "./components/views/HomeView.vue";

export default {
	name: "App",
	components: {
		HomeView,
		// TestComponent,
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
  margin: 60px 20px;
}
</style>

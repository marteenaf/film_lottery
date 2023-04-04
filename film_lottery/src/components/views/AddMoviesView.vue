<template>
  <HomeButton routePath="/" />
  <div>Add movies</div>
</template>
<script>
import HomeButton from "../reusable/HomeButton.vue";
import { useListStore } from "../../stores/listsStore";
export default {
	name: "AddMoviesView",
	components: {
		HomeButton
	},
	data() {
		return {
			listStore: useListStore(),
		};
	}
};
</script>
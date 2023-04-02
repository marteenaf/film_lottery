<template>
  <v-btn icon="arrow_back" variant="outlined" to="/"></v-btn>
  <h1>{{ list.name || "No selected list" }}</h1>
</template>
<script>
import { useListStore } from "@/stores/listsStore";
export default {
	name: "ListView",
	components: {
	},
	data() {
		return {
			listState: useListStore(),
			list: {}
		};
	},
	async mounted() {
		console.debug("[List View] Mounting...",this.$route.params.Lid);
		this.listState.setCurrentList(this.$route.params.Lid);
		this.list = this.listState.selectedList;

	}
};
</script>
<style>
</style>
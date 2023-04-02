<template>
  <HomeButton routePath="/"/>
  <h1>{{ list.name || "No selected list" }}</h1>
</template>
<script>
import { useListStore } from "@/stores/listsStore";
import HomeButton from "../reusable/HomeButton.vue";
export default {
	name: "ListView",
	components: {
		HomeButton,
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
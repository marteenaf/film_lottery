<template>
  <h1>{{ list.name || "No selected list" }}</h1>
  <PickList />
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
		console.debug("[List View] Mounting...");
		this.list = this.listState.selectedList;

	}
};
</script>
<style></style>
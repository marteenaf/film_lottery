<template>
  <div>
    <h4>Pick a List</h4>
    <v-window v-model="window" continuous direction="vertical">
      <v-window-item v-for="list in listNames" :key="list.id">
        <h3 @click="selectList(list.id)">{{ list.name }}</h3>
      </v-window-item>
    </v-window>
  </div>
</template>
<script>
import { useListStore } from "@/stores/listsStore";
export default {
	name: "PickList",
	data() {
		return {
			listState: useListStore(),
			listNames: [],
			selectedList: {},
			window: 0,
			length: 0,
		};
	},
	async mounted() {
		await this.listState.queryAllLists();
		console.debug("[Pick List] Mounting...", this.listState.allLists);
		this.listNames = this.listState.getAllNames;

		console.debug("[Pick List] List names = ", this.listNames);
	},
	methods: {
		selectList(id) {
			this.listState.setCurrentList(id);
			console.debug("[Pick List] Navigate to list page for...", this.listState.selectedList);
		}
	}
};
</script>
<style scoped>
h3 {
  cursor: pointer;
}
</style>
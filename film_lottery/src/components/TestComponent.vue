<template>
	<v-btn prepend-icon="ads_click" color="secondary" variant="tonal" @click="onClick">Click Me!</v-btn>
	<template v-if="names.length>0">
	<h3 v-for="name in names" :key="name">{{ name }}</h3>
	</template>
</template>

<script>
import { useListStore } from "../stores/listsStore.ts";

export default {
	name: "TestComponent",
	data() {
		return { names: ["name"], listStore: useListStore() };
	},
	methods: {
		async onClick() {
			console.debug("Clicking");
			console.debug("Got result");
			this.names = this.listStore.getAllNames;
			console.debug("...",this.names);
		}
	},
	async mounted() {
		await this.listStore.queryAllLists();
		//this.names = this.listStore.getAllNames;
		console.debug("Mounting...",this.names);
	}
};
</script>
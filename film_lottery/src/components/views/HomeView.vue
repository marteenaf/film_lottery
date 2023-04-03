<template>
	<HomeButton routePath="/menu" icon="menu" />
	<div class="wrapper-h">
		<PickButton color="red" shadowColor="darkred" textColor="#1d2a37"></PickButton>
		<PickButton color="green" shadowColor="darkgreen" textColor="#1d2a37" text="watch"></PickButton>
		<PickList />
	</div>
</template>
<script>
import { useListStore } from "@/stores/listsStore";
import PickList from "../custom/PickList.vue";
import HomeButton from "../reusable/HomeButton.vue";
import PickButton from "../reusable/PickButton.vue";
export default {
	name: "HomeView",
	components: {
		PickList,
		HomeButton,
		PickButton
	},
	data() {
		return {
			listState: useListStore(),
		};
	},
	async mounted() {
		console.debug("[Home View] Mounting...");

	}
};
</script>
<style>
.wrapper-h{
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
}
</style>
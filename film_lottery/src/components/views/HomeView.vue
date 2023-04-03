<template>
	<HomeButton routePath="/menu" icon="menu"/>
  <PickList />
</template>
<script>
import { useListStore } from "@/stores/listsStore";
import PickList from "../custom/PickList.vue";
import HomeButton from "../reusable/HomeButton.vue";
export default {
	name:"HomeView",
	components:{
		PickList,
		HomeButton
	},
	data(){
		return{
			listState: useListStore(),
		};
	},
	async mounted(){
		console.debug("[Home View] Mounting...");
		
	}
};
</script>
<style>
</style>
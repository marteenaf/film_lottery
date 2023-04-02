<template>
  <h1>Film Lottery</h1>
  <PickList />
</template>
<script>
import { useListStore } from "@/stores/listsStore";
import PickList from "../custom/PickList.vue";
export default {
	name:"HomeView",
	components:{
		PickList,
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
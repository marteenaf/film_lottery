<template>
  <div class="pick-list-wrapper">
    <div class="pick-list-content">
      <v-btn variant="plain" icon="keyboard_arrow_up" @click="prev"></v-btn>
      <h4>Pick a List</h4>
      <v-window v-model="window" continuous direction="vertical">
        <v-window-item v-for="list in listNames" :key="list.id">
          <h3 @click="selectList(list.id)">{{ list.name }}</h3>
        </v-window-item>
      </v-window>
      <v-btn variant="plain" icon="keyboard_arrow_down" @click="next"></v-btn>
    </div>
    <div class="pick-list-navigator">
      <v-item-group v-model="window" class="vertical-group" mandatory>
        <v-item v-for="(list, i) in listNames" :key="list.id" :value="i" v-slot="{ toggle,isSelected }">
          <v-btn size="x-small" :icon="isSelected?'lense':'fiber_manual_record'" variant="text" @click="toggle" :class="isSelected?'selected':'un-selected'"></v-btn>
        </v-item>
      </v-item-group>
    </div>
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
		};
	},
	async mounted() {
		await this.listState.queryAllLists();
		console.debug("[Pick List] Mounting...", this.listState.allLists);
		this.listNames = this.listState.getAllNames;
		console.debug("[Pick List] List names = ", this.listNames);
		if(this.listState.selectedList&&Object.keys(this.listState.selectedList).length>0){
			console.debug("Going for a list...", this.listState.selectedList);
			const list = this.listNames.find((l)=>l.id===this.listState.selectedList.id);
			if(list){
				this.window = this.listNames.indexOf(list);
			}
		}
	},
	methods: {
		selectList(id) {
			this.listState.setCurrentList(id);
			console.debug("[Pick List] Navigate to list page for...", this.listState.selectedList);
		},
		next() {
			this.window = this.window + 1 > this.listNames.length - 1 ? 0 : this.window + 1;
		},
		prev() {
			this.window = this.window - 1 < 0 ? this.listNames.length - 1 : this.window - 1;
		}
	}
};
</script>
<style scoped>
h3 {
  cursor: pointer;
}

.pick-list-wrapper {
  display: flex;
  justify-content: space-between;
  /* gap:2rem; */
  align-items: center;
  width:300px;
}


.vertical-group {
  display: flex;
  flex-direction: column;
}

.selected{
  color:#3761F9
}
</style>
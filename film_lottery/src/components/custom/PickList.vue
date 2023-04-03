<template>
  <div class="pick-list-wrapper">
    <div class="pick-list-content">
      <v-btn variant="plain" icon="keyboard_arrow_up" @click="prev"></v-btn>
      <h4>Pick a List</h4>
      <v-window v-model="window" continuous direction="vertical">
        <v-window-item v-for="list in listNames" :key="list.id">
          <router-link :to="'/list/'+list.id">
            <h3 @click="selectList(list.id)">{{ list.name }}</h3>
          </router-link>
        </v-window-item>
      </v-window>
      <v-btn variant="plain" icon="keyboard_arrow_down" @click="next"></v-btn>
    </div>
    <div class="pick-list-navigator">
      <v-item-group v-model="window" class="vertical-group" mandatory>
        <v-item v-for="(list, i) in listNames" :key="list.id" :value="i" v-slot="{ toggle, isSelected }">
          <!--svg instead of icons to achieve the circle size we want-->
					<v-btn size="x-small" :icon="isSelected ? 'lense' : 'fiber_manual_record'" variant="text" @click="toggle"
            :class="isSelected ? 'selected' : 'un-selected'"></v-btn>
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
		if (this.listState.allLists.length === 0) {
			await this.listState.queryAllLists();
		}
		console.debug("[Pick List] Mounting...", this.listState.allLists);
		this.listNames = this.listState.getAllNames;
		console.debug("[Pick List] List names = ", this.listNames);
		if (this.listState.selectedList && Object.keys(this.listState.selectedList).length > 0) {
			const list = this.listNames.find((l) => l.id === this.listState.selectedList.uuid);
			console.assert(list,"we dont have a list");
			if (list) {
				this.window = this.listNames.indexOf(list);
			}
		}
	},
	methods: {
		selectList(id) {
			//this.listState.setCurrentList(id);
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
  text-decoration: none !important;
  color: #2c3e50;

}

.pick-list-wrapper {
  display: flex;
  justify-content: space-between;
  /* gap:2rem; */
  align-items: center;
  width: 200px;
}


.vertical-group {
  display: flex;
  flex-direction: column;
}

.selected {
  color: #3761F9
}
</style>
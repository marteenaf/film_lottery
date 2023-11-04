<template>
  <v-container style="max-height:100% !important" class="d-flex">
    <v-row style=" max-height:100% !important">
      <v-col :cols="cols" style="max-height:100% !important" class="d-flex flex-column">
        <ListDisplayer v-if="loaded && listStore.selectedList" :list="listStore.selectedList"
          @update-list="(e) => updateListMovie(e)" :key="listStore.selectedList" @remove-movie="removeMovie">
        </ListDisplayer>
      </v-col>
      <v-col :cols="6" style="max-height:100% !important" class="d-flex flex-column">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { useListStore } from "@/stores/listsStore";
import ListDisplayer from "../custom/ListDisplayer.vue";
export default {
  name: "ListView",
  props: ["id"],
  components: {
    ListDisplayer,
  },
  data() {
    return {
      listStore: useListStore(),
      loaded: false,
    };
  },
  async mounted() {
    console.debug("[List View] Mounting...", this.$route, this.id);
    await this.getListFromUrl();
    this.loaded = true;
    console.assert(this.listStore.selectedList && this.id == this.listStore.selectedList.uuid, "List ids don't match", this.id, this.listStore.selectedList);
  },
  methods: {
    async getListFromUrl() {

      if (this.listStore.allLists.length <= 0) {
        await this.listStore.queryAllLists();
      }
      this.listStore.setCurrentList(this.id);

    },
    updateListMovie(obj) {
      this.listStore.updateCurrentListMovie(obj);
    },
    pickMovie() {
      console.debug("Pick movie!");
    },
    removeMovie(id) {
      this.listStore.removeMovie(id);
      this.listStore.patchSelectedListMovies();
    }
  },
  computed: {
    list() {
      return this.listStore.selectedList;
    },
    cols() {
      if (this.$route.name == "ListView") {
        return 12;
      } else {
        return 6;
      }
    }
  },
};
</script>
<style>
.wrapper-h {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>
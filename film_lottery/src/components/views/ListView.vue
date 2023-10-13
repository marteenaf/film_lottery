<template>
  <ListDisplayer v-if="listStore.selectedList" :list="listStore.selectedList" @update-list="(e) => updateListMovie(e)">
  </ListDisplayer>
</template>
<script>
import { useListStore } from "@/stores/listsStore";
import ListDisplayer from "../custom/ListDisplayer.vue";
export default {
  name: "ListView",
  props: ["id"],
  components: {
    ListDisplayer
  },
  data() {
    return {
      listStore: useListStore(),
    };
  },
  async mounted() {
    console.debug("[List View] Mounting...", this.$route, this.id);
    await this.getListFromUrl();
    console.assert(this.listStore.selectedList && this.id == this.listStore.selectedList.uuid, "List ids don't match", this.id, this.listStore.selectedList);
  },
  methods: {
    async getListFromUrl() {
      if (!this.listStore.selectedList) {
        if (this.listStore.allLists.length <= 0) {
          await this.listStore.queryAllLists();
        }
        this.listStore.setCurrentList(this.id);
      }
    },
    updateListMovie(obj) {
      this.listStore.updateCurrentListMovie(obj);
    }
  },
  computed: {
    list() {
      return this.listStore.selectedList;
    }
  }
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
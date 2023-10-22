<template>
  <v-container>
    <v-list lines="two">
      <v-list-item v-for="list in listStore.allLists" :key="list" :title="list.name"
        :subtitle="list.movies.length + '/' + list.maxLength" active-color="primary" :value="list.uuid"
        @click="viewList(list.uuid)"></v-list-item>
    </v-list>
    <v-btn :prepend-icon="'add'" color="primary" variant="elevated"
      @click="this.$router.push({ name: 'NewListView' })">Add
      new list</v-btn>
  </v-container>
</template>
<script>
import { useListStore } from "@/stores/listsStore";
export default {
  name: "HomeView",
  components: {
  },
  data() {
    return {
      listStore: useListStore(),
    };
  },
  mounted() {
    console.debug("[Home View] Mounting...");
    console.table(this.listStore.allLists);
  },
  methods: {
    viewList(value) {
      this.$router.push({ name: "ListView", params: { id: value } });
    }
  }
};
</script>
<style>
.wrapper-h {}
</style>
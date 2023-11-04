<template>
  <v-container class="wrapper d-flex flex-column">
    <v-row class="auto">
      <v-col>
        <v-list lines="two">
          <v-list-item v-for="list in listStore.allLists" :key="list" :title="list.name"
            :subtitle="list.movies.length + '/' + list.maxLength" active-color="primary" :value="list.uuid"
            @click="viewList(list.uuid)"></v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn :prepend-icon="'add'" color="primary" variant="elevated"
          @click="this.$router.push({ name: 'NewListView' })">Add
          new list</v-btn>
      </v-col>
    </v-row>
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
<style scoped>
.wrapper {
  height: 100% !important;
  max-height: 100% !important;
}

.auto {
  flex: auto;
  overflow: auto;
}
</style>
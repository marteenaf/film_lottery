<template>
  <v-container class="wrapper d-flex flex-column">
    <v-row class="auto">
      <v-col>
        <div class="d-flex flex-row">
          <h1>My Lists</h1>
          <v-spacer></v-spacer>
          <v-btn :prepend-icon="'add'" color="primary" variant="elevated"
            @click="this.$router.push({ name: 'NewListView' })">Add
            new list</v-btn>
        </div>
        <v-list lines="two">
          <v-list-item v-for="list in listStore.allLists" :key="list" :title="list.name" active-color="primary"
            :value="list.uuid" @click="viewList(list.uuid)"
            :prepend-icon="list.createdBy == user ? 'manage_accounts' : 'movie'">
            <template #default>
              <ListProgressBar :barHeight="15" :showText="true" :total="list.maxLength" :subtotal="list.movies.length"
                :value="list.movies.filter(m => m.watched).length">
              </ListProgressBar>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ListProgressBar from "@/components/custom/ListProgressBar.vue";
import { useListStore } from "@/stores/listsStore";
import { useUserStore } from "@/stores/usersStore";
export default {
  name: "HomeView",
  components: {
    ListProgressBar
  },
  data() {
    return {
      listStore: useListStore(),
      user: useUserStore().getUser,
    };
  },
  async created() {
    await this.listStore.queryListsByUsers();
    console.table(this.listStore.allLists);

  },
  mounted() {
    console.debug("[Home View] Mounting...", this.user);
  },
  methods: {
    viewList(value) {
      console.debug("value?", value);
      this.$router.push({ name: "ListView", params: { id: value } });
    }
  },
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
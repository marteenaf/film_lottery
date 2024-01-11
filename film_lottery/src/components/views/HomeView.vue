<template>
  <MainLayout>
    <template #content>
      <v-col>
        <div class="d-flex flex-row align-start">
          <h2 class="mr-4">My Lists</h2>
          <v-switch v-model="listStore.userStats" :label="listStore.userStats ? 'User stats' : 'List stats'"
            density="compact" hide-details color="secondary"></v-switch>
        </div>
        <v-list lines="three">
          <v-list-item v-for="list in listStore.allLists" :key="list.uuid" active-color="primary" :value="list.uuid"
            @click="viewList(list.uuid)">
            <template #default>
              <v-list-item-title class="pb-2">
                <h3>{{ list.name }}</h3>
                <p>created by {{ list.createdBy }}</p>
              </v-list-item-title>
              <v-list-item-subtitle>
                <ListStatsDisplayer v-model:userStats="listStore.userStats" :list="list" :currentUser="user">
                </ListStatsDisplayer>
              </v-list-item-subtitle>
            </template>
            <template #append>
              <v-btn :icon="list.createdBy != user ? 'more_vert' : 'edit'" variant="plain" @click.stop="editList(list)"
                class="ml-3" size="small"></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </template>
    <template #fab>
      <v-col align="center">
        <v-btn size="large" icon color="primary"
          @click="this.$router.push({ name: 'NewListView' })"><v-icon>add</v-icon></v-btn>
      </v-col>
    </template>
  </MainLayout>
  <router-view></router-view>
</template>
<script lang="ts">
import ListStatsDisplayer from "../custom/ListStatsDisplayer.vue";
import MainLayout from "@/components/layouts/MainLayout.vue";
import { useListStore } from "@/stores/listsStore";
import { useUserStore } from "@/stores/usersStore";
export default {
  name: "HomeView",
  components: {
    ListStatsDisplayer,
    MainLayout
  },
  data() {
    return {
      listStore: useListStore(),
      user: useUserStore().getUser,
    };
  },
  async created() {
    await this.listStore.queryListsByUsers();
    //console.table(this.listStore.allLists);

  },
  mounted() {
    console.debug("[Home View] Mounting...", this.user);
    this.listStore.selectedList = null;
  },
  methods: {
    viewList(value) {
      this.$router.push({ name: "ListView", params: { id: value } });
    },
    editList(value) {
      console.debug("Editing list here");
      if (this.user == value.createdBy) {
        this.$router.push({ name: "EditListView", params: { id: value.uuid } });
      } else {
        this.$router.push({ name: "DataListView", params: { id: value.uuid } });
      }
    },
    userMaxLength(list) {
      const result = list.maxLength / (list.users.length + 1);
      return result;
    },
    userAddedMovies(list) {
      const result = list.movies.filter(m => m.addedBy == this.user).length;
      return result;
    },
    userWatchedMovies(list) {
      const result = list.movies.filter(m => m.addedBy == this.user && m.watched).length;
      return result;
    }
  },
  computed: {

  }
};
</script>
<style scoped></style>
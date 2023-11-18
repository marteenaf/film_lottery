<template>
  <ListDisplayer v-if="authorised && mounted" :list="listStore.selectedList" @update-list="(e) => updateListMovie(e)"
    :key="listStore.selectedList" @remove-movie="removeMovie" :user="userStore.getUser">
  </ListDisplayer>
  <v-alert v-if="!authorised" type="error" title="Not authorised">This list cannot be accessed by the current
    user!</v-alert>
  <router-view></router-view>
</template>
<script lang="ts">
import { useListStore } from "@/stores/listsStore";
import { useUserStore } from "@/stores/usersStore";
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
      userStore: useUserStore(),
      loaded: false,
      authorised: false,
      mounted: false,
    };
  },
  async mounted() {
    console.debug("[List View] Mounting...", this.$route, this.id);
    await this.getListFromUrl();
    this.mounted = true;

  },
  methods: {
    async getListFromUrl() {

      if (this.listStore.allLists.length <= 0) {
        await this.listStore.queryAllLists();
      }
      if (this.listStore.checkSelectedListAuth(this.id, this.userStore.getUser)) {
        this.listStore.setCurrentList(this.id);
        this.loaded = true;
        this.authorised = true;
        console.assert(this.listStore.selectedList && this.id == this.listStore.selectedList.uuid, "List ids don't match", this.id, this.listStore.selectedList);
      }

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
    },
    disabled() {
      const watched = this.listStore.selectedList && this.listStore.selectedList.movies.filter(m => !m.watched).length;
      const falsy = watched == 0 ? true : false;
      console.debug("Watched?", watched, falsy);
      return falsy;
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
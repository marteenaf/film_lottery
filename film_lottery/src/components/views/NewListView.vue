<template>
  <OverlayLayout ref="overlay" title="New List" :subtitle="'created by ' + userStore.getUser">
    <ListMetadataDisplayer :editable="true" buttonLabel="Create" :callback="createNewList"
      :cancelRoute="{ name: 'Home' }">
    </ListMetadataDisplayer>
  </OverlayLayout>
</template>
<script lang="ts">
import ListMetadataDisplayer from "../custom/ListMetadataDisplayer.vue";
import OverlayLayout from "@/components/layouts/OverlayLayout.vue";
import { useListStore } from "@/stores/listsStore";
import { useUserStore } from "@/stores/usersStore";

export default {
  name: "NewListView",
  components: {
    //MainLayout,
    OverlayLayout,
    ListMetadataDisplayer
  },
  props: ["id"],
  data() {
    return {
      userStore: useUserStore(),
      listStore: useListStore(),
    };
  },
  async mounted() {
    console.debug("[New List View] Mounting...");
    this.$refs.overlay.open();
    if (this.$route.params.id) {
      this.editMode = true;
      await this.getListFromUrl();
      this.fillForm();
    }
  },
  methods: {
    async createNewList(form) {
      const maxLength = form.length * ((form.users?.length || 0) + 1);
      console.debug("Max length", maxLength, form.users);
      await this.listStore.postNewList(form.name, maxLength, form.users, this.userStore.getUser);
      this.$router.push({ name: "ListView", params: { id: this.listStore.selectedList.uuid } });
    },
  }
};
</script>
<style>
.custom-dialog>.v-overlay__content {
  justify-content: center !important;

}
</style>
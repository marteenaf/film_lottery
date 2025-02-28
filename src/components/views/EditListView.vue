<template>
  <v-dialog v-model="dialog" style="z-index:2500" class="custom-dialog">
    <v-card>
      <v-alert variant="tonal" :type="alertType || 'info'">
        <v-alert-title>
          <h3>{{ alertTitle }}</h3>
        </v-alert-title>
        <v-alert-text>
          <p>{{ alertText }}</p>
        </v-alert-text>
      </v-alert>
      <v-card-actions>
        <v-btn @click="confirm" variant="elevated"
          :color="alertAction == 'edit' ? 'primary' : 'error'">CONFIRM</v-btn>
        <v-btn @click="() => dialog = false" variant="text" class="text-decoration-underline"
          color="primary">CANCEL</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <OverlayLayout ref="overlay" :overrideRoute="{ name: 'Home' }" :title="editMode ? 'Edit List' : 'List Data'"
    :subtitle="'created by ' + listStore.selectedList?.createdBy">
    <ListMetadataDisplayer :list="listStore.selectedList" :editable="editMode" buttonLabel="edit" :cancelRoute="{
      name: 'Home'
    }" :callback="submitEdit">
      <template #additionalActions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="submitDelete">Delete</v-btn>
      </template>
    </ListMetadataDisplayer>
  </OverlayLayout>
</template>
<script lang="ts">
import ListMetadataDisplayer from "../custom/ListMetadataDisplayer.vue";
import OverlayLayout from "@/components/layouts/OverlayLayout.vue";
import { useListStore } from "@/stores/listsStore";
import { useUserStore } from "@/stores/usersStore";
type alertType = "info" | "warning" | "success" | "error";

export default {
  name: "EditListView",
  components: {
    OverlayLayout,
    ListMetadataDisplayer
  },
  props: ["id"],
  data() {
    return {
      userStore: useUserStore(),
      listStore: useListStore(),
      editMode: false,
      dialog: false,
      alertTitle: "",
      alertText: "",
      alertAction: "",
      alertType: "info" as alertType,
      form: {}
    };
  },
  async mounted() {
    console.debug("[Edit List View] Mounting...");
    this.$refs.overlay.open();
    if (this.$route.path.includes("edit")) {
      this.editMode = true;
    }
    await this.getListFromUrl();

  },
  methods: {
    async getListFromUrl() {
      if (this.listStore.allLists.length <= 0) {
        await this.listStore.queryAllLists();
      }
      if (this.listStore.checkSelectedListAuth(this.id, this.userStore.getUser)) {
        this.listStore.setCurrentList(this.id);
        this.loaded = true;
        console.assert(this.listStore.selectedList && this.id == this.listStore.selectedList.uuid, "List ids don't match", this.id, this.listStore.selectedList);
      }
    },
    async deleteList() {
      await this.listStore.deleteList();
      this.$router.push({ name: "Home" });
    },
    async editList() {
      const maxLength = this.form.length * (this.form.users.length + 1);
      await this.listStore.editList(this.form.name, maxLength, this.form.users, this.userStore.getUser);
      this.$router.push({ name: "Home" });
    },
    openDialog(action, type, title, text) {
      this.dialog = true;
      this.alertAction = action;
      this.alertTitle = title;
      this.alertText = text;
      this.alertType = type;
    },
    async confirm() {
      if (this.alertAction == "edit") {
        await this.editList();
      } else if (this.alertAction == "delete") {
        await this.deleteList();
      }
    },
    submitEdit(form) {
      this.form = form;
      console.debug("Submit edit");
      this.openDialog("edit", "warning", "Are you sure you want to make these changes?",
        "If you have removed any users from this list, the movies they have added will also be removed. This action cannot be undone.");
    },
    submitDelete(form) {
      this.form = form;
      console.debug("Submit delete");
      this.openDialog("delete", "error", "Are you sure you want to delete this list?",
        "This list will be deleted for all users added. All data will be lost.");
    }
  }
};
</script>
<style>
.custom-dialog>.v-overlay__content {
  justify-content: center !important;

}
</style>
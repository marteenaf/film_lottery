<template>
  <v-dialog v-model="dialog" style="z-index:2500" class="custom-dialog">
    <v-card>
      <v-card-title style="text-wrap:wrap !important">
        <h3>{{ alertTitle }}</h3>
      </v-card-title>
      <v-card-text>
        <p>{{ alertText }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="confirm" variant="elevated"
          :color="this.alertAction == 'edit' ? 'primary' : 'error'">CONFIRM</v-btn>
        <v-btn @click="() => dialog = false" variant="text" class="text-decoration-underline"
          color="primary">CANCEL</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <OverlayLayout ref="overlay" :overrideRoute="editMode ? { name: 'Home' } : null">
    <v-form :title="'New List'" @submit.prevent="validate">
      <MainLayout>
        <template #content>
          <v-col>
            <h1>{{ editMode ? 'Edit List' : 'New List' }}</h1>
            <h4 class="mb-4">created by {{ userStore.getUser }}</h4>
            <v-text-field :label="'Name'" v-model="form.name" :rules="rules"></v-text-field>
            <v-slider :min="1" :max="10" :step="1" show-ticks thumb-label :label="'Movies per user'" v-model="form.length"
              :rules="editLengthRules"></v-slider>
            <v-combobox :items="[]" :item-title="'email'" chips clearable v-model="form.users" item-value="email"
              label="Add other users" multiple></v-combobox>
          </v-col>
        </template>
        <template #fab>
          <v-col class="d-flex">
            <v-btn type="submit" color="primary" variant="elevated">{{ editMode ? 'Edit' : 'Create' }}</v-btn>
            <v-btn @click="this.$router.push({ name: 'Home' })" class="text-decoration-underline" color="primary"
              variant="text">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="editMode" color="error" variant="elevated"
              @click="openDialog('delete', 'Do you want to delete this list?', 'Deleting this list will DELETE it for all users added. All movies and data will be lost.')">Delete</v-btn>
          </v-col>
        </template>
      </MainLayout>
    </v-form>
  </OverlayLayout>
</template>
<script lang="ts">
import MainLayout from "@/components/layouts/MainLayout.vue";
import OverlayLayout from "@/components/layouts/OverlayLayout.vue";
import { useListStore } from "@/stores/listsStore";
import { useUserStore } from "@/stores/usersStore";

interface Form {
  name: string,
  length: number,
  users: string[]
}

export default {
  name: "NewListView",
  components: {
    MainLayout,
    OverlayLayout
  },
  props: ["id"],
  data() {
    return {
      userStore: useUserStore(),
      listStore: useListStore(),
      form: { length: 1, users: [], name: "" } as Form,
      rules: [
        (value) => {
          if (value) {
            return true;
          } else {
            return "An input is required";
          }
        }
      ],
      editMode: false,
      editLengthRules: [(value) => {
        if (value >= this.currentLength) {
          return true;
        } else {
          return "Movies have already been added, cannot remove existing movies.";
        }
      }],
      currentLength: 0,
      dialog: false,
      alertTitle: "",
      alertText: "",
      alertAction: ""
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
    async createNewList() {
      //console.debug(this.form);
      const maxLength = this.form.length * (this.form.users?.length || 0 + 1);
      console.debug("Max length", maxLength, this.form.users);
      await this.listStore.postNewList(this.form.name, maxLength, this.form.users, this.userStore.getUser);
      this.$router.push({ name: "ListView", params: { id: this.listStore.selectedList.uuid } });
    },
    async validate(e) {
      let result = await e;
      //console.debug(result);
      if (result.valid) {
        if (this.editMode) {
          this.openDialog("edit",
            "Do you want to EDIT this list?",
            "If you have removed users, the movies they have added to the list will be removed too.");
        } else {
          await this.createNewList();
        }

      }
    },
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
    fillForm() {
      const list = this.listStore.selectedList;
      this.form.name = list.name;
      this.form.users = list.users;
      this.form.length = list.maxLength / (list.users.length + 1);
      this.currentLength = this.form.length;
      this.currentUsersLength = list.users.length;
    },
    async deleteList() {
      // add key softDelete:true to list, then filter in query
      await this.listStore.deleteList();
      this.$router.push({ name: "Home" });
    },
    async editList() {
      const maxLength = this.form.length * (this.form.users.length + 1);
      await this.listStore.editList(this.form.name, maxLength, this.form.users, this.userStore.getUser);
      this.$router.push({ name: "Home" });
    },
    openDialog(action, title, text) {
      this.dialog = true;
      this.alertAction = action;
      this.alertTitle = title;
      this.alertText = text;
    },
    async confirm() {
      if (this.alertAction == "edit") {
        await this.editList();
      } else if (this.alertAction == "delete") {
        await this.deleteList();
      }
    }
  }
};
</script>
<style>
.custom-dialog>.v-overlay__content {
  justify-content: center !important;

}
</style>
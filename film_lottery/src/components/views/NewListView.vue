<template>
  <OverlayLayout ref="overlay">
    <v-form :title="'New List'" @submit.prevent="validate">
      <MainLayout>
        <template #content>
          <v-col>
            <h1>{{ editMode ? 'Edit List' : 'New List' }}</h1>
            <h4 class="mb-4">created by {{ userStore.getUser }}</h4>
            <v-text-field :label="'Name'" v-model="form.name" :rules="rules"></v-text-field>
            <v-slider :min="1" :max="10" :step="1" show-ticks thumb-label :label="'Movies per user'"
              v-model="form.length"></v-slider>
            <v-combobox :items="[]" :item-title="'email'" multiple chips clearable v-model="form.users" item-value="email"
              :rules="rules" label="Users"></v-combobox>
          </v-col>
        </template>
        <template #fab>
          <v-col class="d-flex">
            <v-btn type="submit" color="primary" variant="elevated">{{ editMode ? 'Edit List' : 'Create List' }}</v-btn>
            <v-btn @click="this.$router.push({ name: 'Home' })" class="text-decoration-underline" color="primary"
              variant="text">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" variant="elevated" @click="deleteList">Delete List</v-btn>
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
      form: {} as Form,
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
      editLengthRules: [],
      editUsersRules: [],
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
    console.debug("[New List View] Mounted...", this.editMode, this.listStore.selectedList);
  },
  methods: {
    async createNewList() {
      //console.debug(this.form);
      const maxLength = this.form.length * (this.form.users.length + 1);
      await this.listStore.postNewList(this.form.name, maxLength, this.form.users, this.userStore.getUser);
      this.$router.push({ name: "ListView", params: { id: this.listStore.selectedList.uuid } });
    },
    async validate(e) {
      let result = await e;
      //console.debug(result);
      if (result.valid) {
        this.createNewList();
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
    },
    async deleteList() {
      // add key softDelete:true to list, then filter in query
      await this.listStore.deleteList();
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
<style></style>
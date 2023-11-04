<template>
  <v-container>
    <h1>New List</h1>
    <v-form :title="'New List'" @submit.prevent="validate">
      <v-text-field :label="'Name'" v-model="form.name" :rules="rules"></v-text-field>
      <v-slider :min="1" :max="10" :step="1" show-ticks thumb-label :label="'Movies per user'"
        v-model="form.length"></v-slider>
      <v-combobox :items="userStore.allUsers" :item-title="'email'" multiple chips clearable v-model="form.users"
        item-value="email" :rules="rules" label="Users"></v-combobox>
      <v-btn type="submit" color="primary" variant="elevated">Create List</v-btn>
    </v-form>
  </v-container>
</template>
<script>
import { useListStore } from "@/stores/listsStore";
import { useUserStore } from "@/stores/usersStore";
export default {
  name: "NewListView",
  data() {
    return {
      userStore: useUserStore(),
      listStore: useListStore(),
      form: {},
      rules: [
        (value) => {
          if (value) {
            return true;
          } else {
            return "An input is required";
          }
        }
      ]
    };
  },
  async mounted() {
    console.debug("[New List View] Mounting...");
    await this.userStore.queryAllUsers();
    console.table(this.userStore.allUsers);
  },
  methods: {
    async createNewList() {
      console.debug(this.form);
      const maxLength = this.form.length * this.form.users.length;
      await this.listStore.postNewList(this.form.name, maxLength, this.form.users.map(u => u.email));
      this.$router.push({ name: "ListView", params: { id: this.listStore.selectedList.uuid } });

    },
    async validate(e) {
      let result = await e;
      console.debug(result);
      if (result.valid) {
        this.createNewList();
      }
    }
  }
};
</script>
<template>
  <OverlayLayout ref="overlay">
    <v-form :title="'New List'" @submit.prevent="validate">
      <MainLayout>
        <template #content>
          <v-col>
            <h1>New List</h1>
            <v-text-field :label="'Name'" v-model="form.name" :rules="rules"></v-text-field>
            <v-slider :min="1" :max="10" :step="1" show-ticks thumb-label :label="'Movies per user'"
              v-model="form.length"></v-slider>
            <v-combobox :items="[]" :item-title="'email'" multiple chips clearable v-model="form.users" item-value="email"
              :rules="rules" label="Users"></v-combobox>
          </v-col>
        </template>
        <template #fab>
          <v-col>
            <v-btn type="submit" color="primary" variant="elevated">Create List</v-btn>
            <v-btn @click="this.$router.push({ name: 'Home' })" class="text-decoration-underline" color="primary"
              variant="text">Back to Lists</v-btn>
          </v-col>
        </template>
      </MainLayout>
    </v-form>
  </OverlayLayout>
</template>
<script>
import MainLayout from "@/components/layouts/MainLayout.vue";
import OverlayLayout from "@/components/layouts/OverlayLayout.vue";
import { useListStore } from "@/stores/listsStore";
import { useUserStore } from "@/stores/usersStore";
export default {
  name: "NewListView",
  components: {
    MainLayout,
    OverlayLayout
  },
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
  mounted() {
    console.debug("[New List View] Mounting...");
    this.$refs.overlay.open();
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
    }
  }
};
</script>
<style></style>
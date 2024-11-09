<template>
  <v-form @submit.prevent="validate">
    <MainLayout>
      <template #content>
        <v-col>
          <v-text-field :label="'Name'" v-model="form.name" :rules="rules" :readonly="!editable"></v-text-field>
          <v-slider :min="1" :max="10" :step="1" show-ticks thumb-label :label="'Movies per user'" v-model="form.length"
            :rules="editLengthRules" :readonly="!editable"><template #append>{{ form.length }}</template></v-slider>
          <v-combobox :items="[]" :item-title="'email'" chips :clearable="editable" v-model="form.users"
            item-value="email" label="Add other users by email" :readonly="!editable" multiple></v-combobox>
        </v-col>
      </template>
      <template #fab>
        <v-col class="d-flex" v-if="editable">
          <v-btn type="submit" color="primary">{{ buttonLabel || 'submit' }}</v-btn>
          <v-btn variant="text" color="primary" style="text-decoration: underline;" @click="cancel">Cancel</v-btn>
          <slot name="additionalActions"></slot>
        </v-col>
      </template>
    </MainLayout>
  </v-form>
</template>
<script>
import MainLayout from "@/components/layouts/MainLayout.vue";
export default {
  name: "ListMetadataDisplayer",
  props: ["editable", "list", "callback", "buttonLabel", "cancelRoute"],
  components: {
    MainLayout
  },
  data() {
    return {
      form: { name: "", length: 1, users: [] },
      rules: [
        (value) => {
          if (value) {
            return true;
          } else {
            return "An input is required";
          }
        }
      ],
      editLengthRules: [(value) => {
        if (value >= this.currentLength) {
          return true;
        } else {
          return "Movies have already been added, cannot remove existing movies.";
        }
      }],
      currentLength: 1,
    };
  },
  mounted() {
    this.fillForm();
  },
  methods: {
    async validate(e) {
      let result = await e;
      if (result.valid && this.callback) {
        await this.callback(this.form);
      }
    },
    fillForm() {
      const list = this.list;
      if (list) {
        this.form.name = list.name;
        this.form.users = list.users;
        this.form.length = list.maxLength / (list.users.length + 1);
        this.currentLength = this.form.length;
        this.currentUsersLength = list.users.length;
      }
    },
    cancel() {
      this.$router.push(this.cancelRoute);
    }
  }
};
</script>
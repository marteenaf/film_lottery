<template>
  <MainLayout :centered="true">
    <template #header>
      <h1>Login here</h1>
    </template>
    <template #content>
      <v-form v-model="valid" @submit.prevent="validateForm" validate-on="submit">
        <v-text-field v-model="user.email" label="Email" autocomplete="email"></v-text-field>
        <v-text-field type="password" v-model="user.password" label="Password"
          autocomplete="current-password"></v-text-field>
        <v-alert v-if="response" :type="alertType" :title="alertTitle" :text="alertMessage"></v-alert>
        <v-btn class="ma-3" type="submit" color="primary">Log-in</v-btn>
        <v-btn variant="text" class="text-decoration-underline" color="primary"
          @click="this.$router.push('/sign-up')">Sign-up</v-btn>
      </v-form>
    </template>
  </MainLayout>
</template>
<script lang="ts">
import MainLayout from "@/components/layouts/MainLayout.vue";
import { useUserStore } from "@/stores/usersStore";
export default {
  name: "LoginView",
  components: {
    MainLayout
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      valid: false,
      userStore: useUserStore(),
      alertType: "info",
      alertTitle: "Response",
      alertMessage: "",
      response: false,
    };
  },
  methods: {
    async loginUser() {
      return await this.userStore.loginUser(this.user);
    },
    async validateForm(e) {
      const result = await e;
      if (result.valid) {
        const response = await this.loginUser();
        if (response) {
          this.response = true;
          if (response.status >= 200 && response.status < 400) {
            this.alertType = "success";
            this.alertTitle = "Login Successful";
            this.alertMessage = response.data.message;
            setTimeout(() => {
              this.$router.push({ name: "Home" });
              this.response = false;
            }, 750);
          } else {
            this.alertType = "error";
            this.alertTitle = "Login Error";
            this.alertMessage = response.data.message;
          }
        }
      }
    }
  }

};
</script>
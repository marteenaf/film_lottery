<template>
  <h1>Login here</h1>
  <v-form v-model="valid" @submit.prevent="validateForm" validate-on="submit">
    <v-text-field v-model="user.email" label="Email"></v-text-field>
    <v-text-field type="password" v-model="user.password" label="Password"></v-text-field>
    <v-alert v-if="response" :type="alertType" :title="alertTitle" :text="alertMessage"></v-alert>
    <v-btn class="ma-3" type="submit" color="primary">Log-in</v-btn>
    <v-btn variant="text" class="text-decoration-underline" color="primary"
      @click="this.$router.push('/sign-up')">Sign-up</v-btn>
  </v-form>
</template>
<script lang="ts">
import { useUserStore } from "@/stores/usersStore";
export default {
  name: "LoginView",
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
            this.userStore.startSession(this.user.email);
            setTimeout(() => {
              this.$router.push({ name: "Home" });
            }, 500);
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
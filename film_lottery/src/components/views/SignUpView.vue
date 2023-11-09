<template>
  <h1>Sign up here</h1>
  <v-form v-model="valid" @submit.prevent="validateForm" validate-on="submit">
    <v-text-field v-model="user.email" label="Email" :rules="emailRules"></v-text-field>
    <!--<v-text-field prefix="@" v-model="handle" label="Handle" :rules="passwordRules"></v-text-field>-->
    <v-text-field type="password" v-model="user.password" label="Password" :rules="passwordRules"></v-text-field>
    <v-alert v-if="response" :type="alertType" :title="alertTitle" :text="alertMessage"></v-alert>
    <v-btn class="ma-3" type="submit" color="primary">Sign-up</v-btn>
    <v-btn variant="text" class="text-decoration-underline" color="primary"
      @click="this.$router.push('/login')">Login</v-btn>
  </v-form>
</template>
<script lang="ts">
import { useUserStore } from "@/stores/usersStore";
export default {
  name: "SignUpView",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      valid: false,
      emailRules: [
        value => { if (value) { return true; } else { return "This field is required"; } },
        value => {
          let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          console.debug(regex.test(value));
          if (regex.test(value)) {
            return true;
          } else {
            return "E-mail must be valid";
          }
        }
      ],
      passwordRules: [
        value => {
          if (value) {
            return true;
          } else {
            return "This field is required";
          }
        }
      ],
      userStore: useUserStore(),
      alertType: "info",
      alertTitle: "Response",
      alertMessage: "",
      response: false,
    };
  },
  methods: {
    async postUser() {
      return await this.userStore.registerNewUser(this.user);
    },
    async validateForm(e) {
      const result = await e;
      if (result.valid) {
        const response = await this.postUser();
        if (response) {
          this.response = true;
          if (response.status >= 200 && response.status < 400) {
            if (response.data.mongo.acknowledged) {
              this.alertType = "success";
              this.alertTitle = "Registration Successful";
              this.alertMessage = response.data.message;
              setTimeout(() => {
                this.$router.push({ name: "Home" });
              }, 500);

            }
          } else {
            this.alertType = "error";
            this.alertTitle = "Registration Error";
            this.alertMessage = response.data.message;
          }
        }
      }
    }
  }

};
</script>
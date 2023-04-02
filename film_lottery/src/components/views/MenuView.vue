<template>
  <HomeButton routePath="/"></HomeButton>
  <h1>Menu</h1>
  <div class="menu-wrapper">
    <v-btn to="/new-list">New List</v-btn>
    <v-btn>Diary</v-btn>
  </div>
</template>
<script>
import HomeButton from "../reusable/HomeButton.vue";

export default{
	name: "MenuView",
	components: { HomeButton }
};
</script>
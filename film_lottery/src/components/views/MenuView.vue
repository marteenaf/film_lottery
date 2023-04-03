<template>
  <HomeButton routePath="/"></HomeButton>
  <h1>Menu</h1>
  <div class="menu-wrapper">
    <!-- <v-btn to="/new-list">New List</v-btn>
    <v-btn>Diary</v-btn> -->
    <MenuButton icon="playlist_add" @click="openNewList()"></MenuButton>
    <MenuButton icon="calendar_month" @click="openDiary()"></MenuButton>
  </div>
</template>
<script>
import HomeButton from "../reusable/HomeButton.vue";
import MenuButton from "../reusable/MenuButton.vue";

export default {
	name: "MenuView",
	components: { HomeButton, MenuButton },
	methods:{
		openNewList(){
			console.debug("[Menu] Opening Menu...");
			this.$router.push({name:"newList"});
		},
		openDiary(){
			console.debug("[Menu] Opening Diary...");
		}
	}
};
</script>
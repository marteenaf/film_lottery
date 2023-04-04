<template>
  <HomeButton routePath="/"></HomeButton>
  <div class="menu-wrapper">
    <!-- <v-btn to="/new-list">New List</v-btn>
    <v-btn>Diary</v-btn> -->
    <MenuButton icon="playlist_add" @click="openNewList()"></MenuButton>
    <MenuButton icon="calendar_month" @click="openDiary()"></MenuButton>
    <MenuButton icon="bug_report" @click="openEditListUsers()"></MenuButton>
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
			// this.$router.push({name:"newListKey",params:{key:"name"}});
			this.$router.push({name:"NewList"});
		},
		openDiary(){
			console.debug("[Menu] Opening Diary...");
		},
		openEditListUsers(){
			this.$router.push({name:"NewListKey",params:{key:"users"}});
		}
	}
};
</script>
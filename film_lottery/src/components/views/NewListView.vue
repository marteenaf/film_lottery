<template>
	<HomeButton :routePath="getRoutePath()" icon="arrow_back"></HomeButton>
	<h1>New List {{ key }}</h1>
	<v-window v-model="key">
		<v-window-item value="name">
			Name
		</v-window-item>
		<v-window-item value="maxLength">
			Length
		</v-window-item>
		<v-window-item value="users">
			Users
		</v-window-item>
		<v-window-item value="movies">
			Movies
		</v-window-item>
	</v-window>
</template>
<script>
import HomeButton from "../reusable/HomeButton.vue";
export default {
	name: "NewList",
	components: {
		HomeButton
	},
	data() {
		return {
			list: null,
			name: "",
			maxLength: 5,
			users: [],
			movies: [],
			key: "maxLength"
		};
	},
	mounted() {
		console.debug("[New List] Mounting...",this.key);
		this.key = this.$route.params.key;
	},
	methods: {
		getRoutePath() {
			console.debug("[New List] Changing route...",this.key);
			switch (this.key) {
			case "name":
				return "/menu";
			case "maxLength":
				return "/new-list/name";
			case "users":
				return "/new-list/maxLength";
			case "movies":
				return "/new-list/users";
			}
		}
	},
	updated(){
		console.debug("[New List] Updating...",this.key);
		this.key = this.$route.params.key;
	}
};
</script>

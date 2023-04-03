<template>
	<HomeButton :routePath="key == 'name' ? '/menu' : '/new-list'" icon="arrow_back" @click="prevStep"></HomeButton>
	<v-window v-model="key">
		<v-window-item value="name">
			<h4>Enter a list name</h4>
			<v-text-field v-model="name" clearable variant="outlined"></v-text-field>
		</v-window-item>
		<v-window-item value="maxLength">
			<h4>Pick a size</h4>
			<v-item-group v-model="maxLength" mandatory>
				<v-item v-for="size in sizes" :key="size" :value="size">
					<template #default="{isSelected, toggle}">
					<v-btn variant="outlined" :size="size*5" icon="" @click="toggle()" :class="isSelected?'filled':''">{{ size }}</v-btn>
				</template>
				</v-item>
			</v-item-group>
		</v-window-item>
		<v-window-item value="users">
			Users
		</v-window-item>
		<v-window-item value="movies">
			Movies
		</v-window-item>
	</v-window>
	<h4>{{ name }}</h4>
	<h4>{{ maxLength }}</h4>
	<h4 v-for="user in users" :key="user">{{ user }}</h4>
	<MenuButton icon="done" @click="nextStep"></MenuButton>
</template>
<script>
import HomeButton from "../reusable/HomeButton.vue";
import MenuButton from "../reusable/MenuButton.vue";
export default {
	name: "NewList",
	components: {
		HomeButton,
		MenuButton
	},
	data() {
		return {
			list: null,
			name: "",
			maxLength: 6,
			users: [],
			movies: [],
			key: "name",
			sizes: [6, 10, 20]
		};
	},
	mounted() {
		console.debug("[New List] Mounting...", this.key);
		if (this.$route.params.key) {
			console.debug("has params");
			this.key = this.$route.params.key;
		} else {
			this.key = "name";
		}
	},
	methods: {
		prevStep() {
			console.debug("[New List] Prev Step");
			switch (this.key) {
			case "maxLength":
				this.key = "name";
				break;
			case "users":
				this.key = "maxLength";
				break;
			case "movies":
				this.key = "users";
			}
		},
		nextStep() {
			console.debug("[New List] Next Step");
			switch (this.key) {
			case "name":
				this.key = "maxLength";
				break;
			case "maxLength":
				this.key = "users";
				break;
			case "users":
				this.key = "movies";
				break;
			}
		}
	},

	updated() {
		console.debug("[New List] Updating...", this.key);
		//this.key = this.$route.params.key;
	}
};
</script>
<style scoped>
.filled{
background:#3761F9;
}
</style>

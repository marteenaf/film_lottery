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
					<template #default="{ isSelected, toggle }">
						<v-btn variant="outlined" :size="size * 5" icon="" @click="toggle()" :class="isSelected ? 'filled' : ''">{{ size
						}}</v-btn>
					</template>
				</v-item>
			</v-item-group>
		</v-window-item>
		<v-window-item value="users">
			<v-container>
				<v-row justify="start">
					<v-col v-for="(selection, i) in selections" :key="selection.text" cols="auto" class="py-1 pe-0">
						<v-chip :disabled="loading" closable @click:close="users.splice(i, 1)">
							<v-icon icon="person" start></v-icon>
							{{ selection.userName }}
						</v-chip>
					</v-col>
					<v-col v-if="!allSelected" cols="12">
						<v-text-field variant="outlined" ref="search" v-model="search" hide-details label="Search" single-line></v-text-field>
					</v-col>
				</v-row>
			</v-container>
			<v-list>
				<template v-for="item in categories">
					<v-list-item v-if="!users.includes(item)" :key="item.email" :disabled="loading" @click="users.push(item)">
						<v-list-item-title v-text="item.userName"></v-list-item-title>
					</v-list-item>
				</template>
			</v-list>
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
import { useUserStore } from "@/stores/usersStore";
export default {
	name: "NewList",
	components: {
		HomeButton,
		MenuButton
	},
	data() {
		return {
			userState: useUserStore(),
			list: null,
			name: "",
			maxLength: 6,
			users: [],
			key: "name",
			sizes: [6, 10, 20],
			search:"",
			items:[]
		};
	},
	beforeMount(){
		this.userState.queryAllUsers();
	},
	mounted() {
		console.debug("[New List] Mounting...", this.key);
		if (this.$route.params.key) {
			console.debug("has params");
			this.key = this.$route.params.key;
		} else {
			this.key = "name";
		}
		this.items = this.userState.allUsers;
		console.debug("All users",this.userState.allUsers);
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
				//here we set current list to the newly created one and then route to movies page
				break;
			}
		}
	},

	updated() {
		console.debug("[New List] Updating...", this.key);
		//this.key = this.$route.params.key;
	},
	computed:{
		allSelected () {
			return this.users.length === this.items.length;
		},
		categories () {
			const search = this.search.toLowerCase();

			if (!search) return this.items;

			return this.items.filter(item => {
				const text = item.text.toLowerCase();

				return text.indexOf(search) > -1;
			});
		},
		selections () {
			const selections = [];

			for (const selection of this.users) {
				selections.push(selection);
			}

			return selections;
		},
	}
};
</script>
<style scoped>
.filled {
	background: #3761F9;
}
</style>

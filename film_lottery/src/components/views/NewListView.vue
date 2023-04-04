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
				<v-item v-for="(size, i) in sizes" :key="size" :value="size">
					<template #default="{ isSelected, toggle }">
						<v-btn variant="outlined" :size="resized[i]" icon="" @click="toggle()" :class="isSelected ? 'filled' : ''">{{
							size
						}}</v-btn>
					</template>
				</v-item>
			</v-item-group>
		</v-window-item>
		<v-window-item value="users">
			<h4>Add other users</h4>
			<div class="wrapper">
				<v-chip v-for="(selection, i) in selections" :key="selection.email" closable @click:close="users.splice(i, 1)"
					variant="outlined">
					<v-icon icon="account_circle" start></v-icon>
					{{ selection.userName }}
				</v-chip>
			</div>
			<v-text-field v-if="!allSelected" variant="outlined" ref="search" v-model="search" hide-details
				label="Search by email" single-line></v-text-field>
			<v-list v-if="search !== ''" variant="text">
				<template v-for="item in categories">
					<v-list-item v-if="!users.includes(item)" :key="item.email" @click="users.push(item)">
						<template #prepend>
							<v-icon icon="person"></v-icon>
						</template>
						<v-list-item-title>{{ item.email }}</v-list-item-title>
						<v-list-item-subtitle>{{ item.userName }}</v-list-item-subtitle>
					</v-list-item>
				</template>
			</v-list>
		</v-window-item>
	</v-window>
	<div class="wrapper">
		<h4>{{ name }}</h4>
		<h4>{{ maxLength }}</h4>
		<h4 v-for="user in users" :key="user">{{ user }}</h4>
	</div>
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
			sizes: [1, 3, 6, 10, 20],
			search: "",
			items: []
		};
	},
	beforeMount() {
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
		console.debug("All users", this.userState.allUsers);
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
	computed: {
		allSelected() {
			return this.users.length === this.items.length;
		},
		categories() {
			const search = this.search.toLowerCase();
			if (!search) return this.items;
			return this.items.filter(item => {
				const text = item.email.toLowerCase().split("@")[0];
				//better search in order
				return text.indexOf(search) > -1;
			});
		},
		selections() {
			const selections = [];
			for (const selection of this.users) {
				selections.push(selection);
			}
			return selections;
		},
		resized() {
			const mapRange = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;
			const min = Math.min(...this.sizes);
			const max = Math.max(...this.sizes);

			return this.sizes.map(s => {
				return mapRange(s, min, max, 30, 100);
			});
		}
	}
};
</script>
<style scoped>
.filled {
	background: #3761F9;
}

.wrapper {
	margin: 10px 0px;
}

.wrapper-h {
	margin: 0px 10px;
}
</style>

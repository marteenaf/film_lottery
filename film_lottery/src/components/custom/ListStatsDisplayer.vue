<template>
  <div v-if="!userStats">
    <ListProgressBar :barHeight="30" :showText="true" :value-label="valueLabel" :subtotal-label="subtotalLabel"
      :total-label="totalLabel" :total="list.maxLength" :value="watchedMovies" :subtotal="list.movies.length">
    </ListProgressBar>
  </div>
  <div v-else v-for="user in allUsers" :key="user">
    <ListProgressBar :barHeight="20" :showText="true" :value-label="valueLabel" :subtotal-label="subtotalLabel"
      :total-label="totalLabel" :value="userWatchedMovies(user)" :subtotal="userAddedMovies(user)"
      :total="userMaxLength()" color-theme="info" :general-label="user">
    </ListProgressBar>
    <v-divider class="my-2"></v-divider>
  </div>
</template>
<script lang = "ts">
import ListProgressBar from "./ListProgressBar.vue";
export default {
  name: "ListStatsDisplayer",
  props: ["userStats", "list", "currentUser"],
  components: { ListProgressBar },
  data() {
    return {
      valueLabel: "watched",
      subtotalLabel: "added",
      totalLabel: "total",
      allUsers: []
    };
  },
  mounted() {
    this.sortUsers();
    console.debug(this.allUsers);
  },
  methods: {
    userMaxLength() {
      const result = this.list.maxLength / (this.list.users.length + 1);
      return result;
    },
    userAddedMovies(user) {
      const result = this.list.movies.filter(m => m.addedBy == user).length;
      return result;
    },
    userWatchedMovies(user) {
      const result = this.list.movies.filter(m => m.addedBy == user && m.watched).length;
      return result;
    },
    sortUsers() {
      this.allUsers.push(this.list.createdBy);
      this.allUsers.push(...this.list.users);

      this.allUsers = this.allUsers.sort((a, b) => {

        const moviesByA = this.list.movies.filter(m => m.addedBy == a).length;
        const moviesByB = this.list.movies.filter(m => m.addedBy == b).length;
        if (moviesByA >= moviesByB) {
          return -1;
        } else {
          return 1;
        }

      });
      const index = this.allUsers.indexOf(this.currentUser);
      this.allUsers.splice(index, 1);
      this.allUsers.splice(0, 0, this.currentUser);
    },
  },
  computed: {
    watchedMovies() {
      return this.list.movies.filter(m => m.watched).length;
    },
  }
};
</script>
<style scoped></style>
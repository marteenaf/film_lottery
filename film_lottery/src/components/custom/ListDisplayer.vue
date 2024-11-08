<template>
  <MainLayout>
    <template #header>
      <v-col>
        <div class="d-flex flex-row align-start">
          <h2 class="text-left mr-4">{{ list.name }}</h2>
          <v-switch :label="listStore.userStats ? 'User stats' : 'List stats'" v-model="listStore.userStats" hide-details
            density="compact" color="secondary"></v-switch>
        </div>
        <ListStatsDisplayerVue v-model:userStats="listStore.userStats" :list="list" :currentUser="user">
        </ListStatsDisplayerVue>
      </v-col>
    </template>
    <template #content>
      <v-col>
        <div v-for=" myUser  in  allUsers " :key="myUser" class="d-flex flex-column" style="gap:8px;margin-bottom:8px">
          <MovieDisplayer v-for="( movie ) in  userMovies(myUser) " :key="movie" :movie="movie" :isMain="myUser==this.user">
            <template #movie-actions>
              <v-btn v-if="myUser==this.user" icon size="x-small" variant="plain" @click.stop="removeMovie(movie.id,movie.watched)" :disabled="movie.watched"><v-icon size="x-small">{{ 'close' }}</v-icon></v-btn>
                <v-checkbox @click.stop v-model="movie.watched" @input="watchMovie(movie)" color="primary" hide-details></v-checkbox>
            </template>
          </MovieDisplayer>
          <MovieDisplayerSlot v-for=" i  in  missingMovies(myUser) " :key="i" :message="(myUser == this.user ? 'Your':myUser) + ' movie '+(userMovies(myUser).length + i)" :add="myUser==this.user" ></MovieDisplayerSlot>
        </div>
      </v-col>
    </template>
    <template #fab v-if="!this.$route.path.includes('add')">
      <v-col class="d-flex pa-5 pb-10 align-center justify-center">
        <PickButton :color="'red'" :shadowColor="'darkred'" :text="'Pick Movie'"
          @pick="this.$router.push({ name: 'PickMovies' })" :disabled="disabled"></PickButton>
      </v-col>
    </template>
  </MainLayout>
</template>
<script lang="ts">
import MovieDisplayer from "../reusable/MovieDisplayer.vue";
import MovieDisplayerSlot from "../reusable/MovieDisplayerSlot.vue";
import ListStatsDisplayerVue from "./ListStatsDisplayer.vue";
import PickButton from "@/components/reusable/PickButton.vue";
import MainLayout from "@/components/layouts/MainLayout.vue";
import { fetchMovieDetails } from "@/scripts/Data IO/movieQueries";
import { useListStore } from "@/stores/listsStore";
export default {
  name: "ListDisplayer",
  props: ["list", "user"],
  components: {
    MovieDisplayer,
    MovieDisplayerSlot,
    ListStatsDisplayerVue,
    PickButton,
    MainLayout
  },
  data() {
    return {
      allMovies: [],
      allUsers: [],
      listStore: useListStore()
    };
  },
  async mounted() {
    //check the user is authorised to access this list.
    await this.getMovieDetails();
    this.sortUsers();
    //console.debug(this.allMovies);
  },
  methods: {
    watchMovie(movie) {
      this.$emit("update-list", { dbid: movie.id, watched: movie.watched });
    },
    async getMovieDetails() {

      if (this.list.movies) {
        const promises = this.list.movies.map(async (movie) => {
          const requestResult = await fetchMovieDetails(movie.dbid);
          const moviePromise = requestResult.data;
          moviePromise.watched = movie.watched;
          moviePromise.addedBy = movie.addedBy;
          return moviePromise;
        });
        Promise.all(promises).then(values => { this.allMovies = values; });
      }
    },
    removeMovie(id,watched) {
      if(!watched){
        this.$emit("remove-movie", id);
      }
    },
    addedByUser(movieId) {
      const movie = this.allMovies.find(m => m.id == movieId);
      if (movie) {
        return this.user == movie.addedBy;
      }
      return false;
    },
    missingMovies(user) {
      const moviesAdded = this.list.movies.filter(m => m.addedBy == user).length;
      const maxPerUser = this.list.maxLength / (this.list.users.length + 1);
      const remaining = maxPerUser - moviesAdded;
      return remaining;
    },
    userMovies(user) {
      return this.allMovies?.filter(m => m.addedBy == user);
    },
    sortUsers() {
      this.allUsers = [...this.list.users];
      this.allUsers.push(this.list.createdBy);
      this.allUsers = this.allUsers.sort((a, b) => {

        const moviesByA = this.list.movies.filter(m => m.addedBy == a).length;
        const moviesByB = this.list.movies.filter(m => m.addedBy == b).length;
        if (moviesByA >= moviesByB) {
          return -1;
        } else {
          return 1;
        }

      });

      const index = this.allUsers.indexOf(this.user);
      this.allUsers.splice(index, 1);
      this.allUsers.splice(0, 0, this.user);
    }
  },
  emits: ["update-list", "remove-movie"],
  watch: {
    "list.movies.length": {
      handler: async function () {
        await this.getMovieDetails();
      }
    }
  },
  computed: {
    disabled() {
      const watched = this.allMovies.filter(m => !m.watched).length;
      const falsy = watched == 0 ? true : false;
      return falsy;
    },
  }

};
</script>
<style></style>@/scripts/movieQueries
<template>
  <div>
    <ListProgressBar :barHeight="30" :showText="true" :total="list.maxLength" :subtotal="list.movies.length"
      :value="watchedMovies">
    </ListProgressBar>
  </div>
  <div v-if="list && allMovies" style="flex:auto; overflow:auto;">
    <MovieDisplayer v-for="movie in allMovies" :key="movie" :movie="movie">
      <template #add-list>
        <!--<v-checkbox v-model="movie.watched" hide-details
          @update:modelValue="(e) => updateMovieList(movie.id, e)"></v-checkbox>-->
        <v-icon class="ma-3" :icon="movie.watched ? 'done' : ''" color="primary"></v-icon>
        <v-btn :icon="'remove'" @click="removeMovie(movie.id, movie.watched)" :color="'error'" variant="elevated"
          :disabled="movie.watched || !addedByUser(movie.id)" size="x-small"></v-btn>
      </template>
    </MovieDisplayer>
  </div>
  <div v-if="this.$route.name == 'ListView'" class="d-flex justify-center pa-4" style="bottom:0px">
    <PickButton :color="'red'" :shadowColor="'darkred'" :text="'Pick Movie'"
      @pick="this.$router.push({ name: 'PickMovies' })" :disabled="disabled"></PickButton>
  </div>
</template>
<script lang="ts">
import MovieDisplayer from "../reusable/MovieDisplayer.vue";
import PickButton from "@/components/reusable/PickButton.vue";
import ListProgressBar from "@/components/custom/ListProgressBar.vue";
import { fetchMovieDetails } from "@/scripts/fetchTest";
export default {
  name: "ListDisplayer",
  props: ["list", "user"],
  components: {
    MovieDisplayer,
    PickButton,
    ListProgressBar
  },
  data() {
    return {
      allMovies: [],
    };
  },
  async mounted() {
    //check the user is authorised to access this list.
    await this.getMovieDetails();
    console.debug(this.allMovies);
  },
  methods: {
    updateMovieList(movie, watched) {
      this.$emit("update-list", { dbid: movie, watched: watched });
    },
    async getMovieDetails() {

      if (this.list.movies) {
        const promises = this.list.movies.map(async (movie) => {
          const moviePromise = await fetchMovieDetails(movie.dbid);
          moviePromise.watched = movie.watched;
          moviePromise.addedBy = movie.addedBy;
          return moviePromise;
        });
        Promise.all(promises).then(values => { console.debug("resulting values", values); this.allMovies = values; });
      }
    },
    removeMovie(id, watched) {
      if (!watched) {
        this.$emit("remove-movie", id);
      }
    },
    addedByUser(movieId) {
      const movie = this.allMovies.find(m => m.id == movieId);
      if (movie) {
        console.debug("user", this.user);
        return this.user == movie.addedBy;
      }
      return false;
    }
  },
  emits: ["update-list", "remove-movie"],
  watch: {
    "list.movies.length": {
      handler: async function () {
        console.debug("length of movies has changed");
        await this.getMovieDetails();
      }
    }
  },
  computed: {
    disabled() {
      const watched = this.allMovies.filter(m => !m.watched).length;
      const falsy = watched == 0 ? true : false;
      console.debug("Watched?", watched, falsy);
      return falsy;
    },
    watchedMovies() {
      return this.list.movies.filter(m => m.watched).length;
    }
  }

};
</script>
<style></style>
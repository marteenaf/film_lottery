<template>
  <div class="d-flex flex-row">
    <h1>{{ list.name }}</h1>
    <v-spacer></v-spacer>
    <v-btn :prepend-icon="'add'" @click="this.$router.push({ name: 'AddMovies' })" color="primary">Add
      movies</v-btn>
  </div>
  <div v-if="list && allMovies" style="flex:auto; overflow:auto;">
    <MovieDisplayer v-for="movie in allMovies" :key="movie" :movie="movie">
      <template #add-list>
        <!--<v-checkbox v-model="movie.watched" hide-details
          @update:modelValue="(e) => updateMovieList(movie.id, e)"></v-checkbox>-->
        <v-icon class="ma-3" :icon="movie.watched ? 'done' : ''" color="primary"></v-icon>
        <v-btn :icon="'remove'" @click="removeMovie(movie.id, movie.watched)" :color="'error'" variant="elevated"
          :disabled="movie.watched" size="x-small"></v-btn>
      </template>
    </MovieDisplayer>
  </div>
  <div v-if="this.$route.name == 'ListView'" class="d-flex justify-center pa-4" style="bottom:0px">
    <PickButton :color="'red'" :shadowColor="'darkred'" :text="'Pick Movie'"
      @pick="this.$router.push({ name: 'PickMovies' })" :disabled="disabled"></PickButton>
  </div>
</template>
<script>
import MovieDisplayer from "../reusable/MovieDisplayer.vue";
import PickButton from "@/components/reusable/PickButton.vue";
import { fetchMovieDetails } from "@/scripts/fetchTest";
export default {
  name: "ListDisplayer",
  props: ["list"],
  components: {
    MovieDisplayer,
    PickButton
  },
  data() {
    return {
      allMovies: [],
    };
  },
  async mounted() {
    await this.getMovieDetails();
    console.debug(this.allMovies);
  },
  methods: {
    updateMovieList(movie, watched) {
      this.$emit("update-list", { dbid: movie, watched: watched });
    },
    async getMovieDetails() {

      const promises = this.list.movies.map(async (movie) => {
        const moviePromise = await fetchMovieDetails(movie.dbid);
        moviePromise.watched = movie.watched;
        return moviePromise;
      });
      Promise.all(promises).then(values => { console.debug("resulting values", values); this.allMovies = values; });
    },
    removeMovie(id, watched) {
      if (!watched) {
        this.$emit("remove-movie", id);
      }
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
    }
  }

};
</script>
<style></style>
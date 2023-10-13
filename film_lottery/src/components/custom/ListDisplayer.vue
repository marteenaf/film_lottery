<template>
  <h1>{{ list.name }}</h1>
  <div v-if="list && allMovies">
    <MovieDisplayer v-for="movie in allMovies" :key="movie" :movie="movie"
      @update-movie="(e) => updateMovieList(movie.id, e)"></MovieDisplayer>
  </div>
  <v-btn :prepend-icon="'add'" @click="this.$router.push({ name: 'MovieCatalogView', params: { id: list.uuid } })">Add
    movies</v-btn>
</template>
<script>
import MovieDisplayer from "../reusable/MovieDisplayer.vue";
import { fetchMovieDetails } from "@/scripts/fetchTest";
export default {
  name: "ListDisplayer",
  props: ["list"],
  components: {
    MovieDisplayer
  },
  data() {
    return {
      allMovies: [],
    };
  },
  async created() {
    this.allMovies = await this.getMovieDetails();
    console.debug(this.allMovies);
  },
  methods: {
    updateMovieList(movie, watched) {
      this.$emit("update-list", { dbid: movie, watched: watched });
    },
    async getMovieDetails() {
      let allDetails = [];
      Promise.all(this.list.movies.map(async (movie) => {
        console.debug("Running fetch request");
        const movieDetails = Promise.all([fetchMovieDetails(movie.dbid)]);
        return movieDetails;
      })).then(values => {
        console.debug("Values", values);
        values.map(v => {
          allDetails.push(v[0]);
        });
      }).finally(() => {
        console.debug(allDetails);
        allDetails.map(d => { const listMovie = this.list.movies.find(m => m.dbid == d.id); d.watched = listMovie ? listMovie.watched : false; });
        this.allMovies = allDetails;
      });
    }
  },
  emits: ["update-list"]

};
</script>
<style></style>
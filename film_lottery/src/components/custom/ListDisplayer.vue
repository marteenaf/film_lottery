<template>
  <h1>{{ list.name }}</h1>
  <div v-if="list && list.movies && list.movies.length > 0">
    <MovieDisplayer v-for="movie in list.movies" :key="movie" :movie="movie"
      @update-movie="(e) => updateMovieList(movie.dbid, e)"></MovieDisplayer>
  </div>
  <v-btn :prepend-icon="'add'" @click="this.$router.push({ name: 'MovieCatalogView', params: { id: list.uuid } })">Add
    movies</v-btn>
</template>
<script>
import MovieDisplayer from "../reusable/MovieDisplayer.vue";
export default {
  name: "ListDisplayer",
  props: ["list"],
  components: {
    MovieDisplayer
  },
  data() {
    return {

    };
  },
  methods: {
    updateMovieList(movie, watched) {
      this.$emit("update-list", { dbid: movie, watched: watched });
    }
  },
  emits: ["update-list"]

};
</script>
<style></style>
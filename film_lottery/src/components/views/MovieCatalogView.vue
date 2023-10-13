<template>
  <h1>Movie catalog</h1>
  <MovieDisplayer v-for="movie in movieList" :key="movie"></MovieDisplayer>
  <v-btn @click="this.$router.push({ name: 'ListView', params: { id: this.$route.params.id } })">Done</v-btn>
</template>
<script>
import MovieDisplayer from "../reusable/MovieDisplayer.vue";
export default {
  name: "MovieCatalog",
  components: {
    MovieDisplayer,
  },
  data() {
    return {
      movieList: [],
    };
  }
};
</script>
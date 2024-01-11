<template>
  <MovieDetailsDisplayer v-if="mounted" :movie="movie"></MovieDetailsDisplayer>
</template>
<script lang="ts">
import MovieDetailsDisplayer from "../custom/MovieDetailsDisplayer.vue";
import { fetchMovieDetails, fetchMovieCredits } from "@/scripts/Data IO/movieQueries";
export default {
  name: "MovieDetailsView",
  components: { MovieDetailsDisplayer },
  props: ["movieId"],
  data() {
    return {
      movie: null,
      mounted: false,
    };
  },
  async mounted() {
    console.debug("[Movie Details] Mounting...");
    await this.getAllMovieDetails();
    console.debug(this.movie);
    this.mounted = true;
  },
  methods: {
    async getAllMovieDetails() {
      console.debug("Run query to get all details");
      const requestResult = await fetchMovieDetails(this.movieId);
      const creditsResult = await fetchMovieCredits(this.movieId);
      this.movie = { ...requestResult.data, ...creditsResult.data };

    }
  }
};
</script>
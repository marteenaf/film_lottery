<template>
  <OverlayLayout ref="overlay" :title="movieTitle" :subtitle="releaseYear" :override-route="path">
    <v-container>
      <v-row>
        <v-col cols="6">
          <img :src="'https://image.tmdb.org/t/p/original/' + posterPath" style="width:100%" />
        </v-col>
        <v-col cols="6">
          <h3>Director</h3>
          <p v-for="i in director" :key="i">{{ i }}</p>
          <h3>Cast</h3>
          <p v-for="i in cast" :key="i">{{ i }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>{{ movie.overview }}</p>
        </v-col>
      </v-row>
    </v-container>
  </OverlayLayout>
</template>
<script lang="ts">
import OverlayLayout from "../layouts/OverlayLayout.vue";
export default {
  name: "MovieDetailsDisplayer",
  props: ["movie"],
  components: {
    OverlayLayout
  },
  mounted() {
    this.$refs.overlay.open();
    console.debug(this.movie);
  },
  computed: {
    movieTitle() {
      return this.movie?.title.toString();
    },
    releaseYear() {
      return this.movie?.release_date.split("-")[0];
    },
    posterPath() {
      return this.movie?.poster_path ? this.movie.poster_path : "";
    },
    duration() {
      let result = this.movie?.runtime;
      if (result) {
        result += "m";
      }
      return result;
    },
    path() {
      const lastPath = this.$router.options.history.state.back;
      return { path: lastPath, query: { searchText: this.movie.title } };
    },
    cast() {
      const cast = this.movie?.cast?.filter((c, i) => i < 3).map(c => c.name);
      return cast;
    },
    director() {
      const result = this.movie?.crew?.filter(c => c.job == "Director").map(c => c.name);
      return result;
    }
  }
};
</script>
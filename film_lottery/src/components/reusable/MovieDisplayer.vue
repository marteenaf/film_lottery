<template>
  <v-card variant="outlined" class="d-flex">
    <v-card-item><img :src="'https://image.tmdb.org/t/p/original/' + posterPath" width="75" /></v-card-item>
    <v-card-item style="flex:auto !important">
      <v-card-title :class="movie.watched ? 'watched' : ''" style="text-wrap:wrap">{{ movieTitle }}</v-card-title>
      <v-card-subtitle>{{ releaseYear }}</v-card-subtitle>
      <v-card-subtitle>{{ addedBy }}</v-card-subtitle>
    </v-card-item>
    <v-spacer></v-spacer>
    <v-card-item>{{ movie.watched ? "Watched" : "" }}</v-card-item>
    <v-card-actions>
      <slot name="add-list"></slot>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
export default {
  name: "MovieDisplayer",
  props: ["movie"],
  data() {
    return {
    };
  },
  computed: {
    movieTitle() {
      return this.movie?.title.toString();
    },
    releaseYear() {
      return this.movie?.release_date.split("-")[0];
    },
    addedBy() {
      return this.movie?.addedBy ? this.movie.addedBy : "";
    },
    posterPath() {
      return this.movie?.poster_path ? this.movie.poster_path : "";
    },
    director() {
      return this.movie?.director;
    },
    duration() {
      return this.movie?.length;
    }
  }
};
</script>
<style scoped>
.watched {
  text-decoration: line-through;
}
</style>
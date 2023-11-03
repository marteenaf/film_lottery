<template>
  <v-card variant="outlined" class="d-flex">
    <v-card-item style="flex:auto !important">
      <v-card-title :class="movie.watched ? 'watched' : ''" style="text-wrap:wrap">{{ movieTitle }}</v-card-title>
      <v-card-subtitle>{{ releaseYear }}</v-card-subtitle>
    </v-card-item>
    <v-spacer></v-spacer>
    <v-card-item>{{ movie.watched ? "Watched" : "" }}</v-card-item>
    <v-card-actions>
      <slot name="add-list"></slot>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "MovieDisplayer",
  props: ["movie"],
  data() {
    return {};
  },
  computed: {
    movieTitle() {
      return this.movie.title.toString();
    },
    releaseYear() {
      return this.movie.release_date.split("-")[0];
    }
  }
};
</script>
<style scoped>
.watched {
  text-decoration: line-through;
}
</style>
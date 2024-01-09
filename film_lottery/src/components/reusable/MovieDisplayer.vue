<template>
  <v-card :variant="movie.watched ? 'tonal' : 'outlined'" class="d-flex">
    <v-card-item class="pa-2"><img :src="'https://image.tmdb.org/t/p/original/' + posterPath" width="75" /></v-card-item>
    <v-card-item class="pa-2" style="flex:auto !important;">
      <v-card-title v-if="movie.watched">WATCHED</v-card-title>
      <v-card-title
        :class="[movie.watched ? 'watched' : '', 'text-wrapped', screen ? 'small-screen-title' : '', 'mb-2']">{{
          movieTitle }}</v-card-title>
      <v-card-subtitle :class="screen ? 'small-screen-subtitle' : ''">{{ releaseYear }} {{ duration }}m</v-card-subtitle>
      <v-card-subtitle :class="screen ? 'small-screen-subtitle' : ''">{{ addedBy }}</v-card-subtitle>
    </v-card-item>
    <v-card-actions class="pa-2">
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
    duration() {
      return this.movie?.runtime;
    },
    screen() {
      return this.$vuetify.display.name == "xs";
    }
  }
};
</script>
<style scoped>
.watched {
  text-decoration: line-through;
}

.text-wrapped {
  text-wrap: wrap;
}

.small-screen-title {
  font-size: 1rem !important;
  line-height: 1.25rem !important;
}

.small-screen-subtitle {
  font-size: 0.75rem !important;
  line-height: 1rem !important;
}
</style>
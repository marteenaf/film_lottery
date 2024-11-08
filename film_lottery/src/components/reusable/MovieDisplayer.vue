<template>
  <v-card variant="elevated" :class="['d-flex']" min-height="130px" @click="movieDetails"
    style="cursor: pointer;" :color="isMain?'primary-container':'primay'">
    <v-card-item :class="['pa-2', movie.watched ? 'opacity' : '']">
      <img :src="'https://image.tmdb.org/t/p/original/' + posterPath" width="75" align="center" />
    </v-card-item>
    <v-card-item class="pa-2" style="flex:auto !important;">
      <v-card-subtitle :class="[screen ? 'small-screen-subtitle' : '']">{{ addedBy }}</v-card-subtitle>
      <v-card-title v-if="movie.watched" class="font-weight-bold">WATCHED</v-card-title>
      <v-card-title
        :class="[movie.watched ? 'watched' : '', 'text-wrapped', screen ? 'small-screen-title' : '', 'mb-2']">{{
          movieTitle }}</v-card-title>
      <v-card-subtitle :class="screen ? 'small-screen-subtitle' : ''">{{ releaseYear }} {{ duration }}</v-card-subtitle>
    </v-card-item>
    <v-card-actions class="pa-2 d-flex flex-column">
        <slot name="movie-actions" ></slot>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
export default {
  name: "MovieDisplayer",
  props: ["movie","isMain"],
  components: {
  },
  methods: {
    async movieDetails() {
      const route = this.$route.path;
      const newPath = route + "/movie/" + this.movie.id;
      this.$router.push(newPath);
    },
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
      let result = this.movie?.runtime;
      if (result) {
        result += "m";
      }
      return result;
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

.opacity {
  opacity: 20%;
}
</style>
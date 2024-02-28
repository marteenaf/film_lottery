<template>
  <OverlayLayout ref="overlay" :title="originalTitle"
    :subtitle="releaseYear + ' ' + (originalLanguage !== 'en' ? movieTitle : '')" :override-route="'close'">
    <ScrollableContentLayout>
      <template #main-body>
        <v-container v-if="movie">
          <v-row>
            <v-col cols="6">
              <img :src="'https://image.tmdb.org/t/p/original/' + posterPath" style="width:100%" />
            </v-col>
            <v-col cols="6" class="d-flex flex-column">
              <h5>Director</h5>
              <p v-for="i in director" :key="i">{{ i }}</p>
              <v-spacer></v-spacer>
              <h5>Cast</h5>
              <p v-for="i in cast" :key="i">{{ i }}</p>
              <v-spacer></v-spacer>
              <h5>Duration</h5>
              <p>{{ duration }}</p>
              <v-spacer></v-spacer>
              <h5>Genre</h5>
              <p>{{ genres }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>{{ overview }}</p>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </ScrollableContentLayout>
  </OverlayLayout>
</template>
<script lang="ts">
import OverlayLayout from "../layouts/OverlayLayout.vue";
import ScrollableContentLayout from "../layouts/ScrollableContentLayout.vue";
import { fetchMovieCredits, fetchMovieDetails } from "@/scripts/Data IO/movieQueries";
export default {
  name: "MovieDetailsDisplayer",
  props: ["movieId"],
  components: {
    OverlayLayout,
    ScrollableContentLayout
  },
  data() {
    return {
      movie: null,
    };
  },
  methods: {
    async open() {
      await this.getFullDetails();
      this.$refs.overlay.open();

      //console.debug("movie", this.movie);
    },
    async getFullDetails() {
      const detailsResult = await fetchMovieDetails(this.movieId);
      const creditsResult = await fetchMovieCredits(this.movieId);
      this.movie = { ...detailsResult.data, ...creditsResult.data };
    }
  },
  computed: {
    movieTitle() {
      return this.movie?.title?.toString();
    },
    releaseYear() {
      return this.movie?.release_date?.split("-")[0];
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
    overview() {
      return this.movie?.overview;
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
    },
    originalTitle() {
      return this.movie?.original_title;
    },
    originalLanguage() {
      return this.movie?.original_language;
    },
    genres() {
      return this.movie?.genres.map(g => g.name).reduce((acc, curr) => { return curr + ", " + acc; }, "");
    }
  }
};
</script>
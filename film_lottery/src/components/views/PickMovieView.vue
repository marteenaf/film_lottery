<template>
  <v-container class="" style="height:100%">
    <v-row class="">
      <v-col style="height:200px;" class="d-flex flex-column justify-center align-center">
        <h1 class="text-center">{{ selectedMovie ? selectedMovie.title : "No movie" }}</h1>
        <h3 class="text-center">Added by {{ selectedMovie ? selectedMovie.addedBy : "Noone" }}</h3>
      </v-col>
    </v-row>
    <v-row class="">
      <v-col align="center" :cols="12">
        <PickButton :text="'Pick Again'" :color="'red'" :shadowColor="'darkred'" @pick="pickMovie" :disabled="disabled">
        </PickButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" :cols="cols">
        <PickButton :text="'Watch Movie'" :color="'green'" :shadowColor="'darkgreen'" @pick="watchMovie">
        </PickButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" :cols="cols" v-if="disabled">
        <PickButton :text="'Back to List'" :color="'lightgrey'" :shadowColor="'grey'" @pick="toList">
        </PickButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col style="height:200px;" class="d-flex justify-center align-center">
        <h1 class="text-center">{{ count == max ? 'No more attempts for now!' : max - count }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col style="height:200px;" class="justify-center align-center">
        <h6 class="text-center">Last Watched </h6>
        <h3 class="text-center"> {{ lastWatchedMovie ? lastWatchedMovie.title : "No movie" }} </h3>
        <h6 class="text-center"> Added by {{ lastWatchedMovie ? lastWatchedMovie.addedBy : "Noone" }}</h6>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { fetchMovieDetails } from "@/scripts/Data IO/movieQueries";
import PickButton from "../reusable/PickButton.vue";
import { useListStore } from "@/stores/listsStore";
export default {
  name: "PickMovieView",
  props: ["maxPicks"],
  components: {
    PickButton,
  },
  data() {
    return {
      count: 0,
      max: this.maxPicks ? this.maxPicks : 5,
      store: useListStore(),
      selectedMovie: null,
      lastWatchedMovie: null,
    };
  },
  async mounted() {
    const requestResult = await fetchMovieDetails(this.store.selectedList.lastPicked);
    this.lastWatchedMovie = requestResult?.data;
    this.lastWatchedMovie.addedBy = this.store.getLastPickedUser;
    await this.pickMovie();
  },
  methods: {
    async pickMovie() {
      if (this.count < this.max + 1) {
        const movieList = this.store.selectedList.movies.filter(m => !m.watched);
        const lastUser = this.store.getLastPickedUser;
        const length = movieList.length;
        if (length > 0) {

          //create the new bucket with weighting
          const weightedMovieList = [];
          movieList.map(m => {
            let multiplier = 1;
            if (lastUser && lastUser != m.addedBy) {
              multiplier = 2;
            }
            for (let i = 0; i < multiplier; i++) {
              weightedMovieList.push(m);
            }
          });
          const weightedLength = weightedMovieList.length;
          const index = Math.floor(Math.random() * weightedLength);
          const movieId = weightedMovieList[index].dbid;
          const requestResult = await fetchMovieDetails(movieId);
          this.selectedMovie = requestResult?.data;
          this.selectedMovie.addedBy = weightedMovieList[index].addedBy;
          this.count++;
        } else {
          this.count = 0;
        }
      }
    },
    watchMovie() {
      if (this.selectedMovie) {
        const obj = { dbid: this.selectedMovie.id, watched: true };
        this.store.updateCurrentListMovie(obj);
        this.$router.push({ name: "ListView", params: this.$route.params });
      }
    },
    toList() {
      this.$router.push({ name: "ListView", params: this.$route.params });
    }
  },
  computed: {
    disabled() {
      return this.selectedMovie ? this.count >= this.max : true;
    },
    cols() {
      const display = this.$vuetify.display.name;
      const sizes = {
        "xs": 12,
        "sm": 12,
        "md": 6,
        "lg": 6,
        "xl": 6,
        "xxl": 6
      };
      return sizes[display];
    }
  }
};
</script>@/scripts/movieQueries
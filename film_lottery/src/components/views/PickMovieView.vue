<template>
  <v-container>
    <h1>Pick Movie</h1>
    <h1>Movie is: {{ selectedMovie ? selectedMovie.title : "No movie" }}</h1>
    <PickButton :text="'Pick Again'" :color="'red'" :shadowColor="'darkred'" @pick="pickMovie" :disabled="disabled">
    </PickButton>
    <PickButton :text="'Watch Movie'" :color="'green'" :shadowColor="'darkgreen'" @pick="watchMovie" :disabled="disabled">
    </PickButton>
  </v-container>
</template>
<script>
import { fetchMovieDetails } from "@/scripts/fetchTest";
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
      max: this.maxPicks ? this.maxPicks : 10,
      store: useListStore(),
      selectedMovie: null,
    };
  },
  async mounted() {
    await this.pickMovie();
  },
  methods: {
    async pickMovie() {
      if (this.count < this.max) {
        const movieList = this.store.selectedList.movies.filter(m => !m.watched);
        const length = movieList.length;
        console.debug(length);
        if (length > 0) {
          const index = Math.floor(Math.random() * length);
          const movieId = movieList[index].dbid;
          this.selectedMovie = await fetchMovieDetails(movieId);
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
    }

  },
  computed: {
    disabled() {
      return this.selectedMovie ? this.count >= this.max : true;
    }
  }
};
</script>
<template>
  <h1>Movie catalog</h1>
  <v-text-field :append-icon="'search'" :label="'Search for movies'" v-model="searchText" clearable
    style="max-height:80px !important"></v-text-field>
  <div style="flex:auto; overflow:scroll;">
    <MovieDisplayer v-for="movie in movieList" :key="movie" :movie="movie">
      <template #add-list>
        <v-btn :icon="inList[movie.id] ? 'check' : 'add'" @click="addToList(movie.id)"
          :color="inList[movie.id] ? 'success' : 'primary'" variant="elevated"></v-btn>
      </template>
    </MovieDisplayer>
  </div>
  <v-btn @click="this.$router.push({ name: 'ListView', params: { id: this.$route.params.id } })" color="primary"
    class="mt-4">Done</v-btn>
</template>
<script>
import MovieDisplayer from "../reusable/MovieDisplayer.vue";
import { searchMovies } from "@/scripts/fetchTest";
import { useListStore } from "@/stores/listsStore";

export default {
  name: "MovieCatalog",
  components: {
    MovieDisplayer,
  },
  data() {
    return {
      movieList: [],
      searchText: "",
      listStore: useListStore(),
      inList: {},
    };
  },
  methods: {
    addToList(id) {
      console.assert(this.listStore.selectedList.movies.length <= this.listStore.selectedList.maxLength, "there are too many movies");
      console.debug(this.listStore.selectedList.movies.length, "<=", this.listStore.selectedList.maxLength);
      if (this.listStore.selectedList.movies.length < this.listStore.selectedList.maxLength) {
        this.inList[id] = true;
      }
      this.listStore.addMovie(id);
      console.debug(this.listStore.selectedList);
      console.debug("Check in list", this.inList);
    },
  },
  watch: {
    async searchText(value) {
      //run query to get the movies
      const searchResult = await searchMovies(value);
      this.movieList = searchResult.results.map((mov) => {
        if (this.listStore.selectedList) {
          const movieList = this.listStore.selectedList.movies.find(m => m.dbid == mov.id);
          if (movieList) {
            mov.watched = movieList.watched;
            this.inList[mov.id] = true;
          }
        }
        return mov;
      });
    },
    "listStore.selectedList.movies": {
      deep: true,
      handler: function (value) {
        console.debug("list store changes?", value);
        this.movieList.map(m => {
          const movie = value.find(mov => mov.dbid == m.id);
          if (movie) {
            m.watched = movie.watched;
          }
        });
      }
    }
  }
};
</script>
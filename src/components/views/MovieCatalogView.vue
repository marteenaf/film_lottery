<template>
  <OverlayLayout ref="overlay" title="Movie Catalogue" subtitle="Search for movies by title">
    <MainLayout>
      <template #header>
        <v-text-field :append-inner-icon="'search'" :label="'Search for movies'" v-model="searchText" clearable
          style="max-height:80px !important"></v-text-field>
      </template>
      <template #content>
        <v-col class="pa-0">
          <!--<h1>Movie catalog</h1>-->
          <div style="display:flex; flex-direction:column;overflow:scroll; gap:8px">
            <MovieDisplayer v-for="movie in movieList" :key="movie" :movie="movie">
              <template #movie-actions>
                <div class="d-flex flex-column justify-center align-center pa-2" style="height:100%">
                <v-btn :icon="inList[movie.id] ? 'check' : 'add'" @click.stop="updateList(movie.id, movie.watched)"
                  :color="inList[movie.id] ? 'success' : 'primary'" variant="elevated" size="small"></v-btn>
                </div>
              </template>
            </MovieDisplayer>
          </div>
        </v-col>
      </template>
      <template #fab>
        <v-col align="center">
          <v-btn
            @click="() => { patchList(); this.$router.push({ name: 'ListView', params: { id: this.$route.params.id } }) }"
            color="primary" class="mt-4">Done</v-btn>
        </v-col>
      </template>
    </MainLayout>
  </OverlayLayout>
  <router-view></router-view>
</template>
<script lang="ts">
import MovieDisplayer from "../reusable/MovieDisplayer.vue";
import MainLayout from "@/components/layouts/MainLayout.vue";
import OverlayLayout from "@/components/layouts/OverlayLayout.vue";
import { searchMovies } from "@/scripts/Data IO/movieQueries";
import { useListStore } from "@/stores/listsStore";
import { useUserStore } from "@/stores/usersStore";

export default {
  name: "MovieCatalog",
  components: {
    MovieDisplayer,
    MainLayout,
    OverlayLayout
  },
  data() {
    return {
      movieList: [],
      searchText: "",
      listStore: useListStore(),
      userStore: useUserStore(),
      inList: {},
    };
  },
  mounted() {
    this.$refs.overlay.open();
    if (this.$route.query?.searchText) {
      this.searchText = this.$route.query.searchText;
    }
  },
  methods: {
    addToList(id) {
      console.assert(this.listStore.selectedList.movies.length <= this.listStore.selectedList.maxLength, "there are too many movies");
      if (this.listStore.checkUserCanAddMovies && this.listStore.selectedList.movies.length < this.listStore.selectedList.maxLength) {
        this.inList[id] = true;
        this.listStore.addMovie(id, this.userStore.getUser);
        //console.debug(this.listStore.selectedList);
        //console.debug("Check in list", this.inList);
      }

    },
    removeFromList(id) {
      if (this.inList[id]) {
        this.listStore.removeMovie(id);
        this.inList[id] = false;
      }

      //console.debug(this.listStore.selectedList);
      //console.debug("Check in list", this.inList);
    },
    updateList(id, watched) {
      if (!watched) {
        if (this.inList[id]) {
          this.removeFromList(id);
        } else {
          this.addToList(id);
        }
        this.searchText = "";
      }
    },
    async patchList() {
      await this.listStore.patchSelectedListMovies();
    }
  },
  watch: {
    async searchText(value) {
      //run query to get the movies
      const requestResult = await searchMovies(value);
      const searchResult = requestResult.data;
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
</script>@/scripts/movieQueries
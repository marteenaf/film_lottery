<template>
  <v-container class="" style="height:100%">
    <v-row class="">
      <v-col style="height:200px;" class="d-flex justify-center align-center">
        <h1 v-if="count != max" class="text-center">{{ selectedMovie ? selectedMovie.title : "No movie" }}</h1>
        <h1 v-else class="text-center">No more pick attempts for now!</h1>
      </v-col>
    </v-row>
    <v-row class="">
      <v-col align="center" :cols="12">
        <PickButton :text="'Pick Again'" :color="'red'" :shadowColor="'darkred'" @pick="pickMovie" :disabled="disabled">
        </PickButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" :cols="cols" v-if="disabled">
        <PickButton :text="'Back to List'" :color="'lightgrey'" :shadowColor="'grey'" @pick="toList">
        </PickButton>
      </v-col>
      <v-col align="center" :cols="cols" v-else>
        <PickButton :text="'Watch Movie'" :color="'green'" :shadowColor="'darkgreen'" @pick="watchMovie"
          :disabled="disabled">
        </PickButton>
      </v-col>
    </v-row>
    <v-row>
      <v-col style="height:200px;" class="d-flex justify-center align-center">
        <h1>{{ max - count }}</h1>
      </v-col>
    </v-row>
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
      max: this.maxPicks ? this.maxPicks : 3,
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
      console.log("display name", display, this.$vuetify);

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
</script>
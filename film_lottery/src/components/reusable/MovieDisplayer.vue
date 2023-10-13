<template>
  <v-card variant="outlined" class="d-flex">
    <v-card-item :class="watched ? 'watched' : ''">{{ movieTitle }}</v-card-item>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-card-text>{{ watched ? "Watched" : "" }}</v-card-text>
      <v-checkbox v-model="watched" hide-details @update:modelValue="(e) => this.$emit('update-movie', e)"></v-checkbox>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "MovieDisplayer",
  props: ["movie"],
  data() {
    return { watched: this.movie.watched, };
  },
  mounted() {
    console.debug("[Movie Viewer] Mounting...", this.movie, this.watched);
  },
  methods: {

  },
  computed: {
    movieTitle() {
      return this.movie.dbid.toString();
    }
  }
};
</script>
<style scoped>
.watched {
  text-decoration: line-through;
}
</style>
<template>
  <v-overlay v-model="overlay">
    <v-card class="wrapper">
      <slot></slot>
    </v-card>
  </v-overlay>
</template>
<script>
export default {
  name: "OverlayLayout",
  data() {
    return {
      overlay: false,
    };
  },
  methods: {
    open() {
      this.overlay = true;
    },
    close() {
      this.overlay = false;
    }
  }
};
</script>
<style>
.v-overlay__content {
  height: 100% !important;
  width: 100% !important;
  padding: 16px;
}
</style>
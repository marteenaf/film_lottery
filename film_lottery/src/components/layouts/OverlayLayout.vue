<template>
  <v-overlay v-model="overlay">
    <v-btn icon size="small" style="align-self: flex-end;" @click="close()">
      <v-icon>close</v-icon>
    </v-btn>
    <v-card class="wrapper">
      <slot></slot>
    </v-card>
  </v-overlay>
</template>
<script lang="ts">
export default {
  name: "OverlayLayout",
  props: {
    overrideRoute: Object
  },
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
      const parentRoute = this.$route.matched[0];
      if (!this.overrideRoute) {
        this.$router.push({ name: parentRoute.name, params: parentRoute.params, meta: parentRoute.meta });
      } else {
        this.$router.push(this.overrideRoute);
      }
    }
  }
};
</script>
<style>
.v-overlay__content {
  height: 100% !important;
  width: 100% !important;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.gap {
  gap: 8px;
}

.v-overlay__scrim {
  pointer-events: none !important;
}
</style>
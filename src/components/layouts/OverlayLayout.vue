<template>
  <v-overlay v-model="overlay">
    <v-btn icon size="small" style="align-self: flex-end;" @click="close()">
      <v-icon>close</v-icon>
    </v-btn>
    <v-card class="wrapper d-flex flex-column">
      <v-card-title class="font-weight-bold pb-0">{{ title }}</v-card-title>
      <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
      <v-card-item class="overlay-content" style="flex:auto !important;overflow:hidden!important">
        <slot></slot>
      </v-card-item>
    </v-card>
  </v-overlay>
</template>
<script lang="ts">
export default {
  name: "OverlayLayout",
  props: {
    overrideRoute: [Object, Number, String],
    title: String,
    subtitle: String,
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
      const parentRoute = this.$route.matched[this.$route.matched.length - 2];
      if (!this.overrideRoute) {
        this.$router.push({ name: parentRoute.name, params: parentRoute.params, meta: parentRoute.meta });
      } else {
        if (typeof this.overrideRoute == "number") {
          this.$router.go(-1);
        } else if (this.overrideRoute == "close") {

        } else {
          console.debug("override route", this.overrideRoute);
          this.$router.push(this.overrideRoute);
        }

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

.overlay-content>.v-card-item__content {
  height: 100% !important;
}
</style>
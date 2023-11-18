<template>
  <v-container class="wrapper d-flex flex-column">
    <v-row class="header">
      <slot name="header"></slot>
    </v-row>
    <v-row class="auto">
      <slot name="content"></slot>
    </v-row>
    <v-row class="footer">
      <slot name="fab"></slot>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "MainLayout",
};
</script>
<style>
.wrapper {
  height: 100% !important;
  max-height: 100% !important;
}

.auto {
  /*flex: auto;*/
  flex-grow: 1;
  overflow: auto;
}

.footer {
  height: min-content !important;
  flex: none !important;
}

.header {
  height: min-content !important;
  flex: none !important;
}
</style>
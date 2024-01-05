<template>
  <v-container
    :class="['wrapper', 'd-flex', 'flex-column', centered ? 'align-center' : '', centered ? 'justify-center' : '']">
    <v-row class="header">
      <slot name="header"></slot>
    </v-row>
    <v-row :class="['auto', centered ? 'auto-centered' : '']">
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
  props: ["centered"]
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

.auto-centered {
  height: min-content !important;
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
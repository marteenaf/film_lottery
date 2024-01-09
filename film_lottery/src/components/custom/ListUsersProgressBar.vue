<template>
  <div class="d-flex justify-space-between">
    <div v-for="i in 3" :key="i" style="flex-grow:1">
      <p>Label</p>
      <v-progress-linear :model-value="values[i]" height="6" rounded></v-progress-linear>
    </div>
  </div>
</template>
<script lang = "ts">
export default {
  name: "ListUsersProgressBar",
  props: ["num"],
  data() {
    return {
      values: []
    };
  },
  mounted() {
    for (let i = 0; i < 3; i++) {
      this.values.push(50);
    }
  },
};
</script>
<style scoped>
.bar {
  height: var(--bar-height);
  display: flex;
  flex-direction: row;
  border: solid;
  border-radius: var(--border-rounded);
  flex-grow: 1;

}
</style>
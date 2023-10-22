<template>
  <h1>Main</h1>
  <HomeButton />
  <slot></slot>
</template>
<script>
import HomeButton from "../reusable/HomeButton.vue";
export default {
	name: "MainLayout",
	components: { HomeButton }
};
</script>
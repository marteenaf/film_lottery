<template>
	<v-btn :icon="icon || 'home'" variant="elevated" :to="routePath" id="home-button" color="primary"></v-btn>
</template>
<script>
export default {
	name: "HomeButton",
	props: {
		routePath: String,
		icon: String
	}
};
</script>
<style>
/* #home-button{
  position:absolute;
  left:20px;
  top:20px;
} */
</style>
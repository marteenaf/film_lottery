<template>
  <v-btn :icon="icon||'home'" variant="outlined" :to="routePath" id="home-button"></v-btn>
</template>
<script>
export default {
	name:"HomeButton",
	props:{
		routePath:String,
		icon:String
	}
};
</script>
<style>
#home-button{
  position:absolute;
  left:20px;
  top:20px;
}
</style>
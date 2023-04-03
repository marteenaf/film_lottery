<template>
  <v-btn :icon="icon" variant="outlined" class="menu-button"></v-btn>
</template>
<script>

export default{
	name:"MenuButton",
	props:{
		text:String,
		icon:String,
	}
};
</script>
<style scoped>
.menu-button{
  margin:5px;
}
</style>
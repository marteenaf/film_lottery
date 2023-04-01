<template>
    <v-btn prepend-icon="ads_click" color="secondary" variant="tonal" @click="onClick">Click Me!</v-btn>
</template>

<script>
export default {
	name: "TestComponent",
	methods:{
		onClick(){
			console.debug("Clicking");
		}
	}
};
</script>
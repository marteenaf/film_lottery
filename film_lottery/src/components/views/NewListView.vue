<template>
<h1>New List {{ key }}</h1>
</template>
<script>
export default{
	name:"NewList",
	data(){
		return {
			list:null,
			name:"",
			maxLength:5,
			users:[],
			movies:[],
			key:"name"
		};
	},
	mounted(){
		this.key = this.$route.params.key;
	}
};
</script>

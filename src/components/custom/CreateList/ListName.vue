<template>
    <div class="step-text mb-5">
    <h3>Name</h3>
    <p>What are you going to call this list?</p>
</div>
<div class="step-input">
    <v-text-field v-model="_formValue"></v-text-field>
</div>
</template>
<script>
export default{
    name:"ListName",
    props:["formValue","name","users"],
    emits:["update:formValue"],
    computed:{
        _formValue:{
            get(){
                return this.formValue;
            },
            set(value){
                this.$emit("update:formValue",value);
            }
        }
    }
};
</script>
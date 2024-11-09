<template>
    <div class="step-text mb-5">
        <h3>Collaborators</h3>
        <p>Are you going to watch these movies with other people? Let them collaborate on the list with you!</p>
    </div>
    <div class="step-input">
<v-checkbox v-model="isCollaborative" label="Collaborate"></v-checkbox>
<v-combobox v-if="isCollaborative" :items="[]" :item-title="'email'" chips clearable v-model="_formValue"
item-value="email" label="Add other users by email" multiple></v-combobox>
</div>
</template>
<script>
export default{
    name:"ListCollaborators",
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
    },
    data(){
        return{
            isCollaborative:false,
        };
    }
};
</script>
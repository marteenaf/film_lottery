<template>
    <div class="step-text mb-5">
        <h3>Length</h3>
        <p>Are you going to watch these movies with other people? Let them collaborate on the list with you!</p>
    </div>
    <div class="step-input">
        <v-checkbox v-model="isUnlimited" label="Unlimited" @input="setToInfinity()"></v-checkbox>
        <v-text-field v-if="!isUnlimited" v-model="_formValue" type="number" :min="1" :step="1" :rules="lengthRules"></v-text-field>
        <p>{{isUnlimited?"You will be able to add as many movies as you like!":"Total movies: "+((users.length+1)*_formValue)}}</p>
    </div>
</template>
<script>
export default{
    name:"ListLength",
    props:["formValue","users","name"],
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
            isUnlimited:false,
            lengthRules:[
                (value)=>{if(!value || value<1){return "You must add at least 1 movie";}else{return true;}}
            ]
        };
    },
    methods:{
        setToInfinity(){
            if(this.isUnlimited){
                this._formValue = 0;
            }else{
                this._formValue = 1;
            }
        }
    }
};
</script>
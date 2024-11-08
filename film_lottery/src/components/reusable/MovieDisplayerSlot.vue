<template>
    <v-card variant="tonal" min-height="137px" :color="add?'primary':''">
            <v-card-item>
                <div class="d-flex flex-column align-center">
                <v-card-text>{{ message }}</v-card-text>
                <v-btn v-if="add" icon="add" color="primary" class="mb-2" @click="this.$router.push({ name: 'AddMovies' })"></v-btn>
            </div>
            </v-card-item>
    </v-card>
</template>
<script lang="ts">
export default{
    name:"MovieDisplayerSlot",
    props:["message","add"],
};
</script>
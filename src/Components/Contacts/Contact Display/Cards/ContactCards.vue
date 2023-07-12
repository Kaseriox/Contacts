<template>
    <div class="grid grid-cols-4">
        <template v-for="Contact in data">
            <Card :Data="Contact"/>
        </template>
    </div>

</template>

<script>
import { mapGetters } from 'vuex';
import Card from './Card.vue';
export default {
components: {Card},
props:{
    data:{
        required:true,
        type:Array
    }
},
};
</script>

<style>

</style>

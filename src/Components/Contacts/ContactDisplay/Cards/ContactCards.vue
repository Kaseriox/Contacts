<template>
    <div class="grid grid-cols-4">
        <Card v-for="Contact in data"  :Data="Contact" :key="Contact.id"/>
    </div>

</template>

<script>
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

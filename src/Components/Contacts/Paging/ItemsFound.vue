<template>
    <div class="flex flex-row ">
        <p class="mr-1">Iš viso rasta: </p>
        <p  class="font-bold" >{{count?? 0}} {{name}}</p>
    </div>
</template>
  
<script>

export default {
    props:{
        count:{
            required:true
        },
        name:{
            required:true
        }
    },
};
</script>
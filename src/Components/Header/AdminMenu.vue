<template>
    <div class="flex flex-row justify-evenly text-custom-white text-2xl">
        <div @click="PushRoute('/')" class=" hover:text-blue-400 cursor-pointer">Kontaktai</div>
        <div @click="PushRoute('/company')" class=" hover:text-blue-400 cursor-pointer">Įmonės</div>
        <div @click="PushRoute('/structure')" class=" hover:text-blue-400 cursor-pointer">Struktūra</div>
        <div @click="PushRoute('/account')" class=" hover:text-blue-400 cursor-pointer">Paskyros</div>
    </div>
</template>
  
<script>
export default {

    methods:{
    PushRoute(route)
    {
        if(this.$route.path !== route)
        {
            this.$router.push(route)
        }
    }
},
};
</script>
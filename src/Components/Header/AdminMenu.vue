<template>
    <div class="flex flex-row justify-evenly text-custom-white text-2xl">
        <template v-for="item in pages">
            <div v-if="$route.path === item.route" class="text-blue-400 select-none">{{item.name}}</div>
            <div v-else @click="PushRoute(item.route)" class=" hover:text-blue-400 cursor-pointer select-none">{{item.name}}</div>
        </template>
    </div>
</template>
  
<script>
export default {
    data()
    {
        return{
            pages:[
                {route:'/',name:'Kontaktai'},
                {route:'/company',name:'Įmonės'},
                {route:'/structure',name:'Struktūra'},
                {route:'/account',name:'Paskyros'}
            ]
        }
    },
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
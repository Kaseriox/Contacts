<template>
    <div class="flex flex-row">
            <button v-for="Item in itemsPerPageOptions" :key="Item" @click="set_item_count_per_page(Item)" :disabled="ItemsPerPage == Item" class="mr-6 px-3 py-1 rounded-md flex justify-center items-center text-white text-base bg-blue-700 disabled:bg-slate-500">{{ Item }}</button>
    </div>
</template>
  
<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    components: {
    },
    data() {
        return {
            itemsPerPageOptions:[5,10,25,50,100,'All']
        };
    },
    methods:{
        ...mapActions({
            set_item_count_per_page:'Paging/set_item_count_per_page'
        })
    },
    computed:{
        ...mapGetters({
            ItemsPerPage:'Paging/ItemsPerPage'
        })
    }
};
</script>
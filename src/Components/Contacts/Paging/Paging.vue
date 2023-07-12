<template>
    <div class="flex justify-center">
        <button :disabled="Page <= 1 || Page > TotalPages" @click="set_page(-1)" class="w-2/12 mr-6 pl-2 py-1 rounded-md flex justify-start items-center text-white text-base bg-blue-700 disabled:bg-slate-500">
            <div class="flex flex-row">
                <img src="./../../../assets/svg/double_left.svg"/>
                <p class=" text-base">Previous Page</p>
            </div>
            </button>
        <button :disabled="Page >= TotalPages" @click="set_page(1)" class=" w-2/12 pr-2 py-1 rounded-md flex justify-end items-center text-white text-base bg-blue-700 disabled:bg-slate-500">
            <div class="flex flex-row">
                <p class=" text-base">Next Page</p>
                <img class=" rotate-180" src="./../../../assets/svg/double_left.svg"/>
            </div>
        </button>
    </div>
</template>
  
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    components: {
    },
    data() {
        return {
        };
    },
    methods:{
        ...mapActions({
            set_page:'Paging/set_page',
        })
    },
    computed:{
        ...mapGetters({
            Page:'Paging/Page',
            TotalPages:'Paging/TotalPages',
        })
    }
};
</script>
<template>
    <div class="flex flex-row items-center">
        <Input v-model="input" :icon="{type:'material-symbols:search',size:24}" :placeholder="'Ieškoti kontakto....'" class=" mr-6 w-11/12"/>
        <button @click="ApplySearch()" class=" bg-custom-lightblue w-12 rounded-full p-2 px-8 flex justify-center items-center mr-6">
            <iconify-icon icon="clarity:filter-solid" style="color: white;" width="32"></iconify-icon>
        </button>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex';
import Input from '../../InputField/InputField.vue';
export default {
    components: {Input
    },
    data()
    {
        return{
            input:''
        }
    },
    methods:{
        ...mapActions({
            set_search:'Paging/set_search'
        }),
        ApplySearch()
        {
            this.set_search(this.input)
        }
    },
};
</script>
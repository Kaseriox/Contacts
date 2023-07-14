<template>
    <div class="flex flex-row items-center">
        <Input v-model="input" :icon="{type:'material-symbols:search',size:24}" :placeholder="'Ieškoti kontakto....'" class=" mr-6 w-11/12"/>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex';
import Input from '../../InputField/InputField.vue';
import debounce from 'debounce';
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
        DebounceInput:debounce(function(Value)
        {
            this.set_search(Value)
        },400),
    },
    watch:{
        input(NewValue)
        {
            this.DebounceInput(NewValue)
        }
    },
    destroyed()
    {
        this.set_search(undefined)
    }
};
</script>
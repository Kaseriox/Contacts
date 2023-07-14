<template>
    <div class="flex flex-col">
        <label class=" text-base">{{ Data.Type }}:</label>
        <select class=" h-4/5 w-full border rounded-lg " v-model="Selection">
            <option value='' selected>{{ Data.Text }}</option>
            <option v-for="Filter in Data.values" :value="`${Data.Belongs}='${Filter}'`">{{ Filter }}</option>
        </select>
    </div>
</template>
  
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    components: {
    },
    props:{
        Data:{
            type:Object,
            required:true,
        }
    },
    data() {
        return {
            Selection:''
        };
    },
    methods:{
        ...mapActions({
            set_filter:'Paging/set_filter'
        })
    },
    computed:{
        ...mapGetters({
            Filter:'Paging/Filter'
        })
        
    },
    watch:{
        Selection(NewSelection,OldSelection)    
        {
            this.set_filter([NewSelection,OldSelection])
        }
    },
};
</script>
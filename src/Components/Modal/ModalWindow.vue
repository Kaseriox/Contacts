<template>
    <div class="fixed left-0 top-0 z-10 w-full h-full bg-black/[.3]  flex justify-center items-center shadow-2xl py-10" v-if="Active">
        <div class="bg-white relative overflow-y-auto  max-h-[100vh]">
            <component :is="Component"></component>
        </div>
    </div>
</template>
  
<script>
import { mapGetters,mapActions } from 'vuex';

export default {
    name: "ModalWindow",
    methods:{
        ...mapActions({
            Close:'Modal/close',
        })
    },
    computed:{
        ...mapGetters({
            Active:'Modal/Active',
            Component:'Modal/Component'
        })
    },
    beforeDestroy(){
        if(this.Active)
        {
            this.Close()
        }
    }
};
</script>

<style scoped>

   

</style>
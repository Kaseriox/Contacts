<template>
    <nav class="bg-custom-blue">
        <div class=" grid grid-cols-7 place-items-center h-28 mx-8">
            <div class="col-span-1">
                <router-link to="/"><img src="../../assets/svg/TELTONIKA-LOGO-WHITE.svg" /></router-link>
            </div>
            <div class="col-span-5 w-full">
                <AdminMenu v-if="user_data"/>
            </div>
            <div class="justify-self-end  ">
                <DropDown/>
            </div>
            
        </div>
    </nav>
</template>
  
<script>
import {mapGetters} from 'vuex'
import DropDown from './DropDown.vue'
import AdminMenu from './AdminMenu.vue'
export default {
    components: { DropDown, AdminMenu },
    computed:{
        ...mapGetters({
            user_data:'User/Data'
        })
    }
};
</script>
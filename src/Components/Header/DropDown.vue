<template>
    <div class=" h-12 w-12 relative inline-block">
        <img @click="Toggle()" class=" cursor-pointer h-12 w-12"  src="./../../assets/svg/Person.svg" />
        <div v-if="Active" class="absolute right-0 bg-slate-100 border-4 border-slate-200 shadow-2xl rounded mt-10 text-left text-2xl">
            
            <template v-if="user_data">
                <button @click="OpenChangePassword" class=" m-3 block whitespace-nowrap overflow-hidden text-ellipsis">Pakeisti slaptažodį</button>
                <button @click="Logout" class=" m-3 block whitespace-nowrap overflow-hidden text-ellipsis">Atsijungti</button>
            </template>
            <template v-else>
                <button @click="Login" class=" m-3 block whitespace-nowrap overflow-hidden text-ellipsis">Prisijungti</button>
            </template>

        </div>
     </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';
import ResetPassword from '../Form/Forms/ResetPassword/ResetPassword.vue';
export default {
    components: {
    },
    data() {
        return {
            Active:false
        };
    },
    methods:{
        ...mapActions({
            set_user_data:'User/set_data',
            set_component:'Modal/set_component',
            open:'Modal/open'
        }),
        Toggle()
        {
            this.Active = !this.Active
        },
        OpenChangePassword()
        {
            this.set_component(ResetPassword)
            this.open()
        },
        Login()
        {
            this.$router.push('/Login')
        },
        Logout()
        {
            this.set_user_data(undefined)
            if(this.$route.path !=='/')
            {
                this.$router.push('/')
            }
            this.$Logout()
        },
    },
    computed:{
        ...mapGetters({
            user_data:'User/Data'
        })
    }
};
</script>
<template>
    <div class="h-full w-full p-10">
        <div class="flex justify-end">
            <button @click="Close()" class=" bg-blue-700 text-white right-14 top-0 rounded-full p-4 flex"><iconify-icon icon="material-symbols:close" style="color: white;" width="32"></iconify-icon></button>
        </div>

        <template >
            <div class="m-12 mx-24 text-base ">   

                    <div class="p-6">
                        <div class=" text-center text-2xl">Pakeisti Slaptažodį:</div>
                        <div class="space-y-4">
                           <Input ref="OldPasswordInput" v-model="Data.oldPassword" :label="'Senas Slaptažodis:'" :placeholder="'Įveskite seną slaptažodį...'" :hidden="true"/>
                           <Input ref="NewPasswordInput" v-model="Data.password" :label="'Naujas Slaptažodis:'" :placeholder="'Įveskite naują slaptažodį...'" :hidden="true"/>
                           <Input ref="NewPasswordAgainInput" v-model="Data.passwordConfirm" :label="'Naujas Slaptažodis:'" :placeholder="'Įveskite naują slaptažodį...'" :hidden="true"/>   
                        </div>
                        <div v-if="error" class="text-center text-custom-red">{{ error }}</div>
                    </div>
            </div>
            <div class="mt-20 mx-6">
                <div class="flex justify-end  ">
                    <button @click="HandleForm()" class=" p-3 px-28 rounded-md text-center text-white text-xl bg-blue-700">Sukurti</button>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import Input from '../../../InputField/InputField.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {Input
    },
    data() {
        return {
            Data:{
                oldPassword:'',
                password:'',
                passwordConfirm:'',
            },
            error:undefined
        };
    },
    methods:{
        ...mapActions({
            Close:'Modal/close',
            set_message:'Notification/set_data',
            set_user_data:'User/set_data',
        }),
        async HandleForm()
        { 
            this.ResetErrors()
            if(!this.ValidateForm())
            {
               return 
            }
            let response = await this.$UpdateRecord({Collection:'users',id:this.user_data.id,data:this.Data})
            if(response!==null)
            {
                this.set_message({message:'Sėkmingai atnaujintas slaptažodis',type:'success'})
                this.set_user_data(undefined)
                if(this.$route.path !=='/')
                {
                    this.$router.push('/')
                }
                this.$Logout()
                this.Close()
            }
            else
            {
                this.set_message({message:'Nepavyko atnaujinti slaptažodžio',type:'error'})
            }
            

        },
        ValidateForm()
        {
            let valid = true
            for(let ref in this.$refs)
            {
                if(this.$refs[ref].value.length < 8)
                {
                    this.$refs[ref].error = 'Slaptažodis turi būti nors iš 8 simbolių'
                    valid=false
                }
            }

            if(this.Data.password !== this.Data.passwordConfirm)
            {
                this.error = 'Nauji Slaptažodžiai nesutampa'
                valid = false
            }
            return valid
        },
        ResetErrors()
        {
            for(let ref in this.$refs)
            {
            this.$refs[ref].error = false
            }
            this.error=false
        },
    },
    computed:{
        ...mapGetters({
            user_data:'User/Data',
        })
    }
};
</script>
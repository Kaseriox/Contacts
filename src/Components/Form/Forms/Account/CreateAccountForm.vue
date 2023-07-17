<template>
    <div class="h-full w-full p-10">
        <div class="flex justify-end">
            <button @click="Close()" class=" bg-blue-700 text-white right-14 top-0 rounded-full p-4 flex"><iconify-icon icon="material-symbols:close" style="color: white;" width="32"></iconify-icon></button>
        </div>

        <template v-if="Ready" >
            <div class=" grid grid-cols-2 gap-x-32 m-12 mx-24 text-base ">   

                    <div class="p-6">
                        <div class="space-y-6">
                            <Input class="mt-6" ref="NameInput" v-model="Data.username"  :label="'Vardas:'" :placeholder="'Įveskite vardą...'"/>
                            <Input ref="EmailInput" v-model="Data.email"  :label="'Elektroninis paštas:'" :placeholder="'Įveskite el. paštą...'" :icon="{type:'material-symbols:mail',size:24}"/>    
                            <UploadPhoto v-model="Data.avatar"/>
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <div class="mb-6 text-center text-2xl">Administracinės teisės:</div>
                        <div class="space-y-4">
                           <CheckBox v-model="permissions.edit_employees"  :label="'Redaguoti ir kurti kontaktus'" />
                           <CheckBox v-model="permissions.delete_employees"  :label="'Trinti kontaktus'"/>
                           <CheckBox v-model="permissions.edit_companies"  :label="'Redaguoti ir kurti įmones'" />
                           <CheckBox v-model="permissions.delete_companies"  :label="'Trinti įmones'"/>
                           <CheckBox v-model="permissions.edit_offices"  :label="'Redaguoti ir kurti ofisus'"/>
                           <CheckBox v-model="permissions.delete_offices"  :label="'Trinti ofisus'"/>
                           <CheckBox v-model="permissions.edit_structure" :label="'Redaguoti ir kurti struktūras'"/>
                           <CheckBox v-model="permissions.delete_structure"  :label="'Trinti struktūras'"/>
                           <CheckBox v-model="permissions.read_permissions"  :label="'Skaityti admin paskyras'" />
                           <CheckBox v-model="permissions.edit_permissions"  :label="'Redaguoti ir kurti administracines teises'"/>
                           <CheckBox v-model="permissions.delete_permissions"  :label="'Trinti admin paskyras'"/>
                        </div>
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
import CheckBox from '../../../InputField/CheckboxField.vue';
import UploadPhoto from '../../../InputField/UploadField.vue';
import { mapActions } from 'vuex';
export default {
    components: {Input,CheckBox,UploadPhoto
    },
    data() {
        return {
            Ready:true,
            Data:{
               username:'',
               email:'',
               avatar:'',
               password:'',
               passwordConfirm:'',
               emailVisibility:true
               
            },
            permissions:{
                    edit_employees:false,
                    delete_employees:false,
                    edit_offices:false,
                    delete_offices:false,
                    edit_structure:false,
                    delete_structure:false,
                    read_permissions:false,
                    edit_permissions:false,
                    delete_permissions:false,
                    edit_companies:false,
                    delete_companies:false,
               }
        };
    },
    methods:{
        ...mapActions({
            Close:'Modal/close',
            set_message:'Notification/set_data',
            refresh:'Refresh/refresh'
        }),
        async HandleForm()
        { 
            this.ResetErrors()
            if(!this.ValidateForm())
            {
               return 
            }
            let response = await this.$CreateRecord({Collection:'user_permissions',data:this.permissions})
            if(response !==null)
            {
                response = response.id
                this.Data.password = Math.random().toString(36).slice(-8)
                this.Data.passwordConfirm = this.Data.password
                response = await this.$CreateRecord({Collection:'users',data:{...this.Data,permissions_id:response}})
            }

            if(response!==null)
            {
                this.set_message({message:`Succesfully Created An Account Password is :${this.Data.password}`,type:'success'})
                this.refresh()
                this.Close()
            }
            else
            {
                this.set_message({message:'Failed To Create Account',type:'error'})
            }

        },
        ValidateForm()
        {
            let valid = true

            const nameRegex= /^[A-Za-z]+$/
            const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            if(!nameRegex.test(this.$refs.NameInput.value) || !(this.$refs.NameInput.value.length > 2))
            {
                this.$refs.NameInput.error = 'Incorrect Name Input'
                valid=false
            }
            if(!emailRegex.test(this.$refs.EmailInput.value))
            {
                this.$refs.EmailInput.error = 'Incorrect Email Input'
                valid=false
            }
            
            return valid
        },
        ResetErrors()
        {
            for(let ref in this.$refs)
            {
            this.$refs[ref].error = false
            }
        },
    },

};
</script>
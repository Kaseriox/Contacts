<template>
    <div class="h-full w-full p-10">
        <div class="flex justify-end">
            <button @click="Close()" class=" bg-blue-700 text-white right-14 top-0 rounded-full p-4 flex"><iconify-icon icon="material-symbols:close" style="color: white;" width="32"></iconify-icon></button>
        </div>

        <template >
            <div v-if="Ready" class=" grid grid-cols-2 gap-x-32 m-12 mx-24 text-base ">   

                    <div class="p-6">
                        <div class="space-y-6">
                           <Input  class="mt-6" ref="NameInput" v-model="Data.username" :open="user_data.expand.permissions_id.edit_permissions" :label="'Vardas:'" :placeholder="'Įveskite vardą...'"/>
                           <Input ref="EmailInput" v-model="Data.email" :open="user_data.expand.permissions_id.edit_permissions" :label="'Elektroninis paštas:'" :placeholder="'Įveskite el. paštą...'" :icon="{type:'material-symbols:mail',size:24}"/>    
                            <UploadPhoto v-model="Data.avatar" :open="user_data.expand.permissions_id.edit_permissions"/>
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <div class="mb-6 text-center text-2xl">Administracinės teisės:</div>
                        <div class="space-y-4">
                           <CheckBox v-model="permissions.edit_employees" :open="user_data.expand.permissions_id.edit_permissions" :label="'Redaguoti ir kurti kontaktus'" :id="false"/>
                           <CheckBox v-model="permissions.delete_employees" :open="user_data.expand.permissions_id.edit_permissions" :label="'Trinti kontaktus'" :id="false"/>
                           <CheckBox v-model="permissions.edit_companies" :open="user_data.expand.permissions_id.edit_permissions" :label="'Redaguoti ir kurti įmones'" :id="false"/>
                           <CheckBox v-model="permissions.delete_companies" :open="user_data.expand.permissions_id.edit_permissions" :label="'Trinti įmones'" :id="false"/>
                           <CheckBox v-model="permissions.edit_offices" :open="user_data.expand.permissions_id.edit_permissions" :label="'Redaguoti ir kurti ofisus'" :id="false"/>
                           <CheckBox v-model="permissions.delete_offices" :open="user_data.expand.permissions_id.edit_permissions" :label="'Trinti ofisus'" :id="false"/>
                           <CheckBox v-model="permissions.edit_structure" :open="user_data.expand.permissions_id.edit_permissions" :label="'Redaguoti ir kurti struktūras'" :id="false"/>
                           <CheckBox v-model="permissions.delete_structure" :open="user_data.expand.permissions_id.edit_permissions" :label="'Trinti struktūras'" :id="false"/>
                           <CheckBox v-model="permissions.read_permissions" :open="user_data.expand.permissions_id.edit_permissions" :label="'Skaityti admin paskyras'" :id="false"/>
                           <CheckBox v-model="permissions.edit_permissions" :open="user_data.expand.permissions_id.edit_permissions" :label="'Redaguoti ir kurti administracines teises'" :id="false"/>
                           <CheckBox v-model="permissions.delete_permissions" :open="user_data.expand.permissions_id.edit_permissions" :label="'Trinti admin paskyras'"/>
                        </div>
                    </div>

                    <div class="p-6">
                        
                    </div>
            </div>
            <div class="mt-20 mx-6">
                <div class="flex justify-end  ">
                    <button @click="HandleForm()" class=" p-3 px-28 rounded-md text-center text-white text-xl bg-blue-700">Atnaujinti</button>
    
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import Input from '../../../InputField/InputField.vue'
import CheckBox from '../../../InputField/CheckboxField.vue';
import UploadPhoto from '../../../InputField/UploadField.vue';
import { mapActions,mapGetters } from 'vuex';
export default {
    components: {Input,CheckBox,UploadPhoto
    },
    data() {
        return {
            Ready:false,
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
            refresh:"Refresh/refresh"
        }),
        async HandleForm()
        { 
            this.ResetErrors()
            if(!this.ValidateForm())
            {
               return 
            }
            let response = await this.$UpdateRecord({Collection:'user_permissions',id:this.permissions.id,data:this.permissions})
            if(response===null)
            {
                this.set_message({message:'Failed To Update Account',type:'error'})
                return
            }
            response = await this.$UpdateRecord({Collection:'users',id:this.Data.id,data:this.Data})
            if(response!==null)
            {
                this.set_message({message:'Succesfully Edited Account',type:'success'})
                this.refresh()
                this.Close()
            }
            else
            {
                this.set_message({message:'Failed To Update Account',type:'error'})
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
    computed:{
        ...mapGetters({
            id:'Form/id',
            user_data:'User/Data'
        })
    },
    async created()
    {
        this.Data = await this.$GetSingleRecord({Collection:'users',id:this.id})
        this.permissions = await this.$GetSingleRecord({Collection:'user_permissions',id:this.Data.permissions_id})
        this.Ready=true
    }

};
</script>
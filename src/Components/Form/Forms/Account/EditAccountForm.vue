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
                            <vue-tags-input
                                v-model="tag"
                                :tags="tags"
                                :autocomplete-items="filteredItems"
                                :add-only-from-autocomplete="true"
                                @tags-changed="(newTags) => (tags = newTags)"
                                />
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
import VueTagsInput from "@johmun/vue-tags-input";
import Input from '../../../InputField/InputField.vue'
import UploadPhoto from '../../../InputField/UploadField.vue';
import { mapActions,mapGetters } from 'vuex';
export default {
    components: {Input,UploadPhoto,VueTagsInput
    },
    data() {
        return {
        tag: "",
      tags: [],
      autocomplete: [
        {
          text: "edit_employees",
        },
        {
          text: "delete_employees",
        },
        {
          text: "edit_offices",
        },
        {
          text: "delete_offices",
        },
        {
          text: "edit_structure",
        },
        {
          text: "delete_structure",
        },
        {
          text: "edit_permissions",
        },
        {
          text: "delete_permissions",
        },
        {
          text: "delete_companies",
        },
        {
            text:"edit_companies"
        },
        {
            text:"read_permissions"
        }
        ],
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
                    edit_permissions:false,
                    delete_permissions:false,
                    edit_companies:false,
                    delete_companies:false,
                    read_permissions:false,
               },
            permission_id:''
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
            for(const object of Object.keys(this.permissions))
            {
                this.permissions[object] = false
            }
            for(const object in this.tags)
            {
                this.permissions[this.tags[object].text] = true
            }
            let response = await this.$UpdateRecord({Collection:'user_permissions',id:this.permission_id,data:this.permissions})
            if(response===null)
            {
                this.set_message({message:'Nepavyko atnaujinti paskyros',type:'error'})
                return
            }
            response = await this.$UpdateRecord({Collection:'users',id:this.Data.id,data:this.Data})
            if(response!==null)
            {
                this.set_message({message:'Pavyko atnaujinti paskyrą',type:'success'})
                this.refresh()
                this.Close()
            }
            else
            {
                this.set_message({message:'Nepavyko atnaujinti paskyros',type:'error'})
            }

        },
        ValidateForm()
        {
            let valid = true
            const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(/\s/g.test(this.$refs.NameInput.value))
            {
                this.$refs.NameInput.error = 'Vardas negali turėti tarpų'
                valid=false
            }
            else if(!(this.$refs.NameInput.value.length > 0))
            {
                this.$refs.NameInput.error = 'Vardas yra reikalingas'
                valid=false
            }
            if(!(this.$refs.EmailInput.value.length > 0))
            {
                this.$refs.EmailInput.error = 'Elektroninio pašto laukas yra būtinas'
                valid=false
            }
            else if(!emailRegex.test(this.$refs.EmailInput.value))
            {
                this.$refs.EmailInput.error = 'Neteisingas elektroninis paštas'
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
        }),
    filteredItems() {
      return this.autocomplete.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
    },
    async created()
    {
        this.Data = await this.$GetSingleRecord({Collection:'users',id:this.id})
        this.permissions = await this.$GetSingleRecord({Collection:'user_permissions',id:this.Data.permissions_id})
        this.permission_id = this.permissions.id
        delete this.permissions.expand
        delete this.permissions.collectionId
        delete this.permissions.collectionName
        delete this.permissions.created
        delete this.permissions.id
        delete this.permissions.updated
        for(const permission of Object.keys(this.permissions))
        {
            if(this.permissions[permission]===true)
            {
                this.tags.push({text:permission})
            }
        }
        this.Ready=true
    }

};
</script>
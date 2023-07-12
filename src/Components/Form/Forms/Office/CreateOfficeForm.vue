<template>
    <div class="h-full w-full p-10">
        <div class="flex justify-end">
            <button @click="Close()" class=" bg-blue-700 text-white right-14 top-0 rounded-full p-4 flex"><iconify-icon icon="material-symbols:close" style="color: white;" width="32"></iconify-icon></button>
        </div>

        <template v-if="Ready" >
            <div class=" grid grid-cols-2 gap-x-32 m-12 mx-24 text-base ">   

                    <div class="p-6">
                        <div class=" text-center text-2xl">Sukurti ofisą:</div>
                        <div class="space-y-4">
                           <Input ref="NameInput" v-model="Data.name" :label="'Pavadinimas:'" :placeholder="'Įveskite pavadinimą...'"/>
                           <Input ref="StreetInput" v-model="Data.street" :label="'Gatvė:'" :placeholder="'Įveskite gatvę...'"/>
                           <Input ref="StreetNumberInput" v-model="Data.street_number" :label="'Gatvės numeris:'" :placeholder="'Įveskite gatvės numerį...'"/> 
                           <Input ref="CityInput" v-model="Data.city" :label="'Miestas:'" :placeholder="'Įveskite miestą...'"/> 
                           <Input ref="CountryInput" v-model="Data.country" :label="'Valstybė:'" :placeholder="'Įveskite valstybę...'"/>   
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <div class="text-center text-2xl">Priklauso:</div>
                        <div class="space-y-4">
                           <template v-for="company in Companies">
                                <Checkbox v-model="choices" :value="company.id" :label="company.name"/>
                           </template>
                           <div v-if="error" class="text-center text-custom-red">{{ error }}</div>
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
import Select from '../../../InputField/SelectField.vue'
import Checkbox from '../../../InputField/CheckboxField.vue'
import UploadPhoto from '../../../InputField/UploadField.vue';
import { mapActions } from 'vuex';
export default {
    components: {Input,Select,UploadPhoto,Checkbox
    },
    data() {
        return {
            Ready:false,
            Data:{
                name:'',
                street:'',
                street_number:'',
                city:'',
                country:'',
            },
            error:false,
            choices:[],
            Companies:'',
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
            let response = await this.$CreateRecord({Collection:'offices',data:this.Data})
            if(response === null )
            {
                 this.set_message({message:'Failed To Create Office',type:'error'})
                 return
            }
            const officeid = response.id
            for(const choice of this.choices)
            {
                response = await this.$CreateRecord({Collection:'companies_offices',data:{company_id:choice,office_id:officeid}})
                if(response===null)
                {
                    this.set_message({message:'Failed To Create Office',type:'error'})
                    return
                }
            }
            this.set_message({message:'Succesfully Created Office',type:'success'})
            this.refresh()
            this.Close()
        },
        ValidateForm()
        {
            let valid = true
            const numberRegex = /^\d+$/
            if(!(this.$refs.NameInput.value.length > 2))
            {
                this.$refs.NameInput.error = 'Incorrect Company Input'
                valid=false
            }
            if(!(this.$refs.StreetInput.value.length > 2))
            {
                this.$refs.StreetInput.error = 'Incorrect Street Input'
                valid=false
            }
            if(!(numberRegex.test(this.$refs.StreetNumberInput.value)))
            {
                this.$refs.StreetNumberInput.error = "Incorrect Street Number Input "
                valid=false
            }
            if(!(this.$refs.CityInput.value.length > 2))
            {
                this.$refs.CityInput.error = 'Incorrect Street Input'
                valid=false
            }
            if(!(this.$refs.CountryInput.value.length > 2))
            {
                this.$refs.CountryInput.error = 'Incorrect Street Input'
                valid=false
            }
            if(this.choices.length < 1)
            {
                this.error = 'Select An Company'
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
    async created()
    {
        this.Companies = (await this.$GetCollection({Collection:'companies',ItemsPerPage:'All'})).items
        this.Ready=true
    }   

};
</script>
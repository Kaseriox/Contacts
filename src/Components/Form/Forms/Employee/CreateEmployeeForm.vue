<template>
    <div class="h-full w-full p-10">
        <div class="flex justify-end">
            <button @click="Close()" class=" bg-blue-700 text-white right-14 top-0 rounded-full p-4 flex"><iconify-icon icon="material-symbols:close" style="color: white;" width="32"></iconify-icon></button>
        </div>

        <template v-if="Ready" >
            <div class=" grid grid-cols-2 gap-x-32 m-12 mx-24 text-base ">   

                    <div class="p-6">
                        <div class=" text-center text-2xl">Sukurti kontaktą:</div>
                        <div class="space-y-4">
                           <Input ref="NameInput" v-model="Data.name" :label="'Vardas:'" :placeholder="'Įveskite vardą...'"/>
                           <Input ref="SurnameInput" v-model="Data.surname" :label="'Pavardė:'" :placeholder="'Įveskite pavardę...'"/>
                           <Input ref="PositionInput" v-model="Data.position" :label="'Pozicija:'" :placeholder="'Įveskite poziciją...'"/>    
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <div class="text-center text-2xl">Įmonės detalės:</div>
                        <div class="space-y-4">
                            <Select ref="CompanySelect" v-model="Data.company_id" :label="'Įmonė:'" :placeholder="'Pasirinkite įmonę...'" :options="Companies" />
                            <Select ref="DivisionSelect" v-model="Data.division_id" :label="'Padalinys:'" :placeholder="'Pasirinkite diviziją...'" :options="Divisions" />
                            <Select ref="DepartmentSelect" v-model="Data.department_id" :label="'Skyrius:'" :placeholder="'Pasirinkite departamentą...'" :options="Departments" />
                            <Select ref="GroupSelect" v-model="Data.group_id" :label="'Grupė:'" :placeholder="'Pasirinkite grupę...'" :options="Groups" />
                            <Select ref="OfficeSelect" v-model="Data.office_id" :label="'Ofisas:'" :placeholder="'Pasirinkite ofisą...'" :options="Offices" />
                        </div>
                    </div>

                    <div class="p-6">
                        <div class=" text-center text-2xl">Kontaktinė informacija:</div>
                        <div class="space-y-4">
                           <Input ref="EmailInput" v-model="Data.email" :label="'Elektroninis paštas:'" :placeholder="'Įveskite el. paštą...'" :icon="{type:'material-symbols:mail',size:24}"/>
                           <Input ref="PhoneInput" v-model="Data.phone_number" :label="'Telefono numeris'" :placeholder="'Įveskite telefono numerį...'" :icon="{type:'material-symbols:call',size:24}"/>  
                        </div>
                    </div>

                    <div class="p-6">
                        <UploadPhoto v-model="Data.photo"/>
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
import UploadPhoto from '../../../InputField/UploadField.vue';
import { mapActions } from 'vuex';
export default {
    components: {Input,Select,UploadPhoto
    },
    data() {
        return {
            Ready:false,
            Data:{
                name:'',
                surname:'',
                position:'',
                email:'',
                phone_number:'',
                company_id:'',
                office_id:'',
                division_id:'',
                department_id:'',
                group_id:'',
                photo:''
            },
            Companies:'',
            Divisions:'',
            Groups:'',
            Departments:'',
            Offices:''
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
           const response = await this.$CreateRecord({Collection:'employees',data:this.Data})
           if(response!==null)
           {
                this.set_message({message:'Succesfully Created Employee',type:'success'})
                this.refresh()
                this.Close()
           }
           else
           {
                this.set_message({message:'Failed To Create Employee',type:'error'})
           }

        },
        ValidateForm()
        {
            let valid = true

            const nameRegex= /^[A-Za-z]+$/
            const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            const phoneRegex = /^(?:\+370|8)[6-8]\d{7}$/

            if(!nameRegex.test(this.$refs.NameInput.value) || !(this.$refs.NameInput.value.length > 2))
            {
                this.$refs.NameInput.error = 'Incorrect Name Input'
                valid=false
            }
            if(!nameRegex.test(this.$refs.SurnameInput.value) || !(this.$refs.SurnameInput.value.length > 2))
            {
                this.$refs.SurnameInput.error = 'Incorrect Surname Input'
                valid=false
            }
            if(!(this.$refs.PositionInput.value.length > 2))
            {
                this.$refs.PositionInput.error = 'Incorrect Position Input'
                valid=false
            }
            if(!emailRegex.test(this.$refs.EmailInput.value))
            {
                this.$refs.EmailInput.error = 'Incorrect Email Input'
                valid=false
            }


            if(this.$refs.PhoneInput.value.length > 0 && !phoneRegex.test(this.$refs.PhoneInput.value))
            {
                this.$refs.PhoneInput.error = 'Incorrect Phone Number Input'
                valid=false
            }

            if(this.$refs.CompanySelect.value === '')
            {
                this.$refs.CompanySelect.error = 'Please Select Company'
                valid=false
            }
            
            if(this.$refs.DivisionSelect.value === '')
            {
                this.$refs.DivisionSelect.error = 'Please Select Division'
                valid=false
            }

            if(this.$refs.OfficeSelect.value === '')
            {
                this.$refs.OfficeSelect.error = 'Please Select Office'
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
    async created()
    {
        this.Companies = (await this.$GetCollection({Collection:'companies',ItemsPerPage:'All'})).items
        this.Divisions = (await this.$GetCollection({Collection:'divisions',ItemsPerPage:'All'})).items
        this.Groups = (await this.$GetCollection({Collection:'groups',ItemsPerPage:'All'})).items
        this.Departments = (await this.$GetCollection({Collection:'departments',ItemsPerPage:'All'})).items
        this.Offices = (await this.$GetCollection({Collection:'offices',ItemsPerPage:'All'})).items
        this.Ready=true
    }   

};
</script>
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
                        <div class=" text-center text-2xl">Įmonės detalės:</div>
                        <div class="space-y-4">
                            <Select ref="CompanySelect" v-model="Data.company_id" :label="'Įmonė:'"
                                :placeholder="'Pasirinkite įmonę...'" :options="Companies" />
                            <Select v-if="Data.company_id!==''" ref="OfficeSelect" v-model="Data.office_id" :label="'Ofisas:'"
                                :placeholder="'Pasirinkite ofisą...'" :options="Offices" />
                            <Select v-if="Data.office_id!==''" ref="DivisionSelect" v-model="Data.division_id" :label="'Padalinys:'"
                                :placeholder="'Pasirinkite diviziją...'" :options="Divisions" />
                            <Select v-if="Data.division_id!==''" ref="DepartmentSelect" v-model="Data.department_id" :label="'Skyrius:'"
                                :placeholder="'Pasirinkite departamentą...'" :options="Departments" />
                            <Select v-if="Data.department_id!==''" ref="GroupSelect" v-model="Data.group_id" :label="'Grupė:'"
                                :placeholder="'Pasirinkite grupę...'" :options="Groups" />
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
                    <button @click="HandleForm()" class=" p-3 px-28 rounded-md text-center text-white text-xl bg-blue-700">Atnaujinti</button>
    
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import Input from '../../../InputField/InputField.vue'
import Select from '../../../InputField/SelectField.vue'
import UploadPhoto from '../../../InputField/UploadField.vue';
import { mapActions, mapGetters } from 'vuex';
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
        async GetCompanies() {
            const response = (await this.$GetCollection({
                Collection: 'companies', ItemsPerPage: 'All'
            })).items
            this.Companies = response
        },
        async GetOffices() {
            const temp = []
            const response = (await this.$GetCollection({
                Collection: 'companies_offices', ItemsPerPage: 'All',query:{
                    filter:`company_id='${this.Data.company_id}'`,
                    expand:'office_id'
                }
            })).items
            for(const office of response)
            {
                temp.push(office.expand.office_id)
            }
            this.Offices = temp
        },
        async GetDivisions() {
            const temp = []
            const response = (await this.$GetCollection({
                Collection: 'offices_divisions', ItemsPerPage: 'All',query:{
                    filter:`office_id='${this.Data.office_id}'`,
                    expand:'division_id'
                }
            })).items
            for(const division of response)
            {
                temp.push(division.expand.division_id)
            }
            this.Divisions = temp
        },
        async GetDepartments()
        {
            const temp = []
            const response = (await this.$GetCollection({
                Collection: 'divisions_departments', ItemsPerPage: 'All',query:{
                    filter:`division_id='${this.Data.division_id}'`,
                    expand:'department_id'
                }
            })).items
            for(const department of response)
            {
                temp.push(department.expand.department_id)
            }
            this.Departments = temp
        },
        async GetGroups()
        {
            const temp = []
            const response = (await this.$GetCollection({
                Collection: 'departments_groups', ItemsPerPage: 'All',query:{
                    filter:`department_id='${this.Data.department_id}'`,
                    expand:'group_id'
                }
            })).items
            for(const group of response)
            {
                temp.push(group.expand.group_id)
            }
            this.Groups = temp
        },
        async HandleForm()
        { 
            this.ResetErrors()
            if(!this.ValidateForm())
            {
               return 
            }
           const response = await this.$UpdateRecord({Collection:'employees',id:this.id,data:this.Data})
           if(response!==null)
           {
                this.set_message({message:'Sėkmingai atnaujintas kontaktas',type:'success'})
                this.refresh()
                this.Close()
           }
           else
           {
                this.set_message({message:'Nepavyko atnaujinti kontakto',type:'error'})
           }

        },
        ValidateForm()
        {
            let valid = true

            const nameRegex = /^[\p{L}]+$/u
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,12}$/

            if(/\s/g.test(this.$refs.NameInput.value))
            {
                this.$refs.NameInput.error = 'Vardas negali turėti tarpų'
                valid=false
            }
            else if (!(this.$refs.NameInput.value.length > 0)) {
                this.$refs.NameInput.error = 'Vardas yra reikalingas'
                valid = false
            }
            else if (!(this.$refs.NameInput.value.length < 31)) {
                this.$refs.NameInput.error = 'Vardas yra per ilgas (max 30 simbolių)'
                valid = false
            }
            else if (!nameRegex.test(this.$refs.NameInput.value)) {
                this.$refs.NameInput.error = 'Vardas turi būti tik iš raidžių'
                valid = false
            }

            if(/\s/g.test(this.$refs.SurnameInput.value))
            {
                this.$refs.SurnameInput.error = 'Pavardė negali turėti tarpų'
                valid=false
            }
            else if (!(this.$refs.SurnameInput.value.length > 0)) {
                this.$refs.SurnameInput.error = 'Pavardė yra reikalinga'
                valid = false
            }
            else if (!(this.$refs.SurnameInput.value.length < 31)) {
                this.$refs.SurnameInput.error = 'Pavardė yra per ilga (max 30 simbolių)'
                valid = false
            }
            else if (!nameRegex.test(this.$refs.SurnameInput.value)) {
                this.$refs.SurnameInput.error = 'Pavardė turi būti tik iš raidžių'
                valid = false
            }

            if (!(this.$refs.PositionInput.value.length > 0)) {
                this.$refs.PositionInput.error = 'Pozicijos pavadinimas yra reikalingas'
                valid = false
            }
            else if (!(this.$refs.PositionInput.value.length < 41)) {
                this.$refs.PositionInput.error = 'Pozicijos pavadinimas yra per ilgas (max 20 simbolių)'
                valid = false
            }

            if (!(this.$refs.EmailInput.value.length > 0)) {
                this.$refs.EmailInput.error = 'Elektroninis paštas yra reikalingas'
                valid = false
            }
            else if (!emailRegex.test(this.$refs.EmailInput.value)) {
                this.$refs.EmailInput.error = 'Neteisingas elektroninis paštas'
                valid = false
            }
            else if (!(this.$refs.EmailInput.value.length < 51)) {
                this.$refs.EmailInput.error = 'Elektroninis paštas yra per ilgas (max 50 simbolių)'
                valid = false
            }

            if (this.$refs.PhoneInput.value.length > 0 && !phoneRegex.test(this.$refs.PhoneInput.value)) 
            {
                this.$refs.PhoneInput.error = 'Neteisingas telefono numeris'
                valid = false
            }

            if (this.$refs.CompanySelect.value === '') {
                this.$refs.CompanySelect.error = 'Prašau pasirinkti įmonę'
                valid = false
            }

            if (this.$refs.DivisionSelect?.value === '') {
                this.$refs.DivisionSelect.error = 'Prašau pasirinkti padalinį'
                valid = false
            }

            if (this.$refs.OfficeSelect?.value === '') {
                this.$refs.OfficeSelect.error = 'Prašau pasirinkti ofisą'
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
        },
    },
    computed:{
        ...mapGetters({
            id:'Form/id'
        })
    },
    watch: {
        'Data.company_id'(newvalue,oldvalue) {
            if(oldvalue !== '')
            {
            this.Data.department_id=''
            this.Data.division_id=''
            this.Data.group_id=''
            this.Data.office_id=''
            }
            this.GetOffices()
        },
        'Data.office_id'(newvalue,oldvalue) {
            if(oldvalue !== '')
            {
            this.Data.department_id=''
            this.Data.division_id=''
            this.Data.group_id=''
            }
            this.GetDivisions()
        },
        'Data.division_id'(newvalue,oldvalue) {
            if(oldvalue !== '')
            {
            this.Data.department_id=''
            this.Data.group_id=''
            }
            this.GetDepartments()
            
        },
        'Data.department_id'(newvalue,oldvalue) {
            if(oldvalue !== '')
            {
            this.Data.group_id=''
            }
                
                this.GetGroups()
           
        },
    },
    async created()
    {
        this.Companies = (await this.$GetCollection({Collection:'companies',ItemsPerPage:'All'})).items
        this.Divisions = (await this.$GetCollection({Collection:'divisions',ItemsPerPage:'All'})).items
        this.Groups = (await this.$GetCollection({Collection:'groups',ItemsPerPage:'All'})).items
        this.Departments = (await this.$GetCollection({Collection:'departments',ItemsPerPage:'All'})).items
        this.Offices = (await this.$GetCollection({Collection:'offices',ItemsPerPage:'All'})).items
        const RecordData = (await this.$GetSingleRecord({Collection:'employees',id:this.id}))
        this.Data = RecordData
        this.Ready=true
    }   

};
</script>
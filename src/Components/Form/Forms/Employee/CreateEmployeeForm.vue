<template>
    <div class="h-full w-full p-10">
        <div class="flex justify-end">
            <button @click="Close()" class=" bg-blue-700 text-white right-14 top-0 rounded-full p-4 flex"><iconify-icon
                    icon="material-symbols:close" style="color: white;" width="32"></iconify-icon></button>
        </div>

        <template v-if="Ready">
            <div class=" grid grid-cols-2 gap-x-32 m-12 mx-24 text-base ">

                <div class="p-6">
                    <div class=" text-center text-2xl">Sukurti kontaktą:</div>
                    <div class="space-y-4">
                        <Input ref="NameInput" v-model="Data.name" :label="'Vardas:'" :placeholder="'Įveskite vardą...'" />
                        <Input ref="SurnameInput" v-model="Data.surname" :label="'Pavardė:'"
                            :placeholder="'Įveskite pavardę...'" />
                        <Input ref="PositionInput" v-model="Data.position" :label="'Pozicija:'"
                            :placeholder="'Įveskite poziciją...'" />
                    </div>
                </div>

                <div class="p-6">
                    <div class="text-center text-2xl">Įmonės detalės:</div>
                    <div class="space-y-4">
                        <Select ref="CompanySelect" v-model="Data.company_id" :label="'Įmonė:'"
                            :placeholder="'Pasirinkite įmonę...'" :options="Companies" />
                        <Select ref="DivisionSelect" v-model="Data.division_id" :label="'Padalinys:'"
                            :placeholder="'Pasirinkite diviziją...'" :options="Divisions" />
                        <Select ref="DepartmentSelect" v-model="Data.department_id" :label="'Skyrius:'"
                            :placeholder="'Pasirinkite departamentą...'" :options="Departments" />
                        <Select ref="GroupSelect" v-model="Data.group_id" :label="'Grupė:'"
                            :placeholder="'Pasirinkite grupę...'" :options="Groups" />
                        <Select ref="OfficeSelect" v-model="Data.office_id" :label="'Ofisas:'"
                            :placeholder="'Pasirinkite ofisą...'" :options="Offices" />
                    </div>
                </div>

                <div class="p-6">
                    <div class=" text-center text-2xl">Kontaktinė informacija:</div>
                    <div class="space-y-4">
                        <Input ref="EmailInput" v-model="Data.email" :label="'Elektroninis paštas:'"
                            :placeholder="'Įveskite el. paštą...'" :icon="{ type: 'material-symbols:mail', size: 24 }" />
                        <Input ref="PhoneInput" v-model="Data.phone_number" :label="'Telefono numeris'"
                            :placeholder="'Įveskite telefono numerį...'" :icon="{ type: 'material-symbols:call', size: 24 }" />
                    </div>
                </div>

                <div class="p-6">
                    <UploadPhoto v-model="Data.photo" />
                </div>
            </div>
            <div class="mt-20 mx-6">
                <div class="flex justify-end  ">
                    <button @click="HandleForm()"
                        class=" p-3 px-28 rounded-md text-center text-white text-xl bg-blue-700">Sukurti</button>

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
    components: {
        Input, Select, UploadPhoto
    },
    data() {
        return {
            Ready: false,
            Data: {
                name: '',
                surname: '',
                position: '',
                email: '',
                phone_number: '',
                company_id: '',
                office_id: '',
                division_id: '',
                department_id: '',
                group_id: '',
                photo: ''
            },
            Companies: [],
            Divisions: [],
            Groups: [],
            Departments: [],
            Offices: [],


            ManyTables: {
                companies_offices: [],
                offices_divisions: [],
                divisions_departments: [],
                departments_groups: [],
            },
            Filters: {
                companies: new Set(),
                offices: new Set(),
                divisions: new Set(),
                departments: new Set(),
                groups: new Set(),
            }
        };
    },
    methods: {
        ...mapActions({
            Close: 'Modal/close',
            set_message: 'Notification/set_data',
            refresh: "Refresh/refresh"
        }),
        async GetData() {
            this.Filter()
            await this.GetOffices()
            await this.GetCompanies()
            await this.GetDepartments()
            await this.GetDivisions()
            await this.GetGroups()
        },
        Filter() {
            let allCombinations = [];

            this.ManyTables.companies_offices.forEach(co => {
                const matchingDivisions = this.ManyTables.offices_divisions.filter(od => od.office_id === co.office_id);
                matchingDivisions.forEach(md => {
                    const matchingDepartments = this.ManyTables.divisions_departments.filter(dd => dd.division_id === md.division_id);
                    matchingDepartments.forEach(dd => {
                        const matchingGroups = this.ManyTables.departments_groups.filter(dg => dg.department_id === dd.department_id);
                        matchingGroups.forEach(mg => {
                            allCombinations.push({
                                company_id: co.company_id,
                                office_id: co.office_id,
                                division_id: md.division_id,
                                department_id: dd.department_id,
                                group_id: mg.group_id
                            });
                        });
                    });
                });
            });
            
            if(this.Data.company_id !== '')
            {
                allCombinations = allCombinations.filter(combination => combination.company_id === this.Data.company_id)
            }
            if(this.Data.office_id !== '')
            {
                allCombinations = allCombinations.filter(combination => combination.office_id === this.Data.office_id)
            }
            if(this.Data.department_id !== '')
            {
                allCombinations = allCombinations.filter(combination => combination.department_id === this.Data.department_id)
            }
            if(this.Data.group_id !== '')
            {
                allCombinations =  allCombinations.filter(combination => combination.group_id === this.Data.group_id)
            }
            if(this.Data.division_id !== '')
            {
                allCombinations = allCombinations.filter(combination => combination.division_id === this.Data.division_id)
            }

                this.Filters.companies = new Set(),
                this.Filters.offices = new Set(),
                this.Filters.divisions = new Set(),
                this.Filters.departments = new Set(),
                this.Filters.groups = new Set()

            for(const combination of allCombinations)
            {
                this.Filters.companies.add(combination.company_id)
                this.Filters.offices.add(combination.office_id)
                this.Filters.divisions.add(combination.division_id)
                this.Filters.departments.add(combination.department_id)
                this.Filters.groups.add(combination.group_id)
            }


        },
        async GetManyCollections() {
            for (const key of Object.keys(this.ManyTables)) {
                this.ManyTables[key] = (await this.$GetCollection({ Collection: key, ItemsPerPage: 'All' })).items
            }
        },
        async GetCompanies() {
            const companies = []
            for (const company of this.Filters.companies) {
                companies.push(`id='${company}'`)
            }
            const response = (await this.$GetCollection({
                Collection: 'companies', ItemsPerPage: 'All', query: {
                    filter: companies.join('||')
                }
            })).items
            this.Companies = response
        },
        async GetOffices() {
            const offices = []
            for (const office of this.Filters.offices) {
                offices.push(`id='${office}'`)
            }
            const response = (await this.$GetCollection({
                Collection: 'offices', ItemsPerPage: 'All', query: {
                    filter: offices.join('||')
                }
            })).items
            this.Offices = response
        },
        async GetDepartments() {
            const departments = []
            for (const department of this.Filters.departments) {
                departments.push(`id='${department}'`)
            }
            const response = (await this.$GetCollection({
                Collection: 'departments', ItemsPerPage: 'All', query: {
                    filter: departments.join('||')
                }
            })).items
            this.Departments = response
        },
        async GetGroups() {
            const groups = []
            for (const group of this.Filters.groups) {
                groups.push(`id='${group}'`)
            }
            const response = (await this.$GetCollection({
                Collection: 'groups', ItemsPerPage: 'All', query: {
                    filter: groups.join('||')
                }
            })).items
            this.Groups = response
        },
        async GetDivisions() {
            const divisions = []
            for (const division of this.Filters.divisions) {
                divisions.push(`id='${division}'`)
            }
            const response = (await this.$GetCollection({
                Collection: 'divisions', ItemsPerPage: 'All', query: {
                    filter: divisions.join('||')
                }
            })).items
            this.Divisions = response
        },

        async HandleForm() {
            this.ResetErrors()
            if (!this.ValidateForm()) {
                return
            }
            const response = await this.$CreateRecord({ Collection: 'employees', data: this.Data })
            if (response !== null) {
                this.set_message({ message: 'Succesfully Created Employee', type: 'success' })
                this.refresh()
                this.Close()
            }
            else {
                this.set_message({ message: 'Failed To Create Employee', type: 'error' })
            }

        },
        ValidateForm() {
            let valid = true

            const nameRegex = /^[A-Za-z]+$/
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

            if (!(this.$refs.NameInput.value.length > 0)) {
                this.$refs.NameInput.error = 'Name Is Required'
                valid = false
            }
            if (!nameRegex.test(this.$refs.NameInput.value)) {
                this.$refs.NameInput.error = 'Name Should Only Include Letters'
                valid = false
            }
            if (!(this.$refs.SurnameInput.value.length > 0)) {
                this.$refs.NameInput.error = 'Surname Is Required'
                valid = false
            }
            if (!nameRegex.test(this.$refs.SurnameInput.value)) {
                this.$refs.SurnameInput.error = 'Surname Should Only Include Letters'
                valid = false
            }

            if (!(this.$refs.PositionInput.value.length > 0)) {
                this.$refs.PositionInput.error = 'Position Name Is Required'
                valid = false
            }

            if (!(this.$refs.EmailInput.value.length > 0)) {
                this.$refs.EmailInput.error = 'Email Is Required'
                valid = false
            }

            if (!emailRegex.test(this.$refs.EmailInput.value)) {
                this.$refs.EmailInput.error = 'Incorrect Email'
                valid = false
            }


            if (this.$refs.PhoneInput.value.length > 0 && !phoneRegex.test(this.$refs.PhoneInput.value)) {
                this.$refs.PhoneInput.error = 'Incorrect Phone Number Input'
                valid = false
            }

            if (this.$refs.CompanySelect.value === '') {
                this.$refs.CompanySelect.error = 'Please Select Company'
                valid = false
            }

            if (this.$refs.DivisionSelect.value === '') {
                this.$refs.DivisionSelect.error = 'Please Select Division'
                valid = false
            }

            if (this.$refs.OfficeSelect.value === '') {
                this.$refs.OfficeSelect.error = 'Please Select Office'
                valid = false
            }

            return valid
        },
        ResetErrors() {
            for (let ref in this.$refs) {
                this.$refs[ref].error = false
            }
        },
    },
    watch: {
        async 'Data.company_id'() {

            await this.GetData()

        },
        async 'Data.office_id'() {
            await this.GetData()
        },
        async 'Data.division_id'() {
            await this.GetData()
        },
        async 'Data.department_id'() {
            await this.GetData()
        },
        async 'Data.group_id'() {
            await this.GetData()
        },
    },
    async created() {
        await this.GetManyCollections()
        await this.GetData()
        this.Ready = true
    }

};
</script>
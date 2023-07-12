<template>
    <div class="h-full w-full p-10">
        <div class="flex justify-end">
            <button @click="Close()" class=" bg-blue-700 text-white right-14 top-0 rounded-full p-4 flex"><iconify-icon icon="material-symbols:close" style="color: white;" width="32"></iconify-icon></button>
        </div>

        <template v-if="Ready" >
            <div class=" grid grid-cols-2 gap-x-32 m-12 mx-24 text-base ">   

                    <div class="p-6">
                        <div class=" text-center text-2xl">Sukurti diviziją:</div>
                        <div class="space-y-4">
                           <Input ref="NameInput" v-model="Data.name" :label="'Pavadinimas:'" :placeholder="'Įveskite pavadinimą...'"/>   
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <div class="text-center text-2xl">Priklauso:</div>
                        <div class="space-y-4">
                           <template v-for="office in Offices">
                                <Checkbox v-model="choices" :value="office.id" :label="office.name"/>
                           </template>
                           <div v-if="error" class="text-center text-custom-red">{{ error }}</div>
                        </div>
                    </div>

            </div>
            <div class="mt-20 mx-6">
                <div class="flex justify-end  ">
                    <button @click="HandleForm()" class=" p-3 px-28 rounded-md text-center text-white text-xl bg-blue-700">Redaguoti</button>
    
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
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        Input, Select, UploadPhoto, Checkbox
    },
    data() {
        return {
            Ready:false,
            Data:{
                name:'',
            },
            error:false,
            choices:[],
            Offices:'',
        };
    },
    methods: {
        ...mapActions({
            Close: 'Modal/close',
            set_message:'Notification/set_data',
            refresh:"Refresh/refresh"
        }),
        async HandleForm() {
            this.ResetErrors()
            if (!this.ValidateForm()) {
                return
            }
            let response
            if(response === null)
            {
                this.set_message({message:'Failed To Update Division',type:'error'})
                return
            }
            response = await this.$UpdateRecord({ Collection: 'divisions', data: this.Data, id: this.id })
            const divisionid = response.id
            let many = (await this.$GetCollection({
                Collection: 'offices_divisions', ItemsPerPage: 'All', query: {
                    filter: `division_id='${divisionid}'`
                }
            })).items
            const offices_ids = []
            for (const item of many) {
                offices_ids.push({ id: item.id, office_id: item.office_id })
            }
            for (const office of offices_ids) {
                const found = this.choices.some((choice) => choice === office.office_id)
                if (!found) {
                    console.log('delete', office.id)
                    response = await this.$DeleteRecord({ Collection: 'offices_divisions', id: office.id })
                    if(response === null)
                    {
                        this.set_message({message:'Failed To Update Division',type:'error'})
                        return
                    }
                }
            }
            for (const choice of this.choices) {
                const found = offices_ids.some((office) => office.office_id === choice)
                if (!found) {
                    console.log('add', choice)
                    response = await this.$CreateRecord({ Collection: 'offices_divisions', data: { office_id: choice, division_id: divisionid } })
                    if(response === null)
                    {
                        this.set_message({message:'Failed To Update Division',type:'error'})
                        return
                    }
                }
            }
            this.set_message({message:'Succesfully Edited Division',type:'success'})
            this.refresh()
            this.Close()
        },
        ValidateForm()
        {
            let valid = true
            if(!(this.$refs.NameInput.value.length > 2))
            {
                this.$refs.NameInput.error = 'Incorrect Division Input'
                valid=false
            }
            if(this.choices.length < 1)
            {
                this.error = 'Select An Office'
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
    computed: {
        ...mapGetters({
            id: 'Form/id',
        })
    },
    async created() {
        this.Offices = (await this.$GetCollection({ Collection: 'offices', ItemsPerPage: 'All' })).items
        this.Data = await this.$GetSingleRecord({ Collection: 'divisions', id: this.id })
        let offices_divisions = (await this.$GetCollection({
            Collection: 'offices_divisions', ItemsPerPage: 'All', query: {
                filter: `division_id="${this.id}"`
            }
        })).items
        for (const office_division of offices_divisions) {
            this.choices.push(office_division.office_id)
        }
        this.Ready = true
    }

};
</script>
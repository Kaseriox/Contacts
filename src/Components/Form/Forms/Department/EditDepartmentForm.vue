<template>
    <div class="h-full w-full p-10">
        <div class="flex justify-end">
            <button @click="Close()" class=" bg-blue-700 text-white right-14 top-0 rounded-full p-4 flex"><iconify-icon icon="material-symbols:close" style="color: white;" width="32"></iconify-icon></button>
        </div>

        <template v-if="Ready" >
            <div class=" grid grid-cols-2 gap-x-32 m-12 mx-24 text-base ">   

                    <div class="p-6">
                        <div class=" text-center text-2xl">Sukurti departamentą:</div>
                        <div class="space-y-4">
                           <Input ref="NameInput" v-model="Data.name" :label="'Pavadinimas:'" :placeholder="'Įveskite pavadinimą...'"/>   
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <div class="text-center text-2xl">Priklauso:</div>
                        <div class="space-y-4">
                           <template v-for="division in Divisions">
                                <Checkbox v-model="choices" :value="division.id" :label="division.name"/>
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
import Checkbox from '../../../InputField/CheckboxField.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        Input, Checkbox
    },
    data() {
        return {
            Ready:false,
            Data:{
                name:'',
            },
            error:false,
            choices:[],
            Divisions:'',
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
            response = await this.$UpdateRecord({ Collection: 'departments', data: this.Data, id: this.id })
            if(response === null)
            {
                this.set_message({message:'Failed To Update Department',type:'error'})
            }
            const departmentid = response.id
                let many = (await this.$GetCollection({
                    Collection: 'divisions_departments', ItemsPerPage: 'All', query: {
                        filter: `department_id='${departmentid}'`
                    }
                })).items
                const divisions_ids = []
                for (const item of many) {
                    divisions_ids.push({ id: item.id, division_id: item.division_id })
                }
                for (const division of divisions_ids) {
                    const found = this.choices.some((choice) => choice === division.division_id)
                    if (!found) {
                        console.log('delete', division.id)
                        response = await this.$DeleteRecord({ Collection: 'divisions_departments', id: division.id })
                        if(response === null)
                        {
                            this.set_message({message:'Failed To Update Department',type:'error'})
                            return;
                        }
                    }
                }
                for (const choice of this.choices) {
                    const found = divisions_ids.some((division) => division.division_id === choice)
                    if (!found) {
                        console.log('add', choice)
                        response = await this.$CreateRecord({ Collection: 'divisions_departments', data: { division_id: choice, department_id: departmentid } })
                        if(response === null)
                        {
                            this.set_message({message:'Failed To Update Department',type:'error'})
                            return;
                        }
                    }
                }
                this.set_message({message:'Succesfully Updated Department',type:'success'})
                this.refresh()
                this.Close()

        },
        ValidateForm()
        {
            let valid = true
            if(!(this.$refs.NameInput.value.length > 2))
            {
                this.$refs.NameInput.error = 'Incorrect Department Input'
                valid=false
            }
            if(this.choices.length < 1)
            {
                this.error = 'Select a Division'
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
        this.Divisions = (await this.$GetCollection({ Collection: 'divisions', ItemsPerPage: 'All' })).items
        this.Data = await this.$GetSingleRecord({ Collection: 'departments', id: this.id })
        let divisions_departments = (await this.$GetCollection({
            Collection: 'divisions_departments', ItemsPerPage: 'All', query: {
                filter: `department_id="${this.id}"`
            }
        })).items
        for (const division_department of divisions_departments) {
            this.choices.push(division_department.division_id)
        }
        this.Ready = true
    }

};
</script>
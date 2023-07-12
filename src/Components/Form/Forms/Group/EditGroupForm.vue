<template>
    <div class="h-full w-full p-10">
        <div class="flex justify-end">
            <button @click="Close()" class=" bg-blue-700 text-white right-14 top-0 rounded-full p-4 flex"><iconify-icon icon="material-symbols:close" style="color: white;" width="32"></iconify-icon></button>
        </div>

        <template v-if="Ready" >
            <div class=" grid grid-cols-2 gap-x-32 m-12 mx-24 text-base ">   

                    <div class="p-6">
                        <div class=" text-center text-2xl">Atnaujinti grupę:</div>
                        <div class="space-y-4">
                           <Input ref="NameInput" v-model="Data.name" :label="'Pavadinimas:'" :placeholder="'Įveskite pavadinimą...'"/>   
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <div class="text-center text-2xl">Priklauso:</div>
                        <div class="space-y-4">
                           <template v-for="department in Departments">
                                <Checkbox v-model="choices" :value="department.id" :label="department.name"/>
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
            Departments:'',
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
            response = await this.$UpdateRecord({ Collection: 'groups', data: this.Data, id: this.id })
            if(response===null)
            {
                this.set_message({message:'Failed To Update Group',type:'error'})
                return
            }
            const groupid = response.id
            let many = (await this.$GetCollection({
                Collection: 'departments_groups', ItemsPerPage: 'All', query: {
                    filter: `group_id='${groupid}'`
                }
            })).items
            const department_ids = []
            for (const item of many) {
                department_ids.push({ id: item.id, department_id: item.department_id })
            }
            for (const deparment of department_ids) {
                const found = this.choices.some((choice) => choice === deparment.department_id)
                if (!found) {
                    console.log('delete', deparment.id)
                    response = await this.$DeleteRecord({ Collection: 'departments_groups', id: deparment.id })
                    if(response===null)
                    {
                        this.set_message({message:'Failed To Update Group',type:'error'})
                        return
                    }
                }
            }
            for (const choice of this.choices) {
                const found = department_ids.some((deparment) => deparment.department_id === choice)
                if (!found) {
                    console.log('add', choice)
                    response = await this.$CreateRecord({ Collection: 'departments_groups', data: { department_id: choice, group_id: groupid } })
                    if(response===null)
                    {
                        this.set_message({message:'Failed To Update Group',type:'error'})
                        return
                    }
                }
            }
            this.set_message({message:'Succesfully Updated Group',type:'success'})
            this.refresh()
            this.Close()
        },
        ValidateForm()
        {
            let valid = true
            if(!(this.$refs.NameInput.value.length > 2))
            {
                this.$refs.NameInput.error = 'Incorrect Company Input'
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
        this.Departments = (await this.$GetCollection({ Collection: 'departments', ItemsPerPage: 'All' })).items
        this.Data = await this.$GetSingleRecord({ Collection: 'groups', id: this.id })
        let departments_groups = (await this.$GetCollection({
            Collection: 'departments_groups', ItemsPerPage: 'All', query: {
                filter: `group_id="${this.id}"`
            }
        })).items
        for (const departments_group of departments_groups) {
            this.choices.push(departments_group.department_id)
        }
        this.Ready = true
    }

};
</script>
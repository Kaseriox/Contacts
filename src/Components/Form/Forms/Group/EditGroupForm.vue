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
                            <vue-tags-input
                                v-model="tag"
                                :tags="tags"
                                :autocomplete-items="filteredItems"
                                :add-only-from-autocomplete="true"
                                @tags-changed="(newTags) => (tags = newTags)"
                                />
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
import vueTagsInput  from '@johmun/vue-tags-input';
import Input from '../../../InputField/InputField.vue'
import Select from '../../../InputField/SelectField.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        Input, Select,vueTagsInput
    },
    data() {
        return {
            tag:'',
            tags:[],
            autocomplete:[],
            Ready:false,
            Data:{
                name:'',
            },
            error:false,
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
                this.set_message({message:'Nepavyko atnaujinti grupės',type:'error'})
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
                const found = this.tags.some((tag) => tag.id === deparment.department_id)
                if (!found) {
                    response = await this.$DeleteRecord({ Collection: 'departments_groups', id: deparment.id })
                    if(response===null)
                    {
                        this.set_message({message:'Nepavyko atnaujinti grupės',type:'error'})
                        return
                    }
                }
            }
            for (const choice of this.tags) {
                const found = department_ids.some((deparment) => deparment.department_id === choice.id)
                if (!found) {
                    response = await this.$CreateRecord({ Collection: 'departments_groups', data: { department_id: choice.id, group_id: groupid } })
                    if(response===null)
                    {
                        this.set_message({message:'Nepavyko atnaujinti grupės',type:'error'})
                        return
                    }
                }
            }
            this.set_message({message:'Sėkmingai atnaujinta grupė',type:'success'})
            this.refresh()
            this.Close()
        },
        ValidateForm()
        {
            let valid = true
            if(!(this.$refs.NameInput.value.length > 0))
            {
                this.$refs.NameInput.error = 'Grupės pavadinimas yra reikalingas'
                valid=false
            }
            if(this.tags.length < 1)
            {
                this.error = 'Pasirinkite Skyrių'
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
            this.error=false
        },
    },
    computed: {
        ...mapGetters({
            id: 'Form/id',
        }),
        filteredItems() {
      return this.autocomplete.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
    },
    async created() {
        const Departments = (await this.$GetCollection({Collection:'departments',ItemsPerPage:'All'})).items
        for(const record of Departments)
        {
            this.autocomplete.push({text:record.name,id:record.id})
        }
        this.Data = await this.$GetSingleRecord({ Collection: 'groups', id: this.id })
        let departments_groups = (await this.$GetCollection({
            Collection: 'departments_groups', ItemsPerPage: 'All', query: {
                filter: `group_id="${this.id}"`,
                expand:'department_id'
            }
        })).items
        for (const departments_group of departments_groups) {
            this.tags.push({text:departments_group.expand.department_id.name,id:departments_group.expand.department_id.id})
        }
        this.Ready = true
    }

};
</script>
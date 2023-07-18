<template>
    <div class="h-full w-full p-10">
        <div class="flex justify-end">
            <button @click="Close()" class=" bg-blue-700 text-white right-14 top-0 rounded-full p-4 flex"><iconify-icon icon="material-symbols:close" style="color: white;" width="32"></iconify-icon></button>
        </div>

        <template v-if="Ready" >
            <div class=" grid grid-cols-2 gap-x-32 m-12 mx-24 text-base ">   

                    <div class="p-6">
                        <div class=" text-center text-2xl">Atnaujinti padalinį:</div>
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
import vueTagsInput from '@johmun/vue-tags-input';
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
            if(response === null)
            {
                this.set_message({message:'Nepavyko atnaujinti padalinio',type:'error'})
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
                const found = this.tags.some((tag) => tag.id === office.office_id)
                if (!found) {
                    response = await this.$DeleteRecord({ Collection: 'offices_divisions', id: office.id })
                    if(response === null)
                    {
                        this.set_message({message:'Nepavyko atnaujinti padalinio',type:'error'})
                        return
                    }
                }
            }
            for (const choice of this.tags) {
                const found = offices_ids.some((office) => office.office_id === choice.id)
                if (!found) {
                    response = await this.$CreateRecord({ Collection: 'offices_divisions', data: { office_id: choice.id, division_id: divisionid } })
                    if(response === null)
                    {
                        this.set_message({message:'Nepavyko atnaujinti padalinio',type:'error'})
                        return
                    }
                }
            }
            this.set_message({message:'Sėkmingai atnaujintas padalinys',type:'success'})
            this.refresh()
            this.Close()
        },
        ValidateForm()
        {
            let valid = true
            if(!(this.$refs.NameInput.value.length > 0))
            {
                this.$refs.NameInput.error = 'Padalinio pavadinimas yra reikalingas'
                valid=false
            }
            if(this.tags.length < 1)
            {
                this.error = 'Pasirinkite bent vieną ofisą'
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
        const Offices = (await this.$GetCollection({ Collection: 'offices', ItemsPerPage: 'All' })).items
        for(const record of Offices)
        {
            this.autocomplete.push({text:record.name,id:record.id})
        }
        this.Data = await this.$GetSingleRecord({ Collection: 'divisions', id: this.id })
        let offices_divisions = (await this.$GetCollection({
            Collection: 'offices_divisions', ItemsPerPage: 'All', query: {
                filter: `division_id="${this.id}"`,
                expand:'office_id'
            }
        })).items
        for (const office_division of offices_divisions) {
            this.tags.push({text:office_division.expand.office_id.name,id:office_division.expand.office_id.id})
        }
        this.Ready = true
    }

};
</script>
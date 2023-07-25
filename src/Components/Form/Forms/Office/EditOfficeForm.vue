<template>
    <div class="h-full w-full p-10">
        <div class="flex justify-end">
            <button @click="Close()" class=" bg-blue-700 text-white right-14 top-0 rounded-full p-4 flex"><iconify-icon
                    icon="material-symbols:close" style="color: white;" width="32"></iconify-icon></button>
        </div>

        <template v-if="Ready">
            <div class=" grid grid-cols-2 gap-x-32 m-12 mx-24 text-base ">

                <div class="p-6">
                    <div class=" text-center text-2xl">Atnaujinti ofisą:</div>
                    <div class="space-y-4">
                        <Input ref="StreetInput" v-model="Data.street" :label="'Gatvė:'"
                            :placeholder="'Įveskite gatvę...'" />
                        <Input ref="StreetNumberInput" v-model="Data.street_number" :label="'Gatvės numeris:'"
                            :placeholder="'Įveskite gatvės numerį...'" />
                        <Input ref="CityInput" v-model="Data.city" :label="'Miestas:'"
                            :placeholder="'Įveskite miestą...'" />
                        <Input ref="CountryInput" v-model="Data.country" :label="'Valstybė:'"
                            :placeholder="'Įveskite valstybę...'" />
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
                                :placeholder="'Pridėti įmonę'"
                                @tags-changed="(newTags) => (tags = newTags)"
                                />
                        <div v-if="error" class="text-center text-custom-red">{{ error }}</div>
                    </div>
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
import  vueTagsInput  from '@johmun/vue-tags-input';
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
            Ready: false,
            Data: {
                name: '',
                street: '',
                street_number: '',
                city: '',
                country: '',
            },
            error: false,
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
            this.Data.name = this.Data.street.concat(' ',this.Data.street_number,', ', this.Data.city,', ', this.Data.country)
            let response
            response = await this.$UpdateRecord({ Collection: 'offices', data: this.Data, id: this.id })
            if(response === null)
            {
                this.set_message({message:'Nepavyko atnaujinti ofiso',type:'error'})
                return
            }
            const officeid = response.id
            let many = (await this.$GetCollection({
                Collection: 'companies_offices', ItemsPerPage: 'All', query: {
                    filter: `office_id='${officeid}'`
                }
            })).items
            const company_ids = []
            for (const item of many) {
                company_ids.push({ id: item.id, company_id: item.company_id })
            }
            for (const company of company_ids) {
                const found = this.tags.some((tag) => tag.id === company.company_id)
                if (!found) {
                    response = await this.$DeleteRecord({ Collection: 'companies_offices', id: company.id })
                    if(response === null)
                    {
                        this.set_message({message:'Nepavyko atnaujinti ofiso',type:'error'})
                        return
                    }
                }
            }
            for (const choice of this.tags) {
                const found = company_ids.some((company) => company.company_id === choice.id)
                if (!found) {
                    response = await this.$CreateRecord({ Collection: 'companies_offices', data: { company_id: choice.id, office_id: officeid } })
                    if(response === null)
                    {
                        this.set_message({message:'Nepavyko atnaujinti ofiso',type:'error'})
                        return
                    }
                }
            }
            this.set_message({message:'Sėkmingai atnaujintas ofisas',type:'success'})
            this.refresh()
            this.Close()
        },
        ValidateForm() {
            let valid = true
            if(!(this.$refs.StreetInput.value.length > 0))
            {
                this.$refs.StreetInput.error = 'Ofiso gatvė yra reikalingas'
                valid=false
            }
            if(!(this.$refs.StreetInput.value.length < 71))
            {
                this.$refs.StreetInput.error = 'Ofiso gatvė yra per ilga (max 70 simbolių)'
                valid=false
            }
            if(!(this.$refs.StreetNumberInput.value.length > 0))
            {
                this.$refs.StreetNumberInput.error = "Ofiso gatvės numeris yra reikalingas"
                valid=false
            }
            if(!(this.$refs.StreetNumberInput.value.length < 11))
            {
                this.$refs.StreetNumberInput.error = "Ofiso gatvės numeris yra per ilgas (max 10 simbolių)"
                valid=false
            }
            if(!(this.$refs.CityInput.value.length > 0))
            {
                this.$refs.CityInput.error = 'Ofiso miestas yra reikalingas'
                valid=false
            }
            if(!(this.$refs.CityInput.value.length < 31))
            {
                this.$refs.CityInput.error = 'Ofiso miestas yra per ilgas (max 40 simbolių)'
                valid=false
            }
            if(!(this.$refs.CountryInput.value.length > 0))
            {
                this.$refs.CountryInput.error = 'Ofiso valstybė yra reikalinga'
                valid=false
            }
            if(!(this.$refs.CountryInput.value.length < 31))
            {
                this.$refs.CountryInput.error = 'Ofiso valstybė yra per ilga (max 30 simbolių)'
                valid=false
            }
            if(this.tags.length < 1)
            {
                this.error = 'Pasirinkite bent vieną įmonę'
                valid=false
            }
            return valid
        },
        ResetErrors() {
            for (let ref in this.$refs) {
                this.$refs[ref].error = false
            }
            this.error = false
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
        const Companies = (await this.$GetCollection({Collection:'companies',ItemsPerPage:'All'})).items
        for(const record of Companies)
        {
            this.autocomplete.push({text:record.name,id:record.id})
        }
        this.Data = await this.$GetSingleRecord({ Collection: 'offices', id: this.id })
        let companies_offices = (await this.$GetCollection({
            Collection: 'companies_offices', ItemsPerPage: 'All', query: {
                filter: `office_id="${this.id}"`,
                expand:'company_id'
            }
        })).items
        console.log(companies_offices)
        for (const company_office of companies_offices) {
            this.tags.push({text:company_office.expand.company_id.name,id:company_office.expand.company_id.id})
        }
        this.Ready = true
    }

};
</script>
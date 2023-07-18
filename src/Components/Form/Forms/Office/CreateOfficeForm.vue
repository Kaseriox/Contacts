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
                    <button @click="HandleForm()" class=" p-3 px-28 rounded-md text-center text-white text-xl bg-blue-700">Sukurti</button>
    
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import  vueTagsInput  from '@johmun/vue-tags-input';
import Input from '../../../InputField/InputField.vue'
import Select from '../../../InputField/SelectField.vue'
import { mapActions } from 'vuex';
export default {
    components: {Input,Select,vueTagsInput
    },
    data() {
        return {
            tag:'',
            tags:[],
            autocomplete:[],
            Ready:false,
            Data:{
                name:'',
                street:'',
                street_number:'',
                city:'',
                country:'',
            },
            error:false,
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
                 this.set_message({message:'Nepavyko sukurti ofiso',type:'error'})
                 return
            }
            const officeid = response.id
            for(const choice of this.tags)
            {
                response = await this.$CreateRecord({Collection:'companies_offices',data:{company_id:choice.id,office_id:officeid}})
                if(response===null)
                {
                    this.set_message({message:'Nepavyko sukurti ofiso',type:'error'})
                    return
                }
            }
            this.set_message({message:'Sėkmingai sukurtas ofisas',type:'success'})
            this.refresh()
            this.Close()
        },
        ValidateForm()
        {
            let valid = true
            const numberRegex = /^\d+$/
            if(!(this.$refs.NameInput.value.length > 0))
            {
                this.$refs.NameInput.error = 'Ofiso pavadinimas yra reikalingas'
                valid=false
            }
            if(!(this.$refs.StreetInput.value.length > 0))
            {
                this.$refs.StreetInput.error = 'Ofiso gatvė yra reikalingas'
                valid=false
            }
            if(!(numberRegex.test(this.$refs.StreetNumberInput.value)))
            {
                this.$refs.StreetNumberInput.error = "Ofiso gatvės numeris yra reikalingas"
                valid=false
            }
            if(!(this.$refs.CityInput.value.length > 0))
            {
                this.$refs.CityInput.error = 'Ofiso miestas yra reikalingas'
                valid=false
            }
            if(!(this.$refs.CountryInput.value.length > 0))
            {
                this.$refs.CountryInput.error = 'Ofiso valstybė yra reikalinga'
                valid=false
            }
            if(this.tags.length < 1)
            {
                this.error = 'Pasirinkite bent vieną įmonę'
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
    filteredItems() {
      return this.autocomplete.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
  },
    async created()
    {
        const Companies = (await this.$GetCollection({Collection:'companies',ItemsPerPage:'All'})).items
        for(const record of Companies)
        {
            this.autocomplete.push({text:record.name,id:record.id})
        }
        this.Ready=true
    }   

};
</script>
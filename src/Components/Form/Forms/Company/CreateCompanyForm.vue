<template>
    <div class="h-full w-full p-10">
        <div class="flex justify-end">
            <button @click="Close()" class=" bg-blue-700 text-white right-14 top-0 rounded-full p-4 flex"><iconify-icon icon="material-symbols:close" style="color: white;" width="32"></iconify-icon></button>
        </div>

        <template>
            <div class="text-base w-96 mr-24 mb-4">   
                    <div>
                        <div class="text-3xl mb-7">Pridėkite naują įmonę: </div>
                        <div class="space-y-4">
                           <Input ref="CompanyInput" v-model="Data.name" :label="'Įmonės pavadinimas:'" :placeholder="'Įveskite įmonės pavadinimą...'"/>   
                        </div>
                    </div>
            </div>
            <div>
                <div>
                    <button @click="HandleForm()" class=" p-3 px-28 rounded-md text-center text-white text-xl bg-blue-700">Pridėti</button>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import Input from '../../../InputField/InputField.vue'
import { mapActions } from 'vuex';
export default {
    components: {Input},
    data() {
        return {
            Data:{
                name:''
            },
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
           const response = await this.$CreateRecord({Collection:'companies',data:this.Data})
           if(response!==null)
           {
                this.set_message({message:'Įmonė sėkmingai sukurta',type:'success'})
                this.refresh()
                this.Close()
           }
           else
           {
                this.set_message({message:'Nepavyko sukurti įmonės',type:'error'})
           }

        },
        ValidateForm()
        {
            let valid = true
            if(!(this.$refs.CompanyInput.value.length > 0))
            {
                this.$refs.CompanyInput.error = 'Įmonės pavadinimas yra reikalingas'
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
};
</script>
<template >
    <div v-if="Data!==false" class="space-y-4 text-base">
       <div class="text-4xl">Įmonės</div> 
       <div v-if="user_data?.expand.permissions_id.edit_companies" class="flex flex-row items-center space-x-8">
            <FormButton :type="'create'" :collection="'companies'"/>
            <div class="text-2xl">Pridėkite naują įmonę</div>
       </div>
       <ItemsFound :count="Data.length"/>
       <Table class="w-1/2" :data="SetData()"  :fields="SetFields()" :permissions="SetPermissions()"/>
    </div>
</template>
  
<script>
import FormButton from '../../Form/FormButton.vue';
import ItemsFound from '../../Contacts/Paging/ItemsFound.vue'
import Table from '../../Reusables/Table.vue';
import { mapGetters } from 'vuex';
export default {
    components: {FormButton,ItemsFound,Table},  
    data() {
        return {
            Data:false
        };
    },
    methods:{
    async GetData()
    {
        this.Data = (await this.$GetCollection({Collection:'companies',ItemsPerPage:'All'})).items
    },  
    SetData()
    {
        let arr =[]
        for(const contact of this.Data)
        {
            const obj = {
              collection:'companies',
              id:contact.id,
              "Įmonės pavadinimas":contact.name,
            }
            arr.push(obj)
        }
        return arr
    },
    SetFields()
    {
        return ["Įmonės pavadinimas"]
    },
    SetPermissions()
    {
        let obj = {
            edit:this.user_data?.expand.permissions_id.edit_companies,
            delete:this.user_data?.expand.permissions_id.delete_companies
        }
        return obj
    },
    },
    computed:{
        ...mapGetters({
            user_data:'User/Data',
            refreshID:'Refresh/refresh'
        })
    },  
    watch:{
        refreshID()
        {
            this.GetData()
        }
    },
    async created()
    {
        this.GetData()
    }
};
</script>
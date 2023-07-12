<template >
    <div v-if="Data!==false" class="space-y-4 text-base">
       <div class="text-4xl">Grupės</div> 
       <div v-if="user_data?.expand.permissions_id.edit_structure" class="flex flex-row items-center space-x-8">
            <FormButton :type="'create'" :collection="'groups'"/>
            <div class="text-2xl">Pridėkite naują grupę</div>
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
        this.Data = (await this.$GetCollection({Collection:'groups',ItemsPerPage:'All'})).items
    },  
    SetData()
    {
        let arr =[]
        for(const contact of this.Data)
        {
            const obj = {
              collection:'groups',
              id:contact.id,
              "Grupės pavadinimas":contact.name,
            }
            arr.push(obj)
        }
        return arr
    },
    SetFields()
    {
        return ["Grupės pavadinimas"]
    },
    SetPermissions()
    {
        let obj = {
            edit:this.user_data?.expand.permissions_id.edit_structure,
            delete:this.user_data?.expand.permissions_id.delete_structure
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
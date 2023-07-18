<template >
    <div v-if="Data!==false && user_data?.name ==='Admin'" class="space-y-4 text-base">
       <div class="text-4xl">Sukurti admin paskyrą</div> 
       <div class="flex flex-row items-center space-x-8">
            <FormButton v-if="user_data?.expand.permissions_id?.edit_permissions" :type="'create'" :collection="'users'"/>
            <div class="text-2xl">Sukurti naują admin paskyrą</div>
       </div>
       <ItemsFound :count="Data.length" :name="'paskyros'"/>
       <Table class="w-1/2" :data="SetData()" :fields="SetFields()" :permissions="SetPermissions()" />
    </div>
    <div v-else>
        <div class="text-4xl">No Access</div>
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
            this.Data = (await this.$GetCollection({Collection:'users',ItemsPerPage:'All'})).items
        },
        SetData()
        {
            let arr =[]
            for(const contact of this.Data)
            {
                const obj = {
                collection:'users',
                id:contact.id,
                "Vardas":contact.username,
                "El.paštas":contact.email
                }
                arr.push(obj)
            }
            return arr
        },
        SetFields()
        {
            return ["Vardas","El.paštas"]
        },
        SetPermissions()
        {
            let obj = {
                edit:this.user_data?.expand.permissions_id?.edit_permissions ? this.user_data?.expand.permissions_id?.read_permissions : true ,
                delete:this.user_data?.expand.permissions_id?.delete_permissions
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
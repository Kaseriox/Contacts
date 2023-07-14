<template>
    <div class="grid grid-cols-5 gap-6 h-16" v-if="show">
      <FilterSelect v-for="Data in Filters" :key="Data.Type" :Data="Data" class=" h-full"/>  
    </div>
</template>
  
<script>
import FilterSelect from './FilterSelect.vue';
export default {
    components: {FilterSelect
    },
    props:{
        Expand:{
            required:true,
            default()
            {
                return []
            }
        }
    },
    data() {
        return {
            Filters:{
                company_id:{values:new Set(),Type:'Įmonė',Text:'Filtruoti įmones...',Belongs:'company_id.name'},
                department_id:{values:new Set(),Type:'Padalinys',Text:'Filtruoti divizijas...',Belongs:'department_id.name'},
                division_id:{values:new Set(),Type:'Skyrius',Text:'Filtruoti departamentus...',Belongs:'division_id.name'},
                group_id:{values:new Set(),Type:'Grupė',Text:'Filtruoti grupes...',Belongs:'group_id.name'},
                office_id:{values:new Set(),Type:'Ofisas',Text:'Filtruoti adresus...',Belongs:'office_id.name'},
            },
            show:false
        };
    },
    methods:{
        Filter()
        {
            Object.keys(this.Filters).forEach(Filter => this.Filters[Filter].values = new Set())
            for(const Filter of this.Expand)
            {
                for(const [key,value] of Object.entries(Filter.expand))
                {
                    this.Filters[key].values.add(value.name)
                }
            }
            this.show=true
        }
        
    },
    created()
    {
        this.Filter()
    },
    watch:{
        Expand()
        {
            this.Filter()
        }
    },
    destroyed()
    {
        this.$store.state.Paging.Filter = []
    }
};
</script>
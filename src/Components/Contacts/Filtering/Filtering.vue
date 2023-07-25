<template>
    <div class="grid grid-flow-col auto-cols-fr gap-x-6">
        <SelectField v-for="item in Fields" :key="item.placeholder" v-model="selection[item.model]" :label="item.label" :placeholder="item.placeholder" :options="options[item.options]" /> 
    </div>
</template>
  
<script>
import { mapActions } from 'vuex';
import SelectField from '../../InputField/SelectField.vue'
export default {
    components: {SelectField
    },
    data() {
        return {
           selection:{
            company_id:'',
            office_id:'',
            division_id:'',
            department_id:'',
            group_id:''
           },
           options:{
            companies:[],
            offices:[],
            divisions:[],
            departments:[],
            groups:[]
           },
           Fields:[
           {model:'company_id',options:'companies',label:'Įmonės',placeholder:'Pasirinkite įmonę'},
           {model:'office_id',options:'offices',label:'Ofisai',placeholder:'Pasirinkite ofisą'},
           {model:'division_id',options:'divisions',label:'Padaliniai',placeholder:'Pasirinkite padalinį'},
           {model:'department_id',options:'departments',label:'Skyriai',placeholder:'Pasirinkite skyrių'},
           {model:'group_id',options:'groups',label:'Grupės',placeholder:'Pasirinkite grupę'},
           ]
        };
    },
    methods:{
        ...mapActions({
            set_filter:'Paging/set_filter'
        }),
        async ReturnRecord(collection,expand,selection)
        {
            const Filter = this.selection[selection] === '' ? '' : `${selection}='${this.selection[selection]}'`
            if(Filter === ''){return}
            const response = (await this.$GetCollection({Collection:collection,ItemsPerPage:'All',query:{
                filter:Filter,
                expand:expand
            }})).items
            const list = []
            for(const record of response)
            {
                list.push(record.expand[expand])
            }
            return list
        }
    },
    
    watch:{
        async 'selection.company_id'(newvalue,oldvalue)
        {   
            this.selection.office_id = ''
            this.selection.division_id = ''
            this.selection.department_id = ''
            this.selection.group_id = ''
            this.options.offices = []
            this.options.divisions = []
            this.options.departments = []
            this.options.groups = []

            if(this.selection.company_id !=='')
            {
                this.options.offices = await this.ReturnRecord('companies_offices','office_id','company_id')
            }
            console.log([newvalue ===''? '' : `company_id='${newvalue}'`,oldvalue ===''? '' : `company_id='${oldvalue}'`])
            this.set_filter([newvalue ===''? '' : `company_id='${newvalue}'`,oldvalue ===''? '' : `company_id='${oldvalue}'`])

        },
        async 'selection.office_id'(newvalue,oldvalue)
        {
            this.selection.division_id = ''
            this.selection.department_id = ''
            this.selection.group_id = ''
            this.options.divisions = []
            this.options.departments = []
            this.options.groups = []
            if(this.selection.office_id !=='')
            {
                this.options.divisions = await this.ReturnRecord('offices_divisions','division_id','office_id')
            }
            this.set_filter([newvalue ===''? '' : `office_id='${newvalue}'`,oldvalue ===''? '' : `office_id='${oldvalue}'`])
        },
        async 'selection.division_id'(newvalue,oldvalue)
        {
            this.selection.department_id = ''
            this.selection.group_id = ''
            this.options.departments = []
            this.options.groups = []
            if(this.selection.division_id !=='')
            {
                this.options.departments = await this.ReturnRecord('divisions_departments','department_id','division_id')
            }
            this.set_filter([newvalue ===''? '' : `division_id='${newvalue}'`,oldvalue ===''? '' : `division_id='${oldvalue}'`])
        },
        async 'selection.department_id'(newvalue,oldvalue)
        {
            this.selection.group_id = ''
            this.options.groups = []
            if(this.selection.department_id !=='')
            {
                this.options.groups = await this.ReturnRecord('departments_groups','group_id','department_id')
            }
            this.set_filter([newvalue ===''? '' : `department_id='${newvalue}'`,oldvalue ===''? '' : `department_id='${oldvalue}'`])
        },
        async 'selection.group_id'(newvalue,oldvalue)
        {
            this.set_filter([newvalue ===''? '' : `group_id='${newvalue}'`,oldvalue ===''? '' : `group_id='${oldvalue}'`])
        },
    },
    async created()
    {
        this.options.companies = (await this.$GetCollection({Collection:'companies',ItemsPerPage:'All'})).items
    },
    destroyed()
    {
            this.selection.company_id = ''
            this.selection.office_id = ''
            this.selection.division_id = ''
            this.selection.department_id = ''
            this.selection.group_id = ''
            this.options.companies = []
            this.options.offices = []
            this.options.divisions = []
            this.options.departments = []
            this.options.groups = []
            this.$store.state.Paging.Filter=[]
    }
};
</script>
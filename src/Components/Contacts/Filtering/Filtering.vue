<template>
    <div class="grid grid-flow-col auto-cols-fr gap-x-6">
        <SelectField v-for="item in Fields" :key="item.placeholder" v-model="selection[item.model]" :label="item.label" :placeholder="item.placeholder" :options="options[item.options]" /> 
    </div>
</template>
  
<script>
import SelectField from '../../InputField/SelectField.vue'
export default {
    components: {SelectField
    },
    data() {
        return {
           filters:{
            company:[],
            offices:[],
            divisions:[],
            departments:[],
            groups:[],
           },
           selection:{
            company_id:'',
            office_id:'',
            department_id:'',
            division_id:'',
            group_id:''
           },
           options:{
            companies:[],
            offices:[],
            departments:[],
            divisions:[],
            groups:[]
           },
           Fields:[
           {model:'company_id',options:'companies',label:'Įmonės',placeholder:'Pasirinkite įmonę'},
           {model:'office_id',options:'offices',label:'Ofisai',placeholder:'Pasirinkite ofisą'},
           {model:'department_id',options:'departments',label:'Skyriai',placeholder:'Pasirinkite skyrių'},
           {model:'division_id',options:'divisions',label:'Padaliniai',placeholder:'Pasirinkite padalinį'},
           {model:'group_id',options:'groups',label:'Grupės',placeholder:'Pasirinkite grupę'},
           ]
        };
    },
    methods:{
       async GetCompanies(direction)
       {
            let response
            if(this.selection.office_id !=='')
            {
                response = (await this.$GetCollection({Collection:'companies_offices',ItemsPerPage:'All',
                query:{
                    filter:`office_id='${this.selection.office_id}'`,
                    expand:'company_id'
                }})).items
            }
            else
            {
                const string = []
                for(const option of this.options.offices)
                {
                    string.push(`office_id='${option.id}'`)
                }
                response = (await this.$GetCollection({Collection:'companies_offices',ItemsPerPage:'All',
                query:{
                    filter:string.join('||'),
                    expand:'company_id'
                }})).items
            }
            const arr = []
            for(const item of response )
            {
                arr.push(item.expand.company_id)
            }
            this.options.companies = this.FilterArray(arr)
       },
       async GetOffices(direction)
       { 
            let response 
            if(direction === 'down')
            {
                if(this.selection.company_id !== '')
                {
                    response = (await this.$GetCollection({Collection:'companies_offices',ItemsPerPage:'All',
                    query:{
                        filter:`company_id='${this.selection.company_id}'`,
                        expand:'office_id'
                    }})).items
                }
                else
                {
                    const string = []
                    for(const option of this.options.companies)
                    {
                        string.push(`company_id='${option.id}'`)
                    }
                    response = (await this.$GetCollection({Collection:'companies_offices',ItemsPerPage:'All',
                    query:{
                        filter:string.join('||'),
                        expand:'office_id'
                    }})).items
                }
                
                const arr = []
                for(const item of response )
                {
                    arr.push(item.expand.office_id)
                }
                this.options.offices = this.FilterArray(arr)

                this.GetDivisions('down')
            }
            if(direction === 'up')
            {
                if(this.selection.division_id!== '')
                {
                    response = (await this.$GetCollection({Collection:'offices_divisions',ItemsPerPage:'All',
                    query:{
                        filter:`division_id='${this.selection.division_id}'`,
                        expand:'office_id'
                    }})).items
                }
                else
                {
                    const string = []
                    for(const option of this.options.divisions)
                    {
                        string.push(`division_id='${option.id}'`)
                    }
                    response = (await this.$GetCollection({Collection:'offices_divisions',ItemsPerPage:'All',
                    query:{
                        filter:string.join('||'),
                        expand:'office_id'
                    }})).items
                }
                const arr = []
                for(const item of response )
                {
                    arr.push(item.expand.office_id)
                }
                this.options.offices = this.FilterArray(arr)
                this.GetCompanies()
            }
       },
       async GetDivisions(direction)
       {
            let response
            if(direction === 'down')
            {
                if(this.selection.office_id !=='')
                {
                    response = (await this.$GetCollection({Collection:'offices_divisions',ItemsPerPage:'All',
                    query:{
                        filter:`office_id='${this.selection.office_id}'`,
                        expand:'division_id'
                    }})).items  
                }
                else
                {
                    const string = []
                    for(const option of this.options.offices)
                    {
                        string.push(`office_id='${option.id}'`)
                    }
                    response = (await this.$GetCollection({Collection:'offices_divisions',ItemsPerPage:'All',
                    query:{
                        filter:string.join('||'),
                        expand:'division_id'
                    }})).items  
                }

                const arr = []
                for(const item of response )
                {
                    arr.push(item.expand.division_id)
                }
                this.options.divisions = this.FilterArray(arr)
                this.GetDepartments('down')
            }
            if(direction === 'up')
            {
                if(this.selection.department_id !== '')
                {
                    response = (await this.$GetCollection({Collection:'divisions_departments',ItemsPerPage:'All',
                    query:{
                        filter:`department_id='${this.selection.department_id}'`,
                        expand:'division_id'
                    }})).items
                }
                else
                {
                    const string = []
                    for(const option of this.options.departments)
                    {
                        string.push(`department_id='${option.id}'`)
                    }
                    response = (await this.$GetCollection({Collection:'divisions_departments',ItemsPerPage:'All',
                    query:{
                        filter:string.join('||'),
                        expand:'division_id'
                    }})).items
                }

                const arr = []
                for(const item of response )
                {
                    arr.push(item.expand.division_id)
                }
                this.options.divisions = this.FilterArray(arr)
                this.GetOffices('up')
            }
       },
       async GetDepartments(direction)
       {
            let response
            if(direction === 'down')
            {
                if(this.selection.division_id!=='')
                {
                    response = (await this.$GetCollection({Collection:'divisions_departments',ItemsPerPage:'All',
                    query:{
                        filter:`division_id='${this.selection.division_id}'`,
                        expand:'department_id'
                    }})).items
                }
                else
                {
                    const string = []
                    for(const option of this.options.divisions)
                    {
                        string.push(`division_id='${option.id}'`)
                    }
                    response = (await this.$GetCollection({Collection:'divisions_departments',ItemsPerPage:'All',
                    query:{
                        filter:string.join('||'),
                        expand:'department_id'
                    }})).items
                }

                const arr = []
                for(const item of response )
                {
                    arr.push(item.expand.department_id)
                }
                this.options.departments = this.FilterArray(arr)
                this.GetGroups('down')
            }
            if(direction === 'up')
            {
                if(this.selection.group_id !=='')
                {
                    response = (await this.$GetCollection({Collection:'departments_groups',ItemsPerPage:'All',
                    query:{
                        filter:`grouo_id='${this.selection.group_id}'`,
                        expand:'deparment_id'
                    }})).items
                }
                else
                {
                    const string = []
                    for(const option of this.options.groups)
                    {
                        string.push(`group_id='${option.id}'`)
                    }
                    response = (await this.$GetCollection({Collection:'departments_groups',ItemsPerPage:'All',
                    query:{
                        filter:string.join('||'),
                        expand:'deparment_id'
                    }})).items
                }
                const arr = []
                for(const item of response )
                {
                    arr.push(item.expand.department_id)
                }
                this.options.departments = this.FilterArray(arr)
                this.GetDivisions('up')
            }
       },
       async GetGroups()
       {
            let response
            if(this.selection.department_id !== '')
            {
                response = (await this.$GetCollection({Collection:'departments_groups',ItemsPerPage:'All',
                query:{
                    filter:`department_id='${this.selection.department_id}'`,
                    expand:'group_id'
                }})).items
            }
            else
            {
                const string = []
                for(const option of this.options.departments)
                {
                    string.push(`department_id='${option.id}'`)
                }
                response = (await this.$GetCollection({Collection:'departments_groups',ItemsPerPage:'All',
                query:{
                    filter:string,
                    expand:'group_id'
                }})).items
            }
            const arr = []
            for(const item of response )
            {
                arr.push(item.expand.group_id)
            }
            this.options.groups = this.FilterArray(arr)
       },
       FilterArray(array)
       {
        return array.filter((obj,index,self)=>{
            return index === self.findIndex(item=>item.id===obj.id)
        })
       }
    },
    watch:{
        async 'selection.company_id'(newvalue)
        {
            await this.GetOffices('down')
           
        },
        async 'selection.office_id'(newvalue)
        {
            await this.GetCompanies()

            await this.GetDivisions('down')
        },
        async 'selection.division_id'(newvalue)
        {
            
            await this.GetCompanies('up')
            await this.GetDepartments('down')
          
        },
        async 'selection.department_id'(newvalue)
        { 
            await this.GetDivisions('up')
            await this.GetGroups('down')
        },
        async 'selection.group_id'(newvalue)
        {
            await this.GetDepartments('up') 
        },
    }, 

    async created()
    {
        this.options.companies = (await this.$GetCollection({Collection:'companies',ItemsPerPage:'All'}))?.items
        this.options.offices = (await this.$GetCollection({Collection:'offices',ItemsPerPage:'All'}))?.items
        this.options.departments = (await this.$GetCollection({Collection:'departments',ItemsPerPage:'All'}))?.items
        this.options.divisions = (await this.$GetCollection({Collection:'divisions',ItemsPerPage:'All'}))?.items
        this.options.groups = (await this.$GetCollection({Collection:'groups',ItemsPerPage:'All'}))?.items
    },

    destroyed()
    {
        
    }
};
</script>
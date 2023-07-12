<template>
    <div>
        <button v-if="type === 'create'" @click="HandleClick()"
            class=" bg-custom-lightblue w-12 rounded-full p-2 px-8 flex justify-center items-center">
            <iconify-icon icon="material-symbols:add" width="32" style="color: white;"></iconify-icon>
        </button>

        <button v-else-if="type === 'delete'" @click="HandleClick()"
            class=" bg-custom-red w-12 rounded-full p-2 flex justify-center items-center">
            <iconify-icon icon="ic:baseline-delete" width="32" style="color: white;" />
        </button>

        <button v-else-if="type === 'edit'" @click="HandleClick()"
            class=" bg-custom-lightblue w-12 rounded-full p-2 flex justify-center items-center">
            <iconify-icon icon="mi:edit" width="32" style="color: white;" />
        </button>
    </div>
</template>
    
<script>
import CreateAccountForm from './Forms/Account/CreateAccountForm.vue'
import EditAccountForm from './Forms/Account/EditAccountForm.vue'
import DeleteAccountForm from './Forms/Account/DeleteAccountForm.vue'

import CreateEmployeeForm from './Forms/Employee/CreateEmployeeForm.vue'
import EditEmployeeForm from './Forms/Employee/EditEmployeeForm.vue'
import DeleteEmployeeForm from './Forms/Employee/DeleteEmployeeForm.vue'

import CreateCompanyForm from './Forms/Company/CreateCompanyForm.vue'
import EditCompanyForm from './Forms/Company/EditCompanyForm.vue'
import DeleteCompanyForm from './Forms/Company/DeleteCompanyForm.vue'

import CreateOfficeForm from './Forms/Office/CreateOfficeForm.vue'
import EditOfficeForm from './Forms/Office/EditOfficeForm.vue'
import DeleteOfficeForm from './Forms/Office/DeleteOfficeForm.vue'

import CreateDivisionForm from './Forms/Division/CreateDivisionForm.vue'
import EditDivisionForm from './Forms/Division/EditDivisionForm.vue'
import DeleteDivisionForm from './Forms/Division/DeleteDivisionForm.vue'

import CreateGroupForm from './Forms/Group/CreateGroupForm.vue'
import EditGroupForm from './Forms/Group/EditGroupForm.vue'
import DeleteGroupForm from './Forms/Group/DeleteGroupForm.vue'

import CreateDepartmentForm from './Forms/Department/CreateDepartmentForm.vue'
import EditDepartmentForm from './Forms/Department/EditDepartmentForm.vue'
import DeleteDepartmentForm from './Forms/Department/DeleteDepartmentForm.vue'

import { mapActions } from 'vuex';
export default {
    components:{},
    props: {
       type:{
        type:String,
        required:true,
       },
       id:{
        type:String,
       },
       collection:{
        type:String,
        required:true
       },
    },
    methods: {
        ...mapActions({
            open:'Modal/open',
            set_component:'Modal/set_component',
            set_id:'Form/set_id',
            set_collection:'Form/set_collection',
            set_type:'Form/set_type',
        }),
        HandleClick()
        {
            switch (this.type) {
                case 'create':
                    this.CreateForm()
                    break;
                case 'edit':
                    this.EditForm()
                    break
                case 'delete':
                    this.DeleteForm()
                    break
                default:
                    break;
            }
            this.set_id(this.id)
            this.set_collection(this.collection)
            this.set_type(this.type)
            this.open()
        },
        CreateForm()
        {
            switch(this.collection)
            {
                case 'employees':
                    this.set_component(CreateEmployeeForm)
                    break
                case 'users':
                    this.set_component(CreateAccountForm)
                    break
                case 'companies':
                    this.set_component(CreateCompanyForm)
                    break
                case 'offices':
                    this.set_component(CreateOfficeForm)
                    break
                case 'groups':
                    this.set_component(CreateGroupForm)
                    break;
                case 'divisions':
                    this.set_component(CreateDivisionForm)
                    break
                case 'departments':
                    this.set_component(CreateDepartmentForm)
                    break
            }
        },
        EditForm()
        {
            switch(this.collection)
            {
                case 'employees':
                    this.set_component(EditEmployeeForm)
                    break
                case 'users':
                    this.set_component(EditAccountForm)
                    break
                case 'companies':
                    this.set_component(EditCompanyForm)
                    break
                case 'offices':
                    this.set_component(EditOfficeForm)
                    break
                case 'groups':
                    this.set_component(EditGroupForm)
                    break;
                case 'divisions':
                    this.set_component(EditDivisionForm)
                    break
                case 'departments':
                    this.set_component(EditDepartmentForm)
                    break
            }
        },
        DeleteForm()
        {
            switch(this.collection)
            {
                case 'employees':
                    this.set_component(DeleteEmployeeForm)
                    break
                case 'users':
                    this.set_component(DeleteAccountForm)
                    break
                case 'companies':
                    this.set_component(DeleteCompanyForm)
                    break
                case 'offices':
                    this.set_component(DeleteOfficeForm)
                    break
                case 'groups':
                    this.set_component(DeleteGroupForm)
                    break;
                case 'divisions':
                    this.set_component(DeleteDivisionForm)
                    break
                case 'departments':
                    this.set_component(DeleteDepartmentForm)
                    break
            }
        },
    },

}
</script>

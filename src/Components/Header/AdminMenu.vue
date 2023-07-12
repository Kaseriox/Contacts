<template>
    <div class="flex flex-row justify-evenly text-custom-white text-2xl">
        <div @click="PushRoute('/')" class=" hover:text-blue-400 cursor-pointer">Kontaktai</div>
        <div @click="PushRoute('/Structure','Company')" class=" hover:text-blue-400 cursor-pointer">Įmonės</div>
        <div @click="PushRoute('/Structure','Group')" class=" hover:text-blue-400 cursor-pointer">Grupės</div>
        <div @click="PushRoute('/Structure','Division')" class=" hover:text-blue-400 cursor-pointer">Divizijos</div>
        <div @click="PushRoute('/Structure','Department')" class=" hover:text-blue-400 cursor-pointer">Departamentai</div>
        <div @click="PushRoute('/Structure','Office')" class=" hover:text-blue-400 cursor-pointer">Ofisai</div>
        <div @click="PushRoute('/Account')" class=" hover:text-blue-400 cursor-pointer">Paskyros</div>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex';
import CompanyManage from '../Manage/CompanyManage/CompanyManage.vue'
import OfficeManage from '../Manage/OfficeManage/OfficeManage.vue'
import DepartmentManage from '../Manage/DepartmentManage/DepartmentManage.vue'
import DivisionManage from '../Manage/DivisionManage/DivisionManage.vue'
import GroupManage from '../Manage/GroupManage/GroupManage.vue'
export default {

    methods:{
        ...mapActions({
            set_component:'StructurePage/set_component'
        }),
    PushRoute(route,component=undefined)
    {
        if(this.$route.path !== route)
        {
            this.$router.push(route)
        }
        switch(component)
        {
            case 'Company':
                this.set_component(CompanyManage)
                break;
            case 'Group':
                this.set_component(GroupManage)
                break;
            case 'Division':
                this.set_component(DivisionManage)
                break;
            case 'Department':
                this.set_component(DepartmentManage)
                break;
            case 'Office':
                this.set_component(OfficeManage)
                break;
        }
    }
},
};
</script>
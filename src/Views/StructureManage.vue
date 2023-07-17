<template>
    <div>
          <Header/>
          <div class=" flex justify-center w-full">
              <ul class="flex m-5 text-custom-white bg-custom-blue text-2xl">
                <li class="mr-2" v-for="item in tabs" :key=item.label>
                  <div v-if="item.component === Component" @click="ChangeComponent(item.component)" class=" inline-block p-4 text-blue-400 cursor-pointer">{{item.label}}</div>
                  <div v-else @click="ChangeComponent(item.component)" class=" inline-block p-4 hover:text-blue-400 cursor-pointer">{{item.label}}</div>
                </li>
              </ul> 
          </div> 
          <div class=" px-32 py-10">
            <component :is="Component"/>
          </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import Contacts from '../Components/Contacts/Contacts.vue';
  import Header from '../Components/Header/Header.vue';
  import OfficeManage from '../Components/Manage/OfficeManage/OfficeManage.vue'
  import DepartmentManage from '../Components/Manage/DepartmentManage/DepartmentManage.vue'
  import DivisionManage from '../Components/Manage/DivisionManage/DivisionManage.vue'
  import GroupManage from '../Components/Manage/GroupManage/GroupManage.vue'
  export default {
  components: { Contacts, Header},
  data()
  {
    return{
      tabs:[
        {label:'Padaliniai',component:DivisionManage},
        {label:'Skyriai',component:DepartmentManage},
        {label:'Grupės',component:GroupManage},
        {label:'Ofisai',component:OfficeManage}]
    }
  },
    computed:{
      ...mapGetters({
        Component:'StructurePage/Component',
        user_data:'User/Data'
      })
    },
    methods:{
      ...mapActions({
        set_component:'StructurePage/set_component'
      }),
      ChangeComponent(component)
      {
        this.set_component(component)
      }
    },
    mounted()
    {
      if(this.Component === undefined)
      {
        this.set_component(GroupManage)
      }
    },
  };
  </script>
  
  <style>
  
  </style>
  
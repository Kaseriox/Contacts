<template>
    <div>
          <Header/> 
          <div class=" px-32 py-10">
            <component :is="Component"/>
          </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import Contacts from '../Components/Contacts/Contacts.vue';
  import Header from '../Components/Header/Header.vue';
  import GroupManage from '../Components/Manage/GroupManage/GroupManage.vue';
  export default {
  components: { Contacts, Header},
    computed:{
      ...mapGetters({
        Component:'StructurePage/Component'
      })
    },
    methods:{
      ...mapActions({
        set_component:'StructurePage/set_component'
      })
    },
    created()
    {
      if(this.Component === undefined)
      {
        this.set_component(GroupManage)
      }
    }
  };
  </script>
  
  <style>
  
  </style>
  
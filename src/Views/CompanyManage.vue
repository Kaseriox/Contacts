<template>
    <div>
          <Header/>
          <div class=" px-32 py-10">
            <CompanyManage/>
          </div>
    </div>
  </template>
  
  <script>
  import Header from '../Components/Header/Header.vue';
  import CompanyManage from '../Components/Manage/CompanyManage/CompanyManage.vue'
  export default {
  components: {CompanyManage,  Header},
  };
  </script>
  
  
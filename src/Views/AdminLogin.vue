<template>
  <div class="w-full h-full flex justify-center items-center bg-blue-900 p-28">
      <component @ChangeComponent="ChangeComponent" :is="Component"/>
  </div>
</template>

<script>
import AdminLogin from '../Components/Login/AdminLogin.vue';
import RemindPassword from '../Components/Login/RemindPassword.vue';
  export default {
    components:{AdminLogin,RemindPassword},
    data(){
      return{
        Component:AdminLogin
      }
    },
    methods:{
      ChangeComponent()
      {
        if(this.Component === AdminLogin)
        {
          this.Component = RemindPassword
          return
        }
        this.Component = AdminLogin
      }
    }
  };
</script>

<style scoped>

</style>
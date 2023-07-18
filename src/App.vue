<template>
  <div class="w-full h-full">
    <router-view/>
    <ModalWindow/>   
    <Notification class="fixed right-5 top-5 z-50 w-96"/>
  </div>

</template>

<script>
import ModalWindow from './Components/Modal/ModalWindow.vue';
import Notification from './Components/Notification/Notification.vue';
import { mapActions } from 'vuex';
export default {
  components: {ModalWindow,Notification},
  methods:{
    ...mapActions({
      set_user_data:'User/set_data',
      set_message:'Notification/set_data',
      set_status:'Status/set_status'
    }),
  },
  async beforeCreate()
  {
    if(await this.$GetStatus() !== null)
    {
      this.set_status('online')
      this.set_user_data(await this.$CheckAuth())
      
    }
    else
    {
      this.set_message({message:'Serveris neatsako',type:'error'})
    }
  }
};
</script>

<style>
html{
  height: 100%;
  width: 100%;
}
body{
  height: 100%;
  width: 100%;
}
</style>

<template>
    <button @click="ChangeView()" class=" bg-custom-lightblue w-12 rounded-full p-2 px-8 flex justify-center items-center mr-6">
      <iconify-icon v-if="ViewIcon==='Table'" icon="material-symbols:list" style="color: white;" width="32"></iconify-icon>
      <iconify-icon v-else icon="material-symbols:person" style="color: white;" width="32"></iconify-icon>
    </button>
</template>
  
<script>
export default {
    data() {
        return {
            ViewIcon:'Table'
        };
    },
    methods:{
    ChangeView()
      {
        this.$emit('ChangeView')
        if(this.ViewIcon==='Table')
        {
          this.ViewIcon='Person'
          return
        }
        this.ViewIcon='Table'
      }
    },

};
</script>
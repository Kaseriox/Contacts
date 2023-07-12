<template>
  <div>
    <Header/>
    <div class=" px-32 py-10">
        <Details :id="id"/>
    </div>
  </div>
</template>

<script>
import Details from '../Components/DetailedContact/Details.vue';
import Header from '../Components/Header/Header.vue';
export default {
  components: { Details, Header },
  data()
  {
    return{
      id:this.$route.params.id,
    }
  },
 

};
</script>

<style>

</style>

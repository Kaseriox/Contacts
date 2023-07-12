<template>
  <div>
        <Header/> 
        <div class=" px-32 py-10">
          <Contacts/>
        </div>
  </div>
</template>

<script>
import Contacts from '../Components/Contacts/Contacts.vue';
import Header from '../Components/Header/Header.vue';
export default {
components: { Contacts, Header },

};
</script>

<style>

</style>

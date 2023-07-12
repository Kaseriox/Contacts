<template>
    <div>
    <Header />
    <div class=" px-32 py-10">
      <AccountManage/>
    </div>
  </div>
</template>

<script>
import Header from '../Components/Header/Header.vue'
import AccountManage from '../Components/Manage/AccountManage/AccountManage.vue';
export default {
  components: {AccountManage,Header},
};
</script>

<style>

</style>

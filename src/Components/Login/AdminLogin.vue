<template>
  <div>

        <form class="bg-white flex flex-col h-1/2" @submit.prevent="HandleForm">
          <div class=" p-24 pt-14">
            <p class=" text-5xl pb-14">Admin prisijungimas:</p>
              <div>
                <Input class=" text-2xl" v-model="Login.Email" :label="'Elektroninis paštas'" :icon="{type:'material-symbols:mail',size:24}" :placeholder="'Įveskite el. pašto adresą...'" />
                <Input class="text-2xl"  v-model="Login.Password" :label="'Slaptažodis:'" :icon="{type:'teenyicons:lock-solid',size:24}" :placeholder="'Įveskite slaptažodį...'" :hidden="true"/>
              </div>
              <div class=" flex justify-center flex-row mb-14">
                <p class="text-lg mr-1">Pamiršote slaptažodį? </p>
                <p @click="ChangeComponent" class="text-lg font-bold text-blue-800 cursor-pointer">Pakeisti slaptažodį</p>
              </div>
            <div class="flex justify-center">
              <button type="submit" class="bg-blue-700  text-white font-bold text-2xl py-2 px-32 border border-blue-700 rounded">
                Prisijungti
              </button>
            </div>
  
          </div>
        </form>

        <div>
            <button @click="Back" class=" bg-white fixed left-16 top-16 rounded-full p-4"><img  src="../../assets/svg/Back.svg"/></button>
        </div>
        
      </div>
  </template>
  
  <script>
import { mapActions } from 'vuex';
import Input from '../InputField/InputField.vue'
    export default {
      components:{Input},
      data(){
        return{
          Login:{
            Email:'',
            Password:''
          }
        }
      },
      methods:{
        ...mapActions({
          set_user_data:'User/set_data'
        }),
        async HandleForm()
        {
          const Login = await this.$Authenticate(this.Login)
          if(Login)
          {
            this.$router.push('/')
            this.set_user_data(Login)
          }
          else
          {
            console.log('failed')
          }
        },
        ChangeComponent()
        {
          this.$emit('ChangeComponent')
        },
        Back()
        {
          this.$router.push('/')
        }
      },
  
    };
  </script>
  
  <style scoped>
  
  </style>
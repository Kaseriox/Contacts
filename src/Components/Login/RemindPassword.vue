<template>
    <div>
        <form novalidate class="bg-white flex flex-col h-1/2" @submit.prevent="HandleForm">
          <div class=" p-24 pt-14">
            <p class=" text-5xl pb-14">Priminti slaptažodį:</p>
              <div>
                <div class=" mb-14">
                  <p class=" text-lg px-2">Elektroninis paštas:</p>
                  <Input class=" text-2xl" v-model="Email" :icon="'mail'" :placeholder="'Įveskite el. pašto adresą...'" />
                </div>
  
              </div>
            <div class="flex justify-center">
              <button type="submit" class="bg-blue-700  text-white font-bold text-2xl py-2 px-32 border border-blue-700 rounded">
                Pateikti
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
  import Input from '../InputField/InputField.vue'
  import { mapActions } from 'vuex';
    export default {
      components:{Input},
      data(){
        return{
          Email:''
        }
      },
      methods:{
        ...mapActions({
          set_message:'Notification/set_data'
        }),
        async HandleForm()
        {
          const Reset = await this.$PasswordReset(this.Email)
          if(Reset.status === 400)
          {
            this.set_message({message:'Blogas Elektroninis paštas',type:'error'})
            return
          }
          if(Reset.status === 0)
          {
            this.set_message({message:'Serveris neatsako',type:'error'})
            return
          }
          if(Reset.token !== undefined)
          {
              this.set_message({message:'Slaptažodžio pakeitimas žinutė sėkmingai išsiųsta',type:'success'})
          }
        },
        Back()
        {
            this.$emit('ChangeComponent')
        }
      },
  
    };
  </script>
  
  <style scoped>
  
  </style>
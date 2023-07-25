<template>
    <div v-if="Data">
        <p class=" font-thin text-6xl mb-20">Detalesnė kontakto informacija:</p>     
        <div class="flex flex-row items-center mb-6">
          <iconify-icon v-if="!Data.photo" icon="gg:profile" width="96"/>
          <img v-else  class=" w-24"  :src="`http://127.0.0.1:8090/api/files/${Data.collectionId}/${Data.id}/${Data.photo}?thumb=96x96`" />
            <div class="flex flex-col ml-4 overflow-hidden">
                <p class=" text-5xl whitespace-nowrap">{{Data.name}} {{ Data.surname }}</p>
                <p class=" text-4xl whitespace-nowrap ove">Pozicija: {{ Data.position }}</p>
            </div>
        </div>
        <div class="p-6 shadow-md shadow-custom-gray">
            <div class=" m-6 grid grid-cols-2 gap-x-10">
                <div class=" space-y-6 text-2xl">   
                    <p class="text-3xl border-b-2 overflow-hidden">Kontaktinės detalės:</p>
                    <p class="whitespace-nowrap overflow-hidden">Elektroninis paštas: {{ Data.email }}</p>
                    <p class="whitespace-nowrap overflow-hidden">Telefono numeris: {{ Data.phone_number }}</p>
                </div>
                <div class=" space-y-6 text-2xl">
                    <p class="text-3xl border-b-2 whitespace-nowrap overflow-hidden">Kompanijos detalės:</p>
                    <p class="whitespace-nowrap overflow-hidden">Kompanija: {{ Data.expand.company_id ? Data.expand.company_id.name : "Nėra įmonės"  }}</p>
                    <p class="whitespace-nowrap overflow-hidden">Būstinė: {{ Data.expand.office_id ? Data.expand.office_id.name : "Nėra ofiso" }}</p>
                    <p class="whitespace-nowrap overflow-hidden">Padalinys: {{ Data.expand.division_id ? Data.expand.division_id.name : 'Nėra padalinio' }}</p>
                    <p class="whitespace-nowrap overflow-hidden">Skyrius: {{ Data.expand.department_id ? Data.expand.department_id.name : 'Nėra skyriaus' }}</p>
                    <p class="whitespace-nowrap overflow-hidden">Grupė: {{ Data.expand.group_id ? Data.expand.group_id.name :'Nėra grupės' }}</p>
                </div>
            </div>
          </div>
    </div>
</template>
  
  <script>

  export default {
    components: {},
    props:{
        id:{
            type:String,
            required:true
        }
    },
    data()
    {
      return{
        Data:undefined
      }
    },
    methods:{
      async GetData()
      {
        this.Data = (await this.$GetCollection(
            {
              Collection:"employees",
              query:{
                expand:"office_id,company_id,department_id,division_id,group_id",
                filter:`id='${this.id}'`
              }
            }
          )).items[0]
      }

    },
    created()
    {
      this.GetData()
    }
  };
  </script>
  
  <style>
  
  </style>
  
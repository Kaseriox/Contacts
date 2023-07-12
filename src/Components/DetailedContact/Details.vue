<template>
    <div v-if="Data">
        <p class=" font-thin text-6xl mb-20">Detalesnė kontakto informacija:</p>     
        <div class="flex flex-row items-center mb-6">
          <iconify-icon v-if="!Data.photo" icon="gg:profile" width="96"/>
          <img v-else  class=" w-24"  :src="`http://127.0.0.1:8090/api/files/${Data.collectionId}/${Data.id}/${Data.photo}?thumb=96x96`" />
            <div class="flex flex-col ml-4">
                <p class=" text-5xl">{{Data.name}} {{ Data.surname }}</p>
                <p class=" text-4xl">Pozicija: {{ Data.position }}</p>
            </div>
        </div>
        <div class="p-6 shadow-md shadow-custom-gray">
            <div class=" m-6 grid grid-cols-2">
                <div class=" space-y-6 text-2xl">   
                    <p class="text-3xl border-b-2">Kontaktinės detalės:</p>
                    <p>Elektroninis paštas: {{ Data.email }}</p>
                    <p>Telefono numeris: {{ Data.phone_number }}</p>
                </div>
                <div class=" space-y-6 text-2xl">
                    <p class="text-3xl border-b-2">Kompanijos detalės:</p>
                    <p>Kompanija: {{ Data.expand.company_id ? Data.expand.company_id.name : "No Company"  }}</p>
                    <p>Būstinė: {{ Data.expand.office_id ? Data.expand.office_id.name : "No Office" }}</p>
                    <p>Departamentas: {{ Data.expand.department_id ? Data.expand.department_id.name : 'No Department' }}</p>
                    <p>Divizija: {{ Data.expand.division_id ? Data.expand.division_id.name : 'No Division' }}</p>
                    <p>Grupė: {{ Data.expand.group_id ? Data.expand.group_id.name :'No Group' }}</p>
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
  
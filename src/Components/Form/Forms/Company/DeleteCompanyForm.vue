<template>
    <div class="m-8 overflow-hidden">
       <p class=" text-4xl mb-4">Ar tikrai norite ištrinti įmonę?</p>
       <template v-if="Data">
            <div class="text-xl whitespace-nowrap">
                <div>Įmonės pavadinimas: {{ Data.name }}</div>
            </div>
        </template>
       <div class="flex flex-row-reverse text-3xl text-blue-900 font-bold">
            <p @click="HandleForm('Yes')" class=" cursor-pointer">Taip</p>
            <p @click="HandleForm('No')" class=" cursor-pointer mr-9">Ne</p>
       </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data()
    {
      return{
        Data:undefined
      }
    },
methods:{
   ...mapActions({
       Close:"Modal/close",
       set_message:'Notification/set_data',
       refresh:"Refresh/refresh"
   }),
   async HandleForm(Response)
   {
       if(Response === 'No')
       {
           this.Close()
       }
       if(Response === 'Yes')
       {
            const response = await this.$DeleteRecord({Collection:'companies',id:this.id})
            if(response!==null)
            {
                this.set_message({message:'Sėkmingai panaikinta įmonė',type:'success'})
                this.refresh()
                this.Close()
                return
            }
            this.set_message({message:'Nepavyko panaikinti įmonės',type:'error'})
       }
   },
},
computed:{
    ...mapGetters({
        id:'Form/id',
    })

},
async created()
{
    this.Data = (await this.$GetSingleRecord({Collection:'companies',id:this.id}))
}
}
</script>
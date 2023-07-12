<template>
    <div class="m-8">
       <p class=" text-5xl mb-4">Ar tikrai norite ištrinti diviziją?</p>
       <template v-if="Data">
            <div class="text-xl">
                    <div class="flex flex-row">
                        <p class="mr-1">Divizijos pavadinimas: </p>
                        <p class="mr-1">{{ Data.name }}</p>
                    </div>
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
            const response = await this.$DeleteRecord({Collection:'divisions',id:this.id})
            if(response)
            {
                this.set_message({message:'Succesfully Deleted Division',type:'success'})
                this.refresh()
                this.Close()
                return
            }
            this.set_message({message:'Failed To Delete Division',type:'error'})
       }
   },
   async GetData()
   {
        this.Data = await this.$GetSingleRecord({Collection:'divisions',id:this.id})
   }
},
computed:{
    ...mapGetters({
        id:'Form/id'
    })

},
created()
{
    this.GetData()
}
}
</script>
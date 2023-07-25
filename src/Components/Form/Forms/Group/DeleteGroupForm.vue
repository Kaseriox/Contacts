<template>
    <div class="m-8 overflow-hidden">
       <p class=" text-5xl mb-4">Ar tikrai norite ištrinti grupę?</p>
       <template v-if="Data">
            <div class="text-xl whitespace-nowrap">
                <div>Grupės pavadinimas: {{ Data.name }}</div>
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
       set_message:"Notification/set_data",
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
            let response = await this.$GetCollection({Collection:'employees',ItemsPerPage:'All',query:{
                filter:`group_id='${this.id}'`
            }})
            if(response.totalItems !== 0)
            {
                this.set_message({message:'Grupė priklauso vienam ar daugiau kontaktų',type:'error'})
                return
            }

            response = await this.$DeleteRecord({Collection:'groups',id:this.id})
            if(response !== null)
            {
                this.set_message({message:'Sėkmingai panaikinta grupė',type:'success'})
                this.refresh()
                this.Close()
                return
            }
            this.set_message({message:'Nepavyko panaikinti grupės',type:'error'})
       }
   },
   async GetData()
   {
        this.Data = await this.$GetSingleRecord({Collection:'groups',id:this.id})
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
<template>
    <div class="m-8">
       <p class=" text-4xl mb-4">Ar tikrai norite ištrinti kontaktą?</p>
       <template v-if="Data">
            <div class="text-xl">
                    <p>Paskyros vardas: {{ Data.name }} </p>
                    <p>Elektroninis paštas: {{ Data.email }}</p>
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
            
            let response = await this.$DeleteRecord({Collection:'users',id:this.id})
            response = await this.$DeleteRecord({Collection:'user_permissions',id:this.Data.permissions_id})
            if(response)
            {
                this.set_message({message:'Succesfully Deleted Account',type:'success'})
                this.refresh()
                this.Close()
                return
            }
            this.set_message({message:'Failed To Delete Account',type:'error'})
       }
   },
   async GetData()
   {
        this.Data = await this.$GetSingleRecord({Collection:'users',id:this.id})
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
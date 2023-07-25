<template>
    <div v-if="Data" class=" card rounded overflow-hidden shadow-md shadow-custom-gray text-base px-6 py-4 mr-8">
            <div class=" flex flex-row mb-2 items-center h-[80px]">
                <iconify-icon v-if="!Data.photo" icon="gg:profile" width="48"/>
                <img v-else  class=" w-12"  :src="`http://127.0.0.1:8090/api/files/${Data.collectionId}/${Data.id}/${Data.photo}?thumb=48x48`" />
                <div class="flex flex-col ml-3">
                    <router-link :to="`/Contact/` + Data.id"><div class=" overflow-hidden whitespace-nowrap text-xl font-bold text-custom-lightblue">{{Data["Vardas ir pavardė"]}}</div></router-link>
                    <div class=" whitespace-nowrap overflow-hidden">Pozicija: {{ Data["Pozicija"] }}</div>
                </div>
            </div>
            <div class="mb-2">
                <div class=" whitespace-nowrap overflow-hidden">Telefono nr: {{ Data["Telefono numeris"] }}</div>
                <div class=" whitespace-nowrap overflow-hidden"> El. paštas: {{Data["Elektroninis paštas"]}}</div>
                <div class=" whitespace-nowrap overflow-hidden">Adresas: {{ Data["Adresas"] }}</div>
            </div>    
            <div v-if="user_data?.expand.permissions_id?.delete_employees || user_data?.expand.permissions_id?.edit_employees" class="flex flex-row mt-4 space-x-4">
                <FormButton v-if="user_data?.expand.permissions_id?.edit_employees" :id="Data.id" :type="'edit'" :collection="Data.collection" />
                <FormButton v-if="user_data?.expand.permissions_id?.delete_employees" :id="Data.id" :type="'delete'" :collection="Data.collection"/>
            </div>
    </div>
</template>
  
<script>
import {mapGetters} from 'vuex'
import FormButton from '../../../Form/FormButton.vue';
export default {
    components: { FormButton},
    props:{
        Data:{
            type:Object,
            required:true
        }
    },
    data() {
        return {
        };
    },
    methods:{

    },
    computed:{
        ...mapGetters({
            user_data:'User/Data'
        })
    },
};
</script>
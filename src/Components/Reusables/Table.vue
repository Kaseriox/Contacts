<template>
    <div class="relative overflow-x-auto">
        <table class="w-full text-base text-left">
            <thead class="text-xs bg-custom-lightgray">
                <tr>
                    <th scope="col" class="px-6 py-3" v-for="field in fields" :key="field">
                        {{ field }}
                    </th>
                    <th v-if="permissions?.edit || permissions?.delete" scope="col" class="px-6 py-3">
                        Veiksmai
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class=" bg-custom-white border-b" v-for="record in data" :key="record.id">
                    <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap" v-for="field in fields" :key="field">
                        {{ record[field] }}
                    </th>
                    <th  scope="row" class="bg-custom-white border-b flex flex-row space-x-4">
                        <FormButton v-if="permissions?.edit" :type="'edit'" :collection="record.collection" :id="record.id" />
                        <FormButton v-if="permissions?.delete" :type="'delete'" :collection="record.collection" :id="record.id"/>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
import FormButton from '../Form/FormButton.vue'
export default {
components: {FormButton},
props:{
    data:{
        type:Array,
        required:true
    },
    fields:{
        type:Array,
        required:true
    },
    permissions:{
        type:Object,
        required:true
    }
}
};
</script>

<style>

</style>
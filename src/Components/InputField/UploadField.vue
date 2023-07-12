<template>
    <div class="flex justify-center flex-col">
        <input :disabled="!open" type="file" accept="image/jpeg" @change="$emit('input',$event.target.files[0])" ref="FileUpload" id="File-Upload" hidden/>
        <label v-if="open" for="File-Upload"  class="p-3 w-full rounded-md text-left text-white text-base bg-blue-700 cursor-pointer">ĮKELTI NUOTRAUKĄ</label>
        <label v-else for="File-Upload"  class="p-3 w-full rounded-md text-left text-white text-base bg-slate-500">ĮKELTI NUOTRAUKĄ</label>
        <div v-if="value" class="flex flex-row mt-1">
            <div  class=" max-w-xs overflow-hidden whitespace-nowrap mx-4">File name: {{ value.name ?? value }}</div>
            <button v-if="open" @click="DeletePhoto()" class=" bg-custom-blue rounded h-6">
                <iconify-icon icon="material-symbols:close" height="24" style="color: white;"></iconify-icon>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        value:{},
        open:{
            type:Boolean,
            default:true
        }
    },
    methods:{
        DeletePhoto()
        {
            this.$refs.FileUpload.value = null
            this.$emit('input','')
        }
    },
};
</script>
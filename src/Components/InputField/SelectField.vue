<template>
    <div>
        <p>{{ label }}</p>
        <select :disabled="!open" class="w-full border rounded-lg p-3 " :value="value" @input="$emit('input',$event.target.value)">
            <option value='' selected>{{placeholder}}</option>
            <option v-for="Item in options" :key="Item.id" :value="Item.id">{{ Item.name }}</option>
        </select>
        <div v-if="error" class="text-center text-custom-red">{{error}}</div>
    </div>
</template>

<script>
export default {
    props:{
        value:{
            required:true,
        },
        label:{
            type:String,
            required:true,
        },
        placeholder:{
            type:String,
            required:true
        },
        options:{
            type:Array,
            required:true
        },
        open:{
            type:Boolean,
            default:true
        }
    },
    data()
    {
        return{
            error:false
        }
    }
};
</script>
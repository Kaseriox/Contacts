<template>
        <div @click="focusInput" class=" cursor-text">
            <p v-if="label">{{ label }}</p>
            <div class=" bg-custom-lightgray flex flex-row items-center p-3">
                <iconify-icon :icon="`${icon.type}`" :height="icon.size" />
                <input :disabled="!open" ref="inputField"  :type="type" :value="value" @input="$emit('input',$event.target.value)" class="bg-custom-lightgray focus:outline-none pl-2 w-full" :placeholder="placeholder">
                <iconify-icon class=" cursor-pointer" @click="switchVisibility()" v-if="hidden" :icon="`${eye}`" :height="24" />
            </div>
            <div v-if="error" class="text-center text-custom-red">{{error}}</div>
        </div>
</template>
  
<script>
export default {
    props:{
        icon:{
            default()
            {
                return {type:'',size:0}
            }
        },
        label:{
            type:String,
        },
        placeholder:{
            type:String,
        },
        hidden:{
            type:Boolean,
            default:false
        },
        value:{
            default:''
        },
        open:{
            type:Boolean,
            default:true
        }
    },
    data()
    {
        return{
            eye:'mdi:eye',
            type:'text',
            error:false,
        }
    },
    methods:{
        switchVisibility()
        {
            if(this.type === 'password')
            {
                this.type='text'
                this.eye='mdi:eye-off'
                return
            }
            this.eye='mdi:eye'
            this.type='password'
        },
        focusInput()
        {
            this.$refs.inputField.focus()
        }
    },
    created()
    {
        if(this.hidden)
        {
            this.type='password'
        }
    }
};
</script>
<template >
    <div>
       <component :is="StructureComponent"/>
    </div>
</template>
  
<script>


export default {
    components: {},  
    data() {
        return {
            StructureComponent:undefined
        };
    },
    
};
</script>
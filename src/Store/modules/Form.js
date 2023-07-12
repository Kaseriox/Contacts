export default {
    namespaced:true,
    state:{
        type:undefined,
        collection:undefined,
        id:undefined,
        },
    getters:{
        id:(state)=>
        {
            return state.id
        },
        type:(state)=>
        {
            return state.type
        },
        collection:(state)=>
        {
            return state.collection
        },
    },
    mutations:{
        SET_ID(state,payload)
        {
            state.id = payload
        },
        SET_TYPE(state,payload)
        {
            state.type = payload
        },
        SET_COLLECTION(state,payload)
        {
            state.collection = payload
        },
        RESET(state)
        {
            state.id=undefined
            state.collection=undefined
            state.type=undefined
        }
    },
    actions:{
        set_id({commit},payload)
        {
            commit('SET_ID',payload)
        },
        set_type({commit},payload)
        {
            commit('SET_TYPE',payload)
        },
        set_collection({commit},payload)
        {
            commit('SET_COLLECTION',payload)
        },
        reset({commit})
        {
            commit('RESET')
        }
    }
}
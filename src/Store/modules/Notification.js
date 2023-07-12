export default {
    namespaced:true,
    state:{
        message:undefined,
        type:undefined,
        },
    getters:{
        message:(state) =>
        {
           return  state.message
        },
        type:(state) =>
        {
           return  state.type
        },
    },
    mutations:{
        SET_MESSAGE(state,payload)
        {
            state.message = payload
        },
        SET_TYPE(state,payload)
        {
            state.type = payload
        }
    },
    actions:{
        set_data({commit},payload)
        {
            commit('SET_MESSAGE',payload.message)
            commit('SET_TYPE',payload.type)
        },
    }
}
export default {
    namespaced:true,
    state:{
        status:'offline'
        },
    getters:{
        status:(state) =>
        {
           return state.status
        },
    },
    mutations:{
        SET_STATUS(state,payload)
        {
            state.status = payload
        },
    },
    actions:{
        set_status({commit},payload)
        {
            commit('SET_STATUS',payload)
        }
    }
}
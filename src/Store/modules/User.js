export default {
    namespaced:true,
    state:{
        Data:undefined
        },
    getters:{
        Data:(state)=>
        {
            return state.Data?.record
        }
    },
    mutations:{
        SET_DATA(state,payload)
        {
            state.Data = payload
        }
    },
    actions:{
        set_data({commit},payload)
        {
            commit('SET_DATA',payload)
        }
    }
}
export default {
    namespaced:true,
    state:{
        refresh:0,
        },
    getters:{
        refresh:(state) =>
        {
           return state.refresh
        },
    },
    mutations:{
        SET_REFRESH(state)
        {
            state.refresh = parseInt(state.refresh) + 1
        },
    },
    actions:{
        refresh({commit})
        {
            commit('SET_REFRESH')
        }
    }
}
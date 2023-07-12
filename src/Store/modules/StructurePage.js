export default {
    namespaced:true,
    state:{
        Component:undefined
        },
    getters:{
        Component:(state)=>
        {
            return state.Component
        }
    },
    mutations:{
        SET_COMPONENT(state,payload)
        {
            state.Component = payload
        }
    },
    actions:{
        set_component({commit},payload)
        {
            commit('SET_COMPONENT',payload)
        }
    }
}
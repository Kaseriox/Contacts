export default {
    namespaced:true,
    state:{
            Page:1,
            ItemCount:0,
            ItemsPerPage:25,
            Filter:[],
            Search:'',
        },
    getters:{
        Page(state){
            return state.Page
        },
        ItemCount(state)
        {
            return state.ItemCount
        },
        ItemsPerPage(state)
        {
            return state.ItemsPerPage
        },
        TotalPages(state)
        {
            if(state.ItemsPerPage==='All')
            {
                return 1
            }
            return Math.ceil(state.ItemCount / state.ItemsPerPage);
        },
        FilterString(state)
        {
            let string=''
            let filter = state.Filter.join("&&")
            let search = `(name~'${state.Search}' || surname~'${state.Search}' || email~'${state.Search}' || phone_number~'${state.Search}' || position~'${state.Search}')`
            if(filter)
            {
              string += `${filter}&&`
            }
            if(state.Search)
            {
              string += `${search}&&`
            }
            return string.substring(0,string.length - 2)
        }
    },
    mutations:{
       SET_PAGE(state,payload)
       {
        state.Page = state.Page + parseInt(payload)
       },
       SET_ITEM_COUNT(state,payload)
       {
        state.ItemCount = payload
       },
       SET_ITEM_COUNT_PER_PAGE(state,payload)
       {
            state.ItemsPerPage = payload
       },
       SET_FILTER(state,payload)
       {
         state.Filter = payload
       },
       SET_SEARCH(state,payload)
       {
        state.Search = payload
       }
    },
    actions:{
      set_page({commit},payload)
      {
        commit('SET_PAGE',payload)
      },
      set_item_count({commit},payload)
      {
        commit('SET_ITEM_COUNT',payload)
      },
      set_item_count_per_page({commit},payload)
      {
        commit('SET_ITEM_COUNT_PER_PAGE',payload)
        commit('SET_PAGE', -state.Page + 1)
      },
      set_filter({commit,state},payload)
      {
        let TempFilter = state.Filter
        if(TempFilter.includes(payload[1]))
        {
            TempFilter = TempFilter.filter(choice => choice !== payload[1])
        }
        if(payload[0]!=='')
        {
           TempFilter.push(payload[0]) 
        }
        commit('SET_FILTER',TempFilter)
        commit('SET_PAGE', -state.Page + 1)
      },
      set_search({commit,state},payload)
      {
        commit('SET_SEARCH',payload)
        commit('SET_PAGE', -state.Page + 1)
      }
    }
}
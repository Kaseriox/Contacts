import Vue from 'vue';
import Vuex from 'vuex'
import App from './App.vue';

import VueRouter from 'vue-router';
import Routes from './Router/routes'
import PocketBasePlugin from './plugins/PocketBase';
import Store from './Store/store'

import PocketBase from 'pocketbase'
import './styles.css'

const pb = new PocketBase(API_URL)




Vue.use(VueRouter)
Vue.use(PocketBasePlugin)
Vue.use(Vuex)

const router = new VueRouter({
    routes:Routes,
    mode:'history'
})
router.beforeEach(async (to,from,next)=>{
    if(to.meta?.reqAuth)
    {
        if(pb.authStore.isValid)
        {
            next()
        }
        else
        {
            next('/login')
        }
    }
    else
    {
        next()
    }
})

const store = new Vuex.Store(Store)

new Vue({
    render: (h) => h(App),
    router:router,
    store
}).$mount('#app');

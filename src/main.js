import Vue from 'vue';
import Vuex from 'vuex'
import App from './App.vue';

import VueRouter from 'vue-router';
import Routes from './Router/routes'
import PocketBasePlugin from './plugins/PocketBase';
import Store from './Store/store'

import './styles.css'





Vue.use(VueRouter)
Vue.use(PocketBasePlugin)
Vue.use(Vuex)

const router = new VueRouter({
    routes:Routes,
    mode:'history'
})


const store = new Vuex.Store(Store)

new Vue({
    render: (h) => h(App),
    router:router,
    store
}).$mount('#app');

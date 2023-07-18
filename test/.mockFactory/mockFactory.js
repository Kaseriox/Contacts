import Vuex from 'vuex'
import Store from '../../src/Store/store'
import PocketBasePlugin from './plugins/PocketBase';
import './styles.css'

var _ = require('lodash')

function createWrapper(page, overrides) {

    const localVue = createLocalVue()
    localVue.use(PocketBasePlugin)
    localVue.use(Vuex)
    const store = new Vuex.Store(_.cloneDeep(Store))
    const defaultMountingOptions = {
        localVue,
        store,
        mocks: {
            $axios: {
                get: () => {
                    return new Promise(resolve => resolve({}))
                },
                put: () => Promise.resolve({}),
                post: () => Promise.resolve({}),
            },
            
            $router:
            {
                push:()=>true
            },
        },
        stubs: {
            "router-link":true
        },
        propsData: {},
        

    }
    return mount(
        page,
        _.merge(defaultMountingOptions,overrides)
        
        
    )
}

export default createWrapper



// createWrapper(MyComponent, {mocks: {
//     //your mocks goes here
// }})
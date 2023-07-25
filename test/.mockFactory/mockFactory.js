import { createLocalVue,mount} from '@vue/test-utils'
import Vuex from 'vuex'
import Store from '../../src/Store/store'
import PocketBasePlugin from '../../src/plugins/PocketBase'
import '../../src/styles.css'

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
            $CreateRecord()
            {
                return Promise.resolve({
                    id:'1'
                })
            },
            $DeleteRecord()
            {
                return Promise.resolve({
                    id:'1'
                })
            },
            $GetStatus()
            {
                return Promise.resolve(true)
            },
            $router:
            {
                push:()=>true
            },
            $route:
            {
                path:()=>true
            }
        },
        stubs: {
            "router-link":true,
            "iconify-icon":true,
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
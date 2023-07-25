import { describe, it, expect, beforeEach } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import CompanyManage from "../../src/Views/CompanyManage.vue"
import CompanyManageC from "../../src/Components/Manage/CompanyManage/CompanyManage.vue"
import Header from "../../src/Components/Header/Header.vue"
describe("CompanyManage.vue", () => {
    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(CompanyManage,{
            mocks:{
                $GetCollection(){
                    return Promise.resolve({items:[{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:14.612Z","id":"5ask1scw3rf23yq","name":"TELTONIKA NETWORKS","updated":"2023-07-12 08:56:12.708Z","expand":{}},{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:22.744Z","id":"yqxlilctgbchc22","name":"TELTONIKA TELEMATICS","updated":"2023-02-20 11:44:22.744Z","expand":{}},{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-21 11:57:14.240Z","id":"gud0wunpwb8g08e","name":"TELTONIKA ENERGY","updated":"2023-07-05 08:52:12.791Z","expand":{}}]})
                }
            }
        })
    })
    
    it("Should Display Required Components",()=>{
        expect(wrapper.findComponent(Header).exists()).toBe(true)
        expect(wrapper.findComponent(CompanyManageC).exists()).toBe(true)
    })
})
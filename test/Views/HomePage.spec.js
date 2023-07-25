import { describe, it, expect, beforeEach } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import HomePage from "../../src/Views/HomePage.vue"
import Contacts from "../../src/Components/Contacts/Contacts.vue"
import Header from "../../src/Components/Header/Header.vue"
describe("HomePage.vue", () => {
    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(HomePage,{
            mocks:{
                $GetCollection()
                {
                    return Promise.resolve({items:[]})
                }
            }
        })
    })
    
    it("Should Display Required Components",()=>{
        expect(wrapper.findComponent(Header).exists()).toBe(true)
        expect(wrapper.findComponent(Contacts).exists()).toBe(true)
    })
})
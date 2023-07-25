import { describe, it, expect, beforeEach } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import AccountManage from "../../src/Views/AccountManage.vue"
import AccountManageC from "../../src/Components/Manage/AccountManage/AccountManage.vue"
import Header from "../../src/Components/Header/Header.vue"
describe("AccountManage.vue", () => {
    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(AccountManage)
    })
    
    it("Should Display Required Components",()=>{
        expect(wrapper.findComponent(Header).exists()).toBe(true)
        expect(wrapper.findComponent(AccountManageC).exists()).toBe(true)
    })
})
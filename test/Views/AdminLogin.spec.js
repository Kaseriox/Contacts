import { describe, it, expect, beforeEach } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import AdminLogin from "../../src/Views/AdminLogin.vue"
import RemindPassword from "../../src/Components/Login/RemindPassword.vue"
import AdminLoginC from "../../src/Components/Login/AdminLogin.vue"
describe("AdminLogin.vue", () => {
    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(AdminLogin)
    })
    
    it("Should Display Required Components",()=>{
        expect(wrapper.findComponent(AdminLoginC).exists()).toBe(true)

    })
    it("Should Display Different Component On ChangeComponent Emit",async ()=>{
        const ChangeComponentSpy = vi.spyOn(wrapper.vm,'ChangeComponent')
        expect(ChangeComponentSpy).toHaveBeenCalledTimes(0)
        expect(wrapper.findComponent(AdminLoginC).exists()).toBe(true)
        wrapper.vm.ChangeComponent()
        await wrapper.vm.$nextTick()
        expect(ChangeComponentSpy).toHaveBeenCalledTimes(1)
        expect(wrapper.findComponent(RemindPassword).exists()).toBe(true)
        wrapper.vm.ChangeComponent()
        await wrapper.vm.$nextTick()
        expect(ChangeComponentSpy).toHaveBeenCalledTimes(2)
        expect(wrapper.findComponent(RemindPassword).exists()).toBe(false)
        expect(wrapper.findComponent(AdminLoginC).exists()).toBe(true)
        
    })
})
import { describe, it, expect,vi } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import Header from "../../src/Components/Header/Header.vue"
import AdminMenu from "../../src/Components/Header/AdminMenu.vue"
import DropDown from "../../src/Components/Header/DropDown.vue"
describe("Header.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(Header);
  });

  it('Should Show Admin Menu If There Is User Data',async ()=>
  {
    expect(wrapper.vm.$store.state.User.Data).toBe(undefined)
    expect(wrapper.findComponent(AdminMenu).exists()).toBe(false)
    wrapper.vm.$store.state.User.Data = {record:true}
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$store.state.User.Data).toStrictEqual({record:true})
    expect(wrapper.findComponent(AdminMenu).exists()).toBe(true)
  })

  it('Header Should Be Populated With Required Components',async ()=>{
    wrapper.vm.$store.state.User.Data = {record:true}
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(AdminMenu).exists()).toBe(true)  
    expect(wrapper.findComponent(DropDown).exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(true)
  })



})
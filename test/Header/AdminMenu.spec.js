import { describe, it, expect,vi } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import AdminMenu from '../../src/Components/Header/AdminMenu.vue'
describe("AdminMenu.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(AdminMenu);
  });

  it("Should Include Necessary Tabs For Navigation",()=>{
    expect(wrapper.text()).toContain('Kontaktai')
    expect(wrapper.text()).toContain('Struktūra')
    expect(wrapper.text()).toContain('Paskyros')
    expect(wrapper.text()).toContain('Įmonės')
  })

  it('Should Push Route If Clicked On One Of The Tabs',async ()=>{
    const PushRouteSpy = vi.spyOn(wrapper.vm,'PushRoute')
    const RouterPushSpy = vi.spyOn(wrapper.vm.$router,'push')
    expect(PushRouteSpy).toHaveBeenCalledTimes(0)
    expect(RouterPushSpy).toHaveBeenCalledTimes(0)
    const tab = wrapper.findAll('div').at(2)
    await tab.trigger('click')
    expect(PushRouteSpy).toHaveBeenCalledTimes(1)
    expect(RouterPushSpy).toHaveBeenCalledTimes(1)
  })
  it('Tab Button Should Be Disabled If It Is Already On That Page ',async ()=>{
    const PushRouteSpy = vi.spyOn(wrapper.vm,'PushRoute')
    const tab = wrapper.findAll('div').at(1)
    expect(PushRouteSpy).toHaveBeenCalledTimes(0)
    wrapper.vm.$route.path = '/'
    await wrapper.vm.$nextTick()
    await tab.trigger('click')
    expect(PushRouteSpy).toHaveBeenCalledTimes(0)

  })
  

})
import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../.mockFactory/mockFactory";
import ViewChange from "../../../src/Components/Contacts/ContactDisplay/ViewChange.vue"
describe("ViewChange.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(ViewChange);
  });

  it('Button To Change View Should exist',()=>{
    const button = wrapper.find('button')
    expect(button.exists())
  })
  it('Initial View Should Be Table',()=>{
    expect(wrapper.vm.$data.ViewIcon).toBe('Table')
  })
  it('Button Should Call Function To Change View',async ()=>{
    const button = wrapper.find('button')
    expect(wrapper.emitted().ChangeView).toBe(undefined)
    await button.trigger('click')
    expect(wrapper.emitted().ChangeView).toBeTruthy()
    expect(wrapper.emitted().ChangeView.length).toBe(1)
    expect(wrapper.vm.$data.ViewIcon).toBe('Person')
    await button.trigger('click')
    expect(wrapper.emitted().ChangeView).toBeTruthy()
    expect(wrapper.emitted().ChangeView.length).toBe(2)
    expect(wrapper.vm.$data.ViewIcon).toBe('Table')
  })

});

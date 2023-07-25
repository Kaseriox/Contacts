import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../.mockFactory/mockFactory";
import ContactsPerPage from "../../../src/Components/Contacts/ContactDisplay/ContactsPerPage.vue"
describe("ContactsPerPage.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(ContactsPerPage);
  });


  it('Should Contain 6 Buttons',()=>{
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(6)
  })
  it('Should Render 6 Buttons Text Correctly',()=>{
    const buttons = wrapper.findAll('button')
    expect(buttons.at(0).text()).toContain('5')
    expect(buttons.at(1).text()).toContain('10')
    expect(buttons.at(2).text()).toContain('25')
    expect(buttons.at(3).text()).toContain('50')
    expect(buttons.at(4).text()).toContain('100')
    expect(buttons.at(5).text()).toContain('All')
})
  it('Should Call Action "set_item_count_per_page correctly once button is pressed"',async ()=>{
    const actionSpy = vi.spyOn(wrapper.vm,'set_item_count_per_page')
    expect(actionSpy).toHaveBeenCalledTimes(0)
    const button = wrapper.find('button')
    expect(button.text()).toContain('5')
    await button.trigger('click')
    expect(actionSpy).toHaveBeenCalledTimes(1)
    expect(actionSpy).toHaveBeenCalledWith(5)
    expect(button.attributes().disabled).toBeDefined()
  })
});

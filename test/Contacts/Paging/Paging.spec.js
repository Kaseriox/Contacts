import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../.mockFactory/mockFactory";
import Paging from "../../../src/Components/Contacts/Paging/Paging.vue"
describe("Paging.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(Paging);
  });


   it('Should Render Previous Page Button',()=>{
    const PreviousPageButton = wrapper.findAll('button').at(0)
    expect(PreviousPageButton.text()).toContain('Previous Page')
    expect(PreviousPageButton.attributes().disabled).toBeDefined()
   })

   it('Should Render Next Page Button',()=>{
    const NextPageButton = wrapper.findAll('button').at(1)
    expect(NextPageButton.text()).toContain('Next Page')
    expect(NextPageButton.attributes().disabled).toBeDefined()
   })

   it('Paging Buttons Should Work Correctly',async ()=>{
    const SetPageSpy = vi.spyOn(wrapper.vm,'set_page')
    const PreviousPageButton = wrapper.findAll('button').at(0)
    const NextPageButton = wrapper.findAll('button').at(1)
    expect(SetPageSpy).toHaveBeenCalledTimes(0)
    expect(PreviousPageButton.attributes().disabled).toBeDefined()
    expect(NextPageButton.attributes().disabled).toBeDefined()
    wrapper.vm.$store.state.Paging.ItemCount = 15
    wrapper.vm.$store.state.Paging.ItemsPerPage = 5
    await wrapper.vm.$nextTick()
    
    expect(PreviousPageButton.attributes().disabled).toBeDefined()
    expect(NextPageButton.attributes().disabled).toBeUndefined()
    expect(wrapper.vm.$store.state.Paging.Page).toBe(1)

    await NextPageButton.trigger('click')
    expect(SetPageSpy).toHaveBeenCalledTimes(1)
    expect(SetPageSpy).toHaveBeenCalledWith(1)
    expect(PreviousPageButton.attributes().disabled).toBeUndefined()
    expect(NextPageButton.attributes().disabled).toBeUndefined()
    expect(wrapper.vm.$store.state.Paging.Page).toBe(2)

    await NextPageButton.trigger('click')
    expect(SetPageSpy).toHaveBeenCalledTimes(2)
    expect(SetPageSpy).toHaveBeenCalledWith(1)
    expect(PreviousPageButton.attributes().disabled).toBeUndefined()
    expect(NextPageButton.attributes().disabled).toBeDefined()
    expect(wrapper.vm.$store.state.Paging.Page).toBe(3)

    await PreviousPageButton.trigger('click')
    expect(SetPageSpy).toHaveBeenCalledTimes(3)
    expect(SetPageSpy).toHaveBeenCalledWith(-1)
    expect(PreviousPageButton.attributes().disabled).toBeUndefined()
    expect(NextPageButton.attributes().disabled).toBeUndefined()
    expect(wrapper.vm.$store.state.Paging.Page).toBe(2)

    await PreviousPageButton.trigger('click')
    expect(SetPageSpy).toHaveBeenCalledTimes(4)
    expect(SetPageSpy).toHaveBeenCalledWith(-1)
    expect(PreviousPageButton.attributes().disabled).toBeDefined()
    expect(NextPageButton.attributes().disabled).toBeUndefined()
    expect(wrapper.vm.$store.state.Paging.Page).toBe(1)
   })
});

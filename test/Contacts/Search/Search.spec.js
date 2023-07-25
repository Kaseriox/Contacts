import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../.mockFactory/mockFactory";
import Search from "../../../src/Components/Contacts/Search/Search.vue"
describe("Search.vue", () => {
  vi.useFakeTimers()
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(Search);
  });

  it('Should Call set_search Function Once Input Field Is Populated',async ()=>{
    const SearchSpy = vi.spyOn(wrapper.vm,'set_search')
    const InputField = wrapper.find('input')
    
    expect(SearchSpy).toHaveBeenCalledTimes(0)
    await InputField.setValue('Test')
    vi.advanceTimersByTime(1000)
    expect(SearchSpy).toHaveBeenCalledTimes(1)
    expect(SearchSpy).toHaveBeenCalledWith('Test')
  })

})

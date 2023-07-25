import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../.mockFactory/mockFactory";
import ItemsFound from "../../../src/Components/Contacts/Paging/ItemsFound.vue"
describe("ItemsFound.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(ItemsFound,{
        propsData:{
            count:25,
            name:'kontaktų'
        }
    });
  });


    it("Should Render Text Correctly",()=>{
        expect(wrapper.text()).toContain('Iš viso rasta: 25 kontaktų')
    })
});

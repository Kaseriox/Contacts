import { describe, it, expect, vi } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import StructureManagement from "../../src/Components/Manage/StructureManagement.vue"
import OfficeManage from "../../src/Components/Manage/OfficeManage/OfficeManage.vue"
describe("StructureManagement.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(StructureManagement,{
      mocks:{
        $GetCollection(){
            return Promise.resolve({items:[{"city":"Kaunas","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:51:32.012Z","id":"vm438vfq27bg17e","name":"K. Baršausko st. 66, Kaunas, Lithuania","street":"K. Baršausko st.","street_number":"66","updated":"2023-07-12 09:00:54.925Z","expand":{}},{"city":"Vilnius","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:57:31.159Z","id":"sc6mh0r9dny79um","name":"Saltoniškių st. 2, Vilnius, Lithuania","street":"Saltoniškių st.","street_number":"2","updated":"2023-02-20 12:26:53.095Z","expand":{}},{"city":"Vilnius","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:59:45.806Z","id":"6nfo4x8qda3rfhi","name":"Saltoniškių st. 9B-1, Vilnius, Lithuania","street":"Saltoniškių st.","street_number":"9B-1","updated":"2023-02-20 12:26:27.397Z","expand":{}},{"city":"Kaunas","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-21 12:10:52.834Z","id":"vcu1j5pg3hxjonj","name":"Jonavos st. 150, Kaunas, Lithuania","street":"Jonavos st.","street_number":"150","updated":"2023-02-21 12:18:04.110Z","expand":{}}]})
        }
    }
    });
  });

  it("Should Display OfficeManage Component When StructureComponent Is Set To It",async ()=>{
    expect(wrapper.findComponent(OfficeManage).exists()).toBe(false)
    wrapper.vm.$data.StructureComponent = OfficeManage
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(OfficeManage).exists()).toBe(true)
    wrapper.vm.$data.StructureComponent = undefined
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(OfficeManage).exists()).toBe(false)
  })
});

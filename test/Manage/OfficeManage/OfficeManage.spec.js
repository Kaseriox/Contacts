import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../.mockFactory/mockFactory";
import OfficeManage from "../../../src/Components/Manage/OfficeManage/OfficeManage.vue"
import Table from "../../../src/Components/Reusables/Table.vue"
import FormButton from "../../../src/Components/Form/FormButton.vue"
describe("OfficeManage.vue", () => {
  let wrapper;
  let UserData;
  let GetDataSpy = vi.spyOn(OfficeManage.methods,'GetData')
  beforeEach(() => {
    UserData =  {"record":{"avatar":"","collectionId":"_pb_users_auth_","collectionName":"users","created":"2023-07-10 13:45:35.272Z","email":"Main@Main.com","emailVisibility":true,"expand":{"permissions_id":{"collectionId":"adadquft6s38bg8","collectionName":"user_permissions","created":"2023-07-10 13:45:10.049Z","delete_companies":true,"delete_employees":true,"delete_offices":true,"delete_permissions":true,"delete_structure":true,"edit_companies":true,"edit_employees":true,"edit_offices":true,"edit_permissions":true,"edit_structure":true,"id":"f2i74igdva80yow","read_permissions":true,"updated":"2023-07-21 07:26:00.486Z","expand":{}}},"id":"8mauhummrsbwfyy","name":"Admin","permissions_id":"f2i74igdva80yow","updated":"2023-07-12 10:27:27.970Z","username":"Main","verified":true},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE2OTExNTk4NjIsImlkIjoiOG1hdWh1bW1yc2J3Znl5IiwidHlwZSI6ImF1dGhSZWNvcmQifQ.NA156JBAoxN9QZkTucMBvzutdN2tYuLDOoZL3iFB-ks"}
    wrapper = createWrapper(OfficeManage,{
        mocks:{
            $GetCollection(){
                return Promise.resolve({items:[{"city":"Kaunas","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:51:32.012Z","id":"vm438vfq27bg17e","name":"K. Baršausko st. 66, Kaunas, Lithuania","street":"K. Baršausko st.","street_number":"66","updated":"2023-07-12 09:00:54.925Z","expand":{}},{"city":"Vilnius","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:57:31.159Z","id":"sc6mh0r9dny79um","name":"Saltoniškių st. 2, Vilnius, Lithuania","street":"Saltoniškių st.","street_number":"2","updated":"2023-02-20 12:26:53.095Z","expand":{}},{"city":"Vilnius","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:59:45.806Z","id":"6nfo4x8qda3rfhi","name":"Saltoniškių st. 9B-1, Vilnius, Lithuania","street":"Saltoniškių st.","street_number":"9B-1","updated":"2023-02-20 12:26:27.397Z","expand":{}},{"city":"Kaunas","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-21 12:10:52.834Z","id":"vcu1j5pg3hxjonj","name":"Jonavos st. 150, Kaunas, Lithuania","street":"Jonavos st.","street_number":"150","updated":"2023-02-21 12:18:04.110Z","expand":{}}]})
            }
        }
    });
  });

  it("Should Call 'GetData' On Creation",()=>{
    expect(GetDataSpy).toHaveBeenCalledTimes(1)
  })
  it("Should Display Companies",async ()=>{
    wrapper.vm.$store.state.User.Data = UserData
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(Table).exists()).toBe(true)
    expect(wrapper.findComponent(Table).props().data).toStrictEqual([{"collection":"offices","id":"vm438vfq27bg17e","Ofiso pavadinimas":"K. Baršausko st. 66, Kaunas, Lithuania"},{"collection":"offices","id":"sc6mh0r9dny79um","Ofiso pavadinimas":"Saltoniškių st. 2, Vilnius, Lithuania"},{"collection":"offices","id":"6nfo4x8qda3rfhi","Ofiso pavadinimas":"Saltoniškių st. 9B-1, Vilnius, Lithuania"},{"collection":"offices","id":"vcu1j5pg3hxjonj","Ofiso pavadinimas":"Jonavos st. 150, Kaunas, Lithuania"}])
    expect(wrapper.findComponent(Table).props().permissions).toStrictEqual({delete:true,edit:true})
    expect(wrapper.findComponent(Table).props().fields).toStrictEqual(["Ofiso pavadinimas"])
    expect(wrapper.text()).toContain('K. Baršausko st. 66, Kaunas, Lithuania')
    expect(wrapper.text()).toContain('Jonavos st. 150, Kaunas, Lithuania')
    expect(wrapper.findAllComponents(FormButton).exists()).toBe(true)
    expect(wrapper.findAllComponents(FormButton).length).toBe(9)
})
it("Should Only Allow Creation And Editing If Permissions Only Grant Editing Permissions",async ()=>{
  wrapper.vm.$store.state.User.Data = UserData
  wrapper.vm.$store.state.User.Data.record.expand.permissions_id.delete_offices = false
  await wrapper.vm.$nextTick()
  expect(wrapper.findComponent(Table).exists()).toBe(true)
  expect(wrapper.findComponent(Table).props().permissions).toStrictEqual({delete:false,edit:true})
  expect(wrapper.findAllComponents(FormButton).length).toBe(5)
  expect(wrapper.findAllComponents(FormButton).at(0).props().type).toBe('create')
  expect(wrapper.findAllComponents(FormButton).at(1).props().type).toBe('edit')
  expect(wrapper.findAllComponents(FormButton).at(2).props().type).toBe('edit')
  expect(wrapper.findAllComponents(FormButton).at(3).props().type).toBe('edit')
})
it("Should Only Allow Deletion If Permissions Only Grant Deletion Permissions",async ()=>{
  wrapper.vm.$store.state.User.Data = UserData
  wrapper.vm.$store.state.User.Data.record.expand.permissions_id.edit_offices = false
  await wrapper.vm.$nextTick()
  expect(wrapper.findComponent(Table).exists()).toBe(true)
  expect(wrapper.findComponent(Table).props().permissions).toStrictEqual({delete:true,edit:false})
  expect(wrapper.findAllComponents(FormButton).length).toBe(4)
  expect(wrapper.findAllComponents(FormButton).at(0).props().type).toBe('delete')
  expect(wrapper.findAllComponents(FormButton).at(1).props().type).toBe('delete')
  expect(wrapper.findAllComponents(FormButton).at(2).props().type).toBe('delete')
})
it("Should Get Data If it Refresh Variable Changes",async ()=>{
  const GetDataSpy = vi.spyOn(wrapper.vm,'GetData')
  expect(GetDataSpy).toHaveBeenCalledTimes(0)
  wrapper.vm.$store.state.Refresh.refresh = 1
  await wrapper.vm.$nextTick()
  expect(GetDataSpy).toHaveBeenCalledTimes(1)
})
  

})
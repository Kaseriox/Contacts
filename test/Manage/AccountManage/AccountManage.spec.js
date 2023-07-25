import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../.mockFactory/mockFactory";
import AccountManage from "../../../src/Components/Manage/AccountManage/AccountManage.vue"
import Table from "../../../src/Components/Reusables/Table.vue"
import FormButton from "../../../src/Components/Form/FormButton.vue"
describe("AccountManage.vue", () => {
  let wrapper;
  let UserData;
  let GetDataSpy = vi.spyOn(AccountManage.methods,'GetData')
  beforeEach(() => {
    UserData =  {"record":{"avatar":"","collectionId":"_pb_users_auth_","collectionName":"users","created":"2023-07-10 13:45:35.272Z","email":"Main@Main.com","emailVisibility":true,"expand":{"permissions_id":{"collectionId":"adadquft6s38bg8","collectionName":"user_permissions","created":"2023-07-10 13:45:10.049Z","delete_companies":true,"delete_employees":true,"delete_offices":true,"delete_permissions":true,"delete_structure":true,"edit_companies":true,"edit_employees":true,"edit_offices":true,"edit_permissions":true,"edit_structure":true,"id":"f2i74igdva80yow","read_permissions":true,"updated":"2023-07-21 07:26:00.486Z","expand":{}}},"id":"8mauhummrsbwfyy","name":"Admin","permissions_id":"f2i74igdva80yow","updated":"2023-07-12 10:27:27.970Z","username":"Main","verified":true},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE2OTExNTk4NjIsImlkIjoiOG1hdWh1bW1yc2J3Znl5IiwidHlwZSI6ImF1dGhSZWNvcmQifQ.NA156JBAoxN9QZkTucMBvzutdN2tYuLDOoZL3iFB-ks"}
    wrapper = createWrapper(AccountManage,{
        mocks:{
            $GetCollection(){
                return Promise.resolve({items:[{"avatar":"","collectionId":"_pb_users_auth_","collectionName":"users","created":"2023-02-20 09:51:12.612Z","email":"admin@teltonika.lt","emailVisibility":true,"id":"ulzaiqke8x0xdi1","name":"Admin","permissions_id":"4y2zp4n8ehzyzi0","updated":"2023-07-12 09:01:27.576Z","username":"admin","verified":true,"expand":{}},{"avatar":"","collectionId":"_pb_users_auth_","collectionName":"users","created":"2023-02-20 14:19:56.618Z","email":"test@teltonika.lt","emailVisibility":true,"id":"ujtozjrnw31esok","name":"","permissions_id":"m9c8ugehhuxrft6","updated":"2023-07-12 06:44:55.700Z","username":"testing","verified":true,"expand":{}},{"avatar":"","collectionId":"_pb_users_auth_","collectionName":"users","created":"2023-07-10 13:45:35.272Z","email":"Main@Main.com","emailVisibility":true,"id":"8mauhummrsbwfyy","name":"Admin","permissions_id":"f2i74igdva80yow","updated":"2023-07-12 10:27:27.970Z","username":"Main","verified":true,"expand":{}}]})
            }
        }
    });
  });

  it("Should Call 'GetData' On Creation",()=>{
    expect(GetDataSpy).toHaveBeenCalledTimes(1)
  })
  it("Should Display 'No Access' Message If Admin Is Not Logged In",()=>{
    expect(wrapper.text()).toContain('No Access')
  })
  it("Should Display Users If Admin Is Logged In",async ()=>{
    expect(wrapper.findAllComponents(FormButton).length).toBe(0)
    expect(wrapper.findComponent(Table).exists()).toBe(false)
    wrapper.vm.$store.state.User.Data = UserData
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(Table).exists()).toBe(true)
    expect(wrapper.findComponent(Table).props().data).toStrictEqual([{"collection":"users","id":"ulzaiqke8x0xdi1","Vardas":"admin","El.paštas":"admin@teltonika.lt"},{"collection":"users","id":"ujtozjrnw31esok","Vardas":"testing","El.paštas":"test@teltonika.lt"},{"collection":"users","id":"8mauhummrsbwfyy","Vardas":"Main","El.paštas":"Main@Main.com"}])
    expect(wrapper.findComponent(Table).props().permissions).toStrictEqual({delete:true,edit:true})
    expect(wrapper.findComponent(Table).props().fields).toStrictEqual(["Vardas","El.paštas"])
    expect(wrapper.text()).toContain('admin')
    expect(wrapper.text()).toContain('admin@teltonika.lt')
    expect(wrapper.findAllComponents(FormButton).exists()).toBe(true)
    expect(wrapper.findAllComponents(FormButton).length).toBe(7)
})
it("Should Only Allow Creation And Editing If Permissions Only Grant Editing Permissions",async ()=>{
  expect(wrapper.findAllComponents(FormButton).length).toBe(0)
  expect(wrapper.findComponent(Table).exists()).toBe(false)
  wrapper.vm.$store.state.User.Data = UserData
  wrapper.vm.$store.state.User.Data.record.expand.permissions_id.delete_permissions = false
  await wrapper.vm.$nextTick()

  expect(wrapper.findComponent(Table).exists()).toBe(true)
  expect(wrapper.findComponent(Table).props().permissions).toStrictEqual({delete:false,edit:true})
  expect(wrapper.findAllComponents(FormButton).length).toBe(4)
  expect(wrapper.findAllComponents(FormButton).at(0).props().type).toBe('create')
  expect(wrapper.findAllComponents(FormButton).at(1).props().type).toBe('edit')
  expect(wrapper.findAllComponents(FormButton).at(2).props().type).toBe('edit')
  expect(wrapper.findAllComponents(FormButton).at(3).props().type).toBe('edit')
})
it("Should Only Allow Deletion If Permissions Only Grant Deletion Permissions",async ()=>{
  expect(wrapper.findAllComponents(FormButton).length).toBe(0)
  expect(wrapper.findComponent(Table).exists()).toBe(false)
  wrapper.vm.$store.state.User.Data = UserData
  wrapper.vm.$store.state.User.Data.record.expand.permissions_id.edit_permissions = false
  await wrapper.vm.$nextTick()
  expect(wrapper.findComponent(Table).exists()).toBe(true)
  expect(wrapper.findComponent(Table).props().permissions).toStrictEqual({delete:true,edit:false})
  expect(wrapper.findAllComponents(FormButton).length).toBe(3)
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
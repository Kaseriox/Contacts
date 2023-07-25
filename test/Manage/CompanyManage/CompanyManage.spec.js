import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../.mockFactory/mockFactory";
import CompanyManage from "../../../src/Components/Manage/CompanyManage/CompanyManage.vue"
import Table from "../../../src/Components/Reusables/Table.vue"
import FormButton from "../../../src/Components/Form/FormButton.vue"
describe("CompanyManage.vue", () => {
  let wrapper;
  let UserData;
  let GetDataSpy = vi.spyOn(CompanyManage.methods,'GetData')
  beforeEach(() => {
    UserData =  {"record":{"avatar":"","collectionId":"_pb_users_auth_","collectionName":"users","created":"2023-07-10 13:45:35.272Z","email":"Main@Main.com","emailVisibility":true,"expand":{"permissions_id":{"collectionId":"adadquft6s38bg8","collectionName":"user_permissions","created":"2023-07-10 13:45:10.049Z","delete_companies":true,"delete_employees":true,"delete_offices":true,"delete_permissions":true,"delete_structure":true,"edit_companies":true,"edit_employees":true,"edit_offices":true,"edit_permissions":true,"edit_structure":true,"id":"f2i74igdva80yow","read_permissions":true,"updated":"2023-07-21 07:26:00.486Z","expand":{}}},"id":"8mauhummrsbwfyy","name":"Admin","permissions_id":"f2i74igdva80yow","updated":"2023-07-12 10:27:27.970Z","username":"Main","verified":true},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE2OTExNTk4NjIsImlkIjoiOG1hdWh1bW1yc2J3Znl5IiwidHlwZSI6ImF1dGhSZWNvcmQifQ.NA156JBAoxN9QZkTucMBvzutdN2tYuLDOoZL3iFB-ks"}
    wrapper = createWrapper(CompanyManage,{
        mocks:{
            $GetCollection(){
                return Promise.resolve({items:[{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:14.612Z","id":"5ask1scw3rf23yq","name":"TELTONIKA NETWORKS","updated":"2023-07-12 08:56:12.708Z","expand":{}},{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:22.744Z","id":"yqxlilctgbchc22","name":"TELTONIKA TELEMATICS","updated":"2023-02-20 11:44:22.744Z","expand":{}},{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-21 11:57:14.240Z","id":"gud0wunpwb8g08e","name":"TELTONIKA ENERGY","updated":"2023-07-05 08:52:12.791Z","expand":{}}]})
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
    expect(wrapper.findComponent(Table).props().data).toStrictEqual([{"collection":"companies","id":"5ask1scw3rf23yq","Įmonės pavadinimas":"TELTONIKA NETWORKS"},{"collection":"companies","id":"yqxlilctgbchc22","Įmonės pavadinimas":"TELTONIKA TELEMATICS"},{"collection":"companies","id":"gud0wunpwb8g08e","Įmonės pavadinimas":"TELTONIKA ENERGY"}])
    expect(wrapper.findComponent(Table).props().permissions).toStrictEqual({delete:true,edit:true})
    expect(wrapper.findComponent(Table).props().fields).toStrictEqual(["Įmonės pavadinimas"])
    expect(wrapper.text()).toContain('TELTONIKA NETWORKS')
    expect(wrapper.text()).toContain('TELTONIKA TELEMATICS')
    expect(wrapper.findAllComponents(FormButton).exists()).toBe(true)
    expect(wrapper.findAllComponents(FormButton).length).toBe(7)
})
it("Should Only Allow Creation And Editing If Permissions Only Grant Editing Permissions",async ()=>{
  wrapper.vm.$store.state.User.Data = UserData
  wrapper.vm.$store.state.User.Data.record.expand.permissions_id.delete_companies = false
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
  wrapper.vm.$store.state.User.Data = UserData
  wrapper.vm.$store.state.User.Data.record.expand.permissions_id.edit_companies = false
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
import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../.mockFactory/mockFactory";
import DepartmentManage from "../../../src/Components/Manage/DepartmentManage/DepartmentManage.vue"
import Table from "../../../src/Components/Reusables/Table.vue"
import FormButton from "../../../src/Components/Form/FormButton.vue"
describe("DepartmentManage.vue", () => {
  let wrapper;
  let UserData;
  let GetDataSpy = vi.spyOn(DepartmentManage.methods,'GetData')
  beforeEach(() => {
    UserData =  {"record":{"avatar":"","collectionId":"_pb_users_auth_","collectionName":"users","created":"2023-07-10 13:45:35.272Z","email":"Main@Main.com","emailVisibility":true,"expand":{"permissions_id":{"collectionId":"adadquft6s38bg8","collectionName":"user_permissions","created":"2023-07-10 13:45:10.049Z","delete_companies":true,"delete_employees":true,"delete_offices":true,"delete_permissions":true,"delete_structure":true,"edit_companies":true,"edit_employees":true,"edit_offices":true,"edit_permissions":true,"edit_structure":true,"id":"f2i74igdva80yow","read_permissions":true,"updated":"2023-07-21 07:26:00.486Z","expand":{}}},"id":"8mauhummrsbwfyy","name":"Admin","permissions_id":"f2i74igdva80yow","updated":"2023-07-12 10:27:27.970Z","username":"Main","verified":true},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE2OTExNTk4NjIsImlkIjoiOG1hdWh1bW1yc2J3Znl5IiwidHlwZSI6ImF1dGhSZWNvcmQifQ.NA156JBAoxN9QZkTucMBvzutdN2tYuLDOoZL3iFB-ks"}
    wrapper = createWrapper(DepartmentManage,{
        mocks:{
            $GetCollection(){
                return Promise.resolve({items:[{"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:02:43.008Z","id":"h3cchigia2xtmzk","name":"IoT akademija","updated":"2023-07-12 09:00:41.458Z","expand":{}},{"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:36:51.570Z","id":"yyn7p8ka5stjvr6","name":"Testavimo","updated":"2023-02-20 12:37:45.732Z","expand":{}},{"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:37:29.907Z","id":"3e8d0k0jpeg7pvg","name":"Konstruktorių","updated":"2023-02-20 12:37:42.835Z","expand":{}},{"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:37:50.627Z","id":"w0bc7yv297l1uej","name":"Programuotojų","updated":"2023-02-20 12:37:50.627Z","expand":{}},{"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:43:20.937Z","id":"pwg05eofg41afyi","name":"Biuro ir vadybos","updated":"2023-02-20 12:43:20.937Z","expand":{}},{"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:43:57.537Z","id":"8t31iyvwrhqnmiq","name":"IT adminsitratorių","updated":"2023-02-20 12:43:57.537Z","expand":{}},{"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-23 13:45:43.047Z","id":"9y1n8rkzaojgqzz","name":"Not existing","updated":"2023-02-23 13:45:43.047Z","expand":{}}]})
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
    expect(wrapper.findComponent(Table).props().data).toStrictEqual([{"collection":"departments","id":"h3cchigia2xtmzk","Skyriaus pavadinimas":"IoT akademija"},{"collection":"departments","id":"yyn7p8ka5stjvr6","Skyriaus pavadinimas":"Testavimo"},{"collection":"departments","id":"3e8d0k0jpeg7pvg","Skyriaus pavadinimas":"Konstruktorių"},{"collection":"departments","id":"w0bc7yv297l1uej","Skyriaus pavadinimas":"Programuotojų"},{"collection":"departments","id":"pwg05eofg41afyi","Skyriaus pavadinimas":"Biuro ir vadybos"},{"collection":"departments","id":"8t31iyvwrhqnmiq","Skyriaus pavadinimas":"IT adminsitratorių"},{"collection":"departments","id":"9y1n8rkzaojgqzz","Skyriaus pavadinimas":"Not existing"}])
    expect(wrapper.findComponent(Table).props().permissions).toStrictEqual({delete:true,edit:true})
    expect(wrapper.findComponent(Table).props().fields).toStrictEqual(["Skyriaus pavadinimas"])
    expect(wrapper.text()).toContain('Testavimo')
    expect(wrapper.text()).toContain('Biuro ir vadybos')
    expect(wrapper.findAllComponents(FormButton).exists()).toBe(true)
    expect(wrapper.findAllComponents(FormButton).length).toBe(15)
})
it("Should Only Allow Creation And Editing If Permissions Only Grant Editing Permissions",async ()=>{
  wrapper.vm.$store.state.User.Data = UserData
  wrapper.vm.$store.state.User.Data.record.expand.permissions_id.delete_structure = false
  await wrapper.vm.$nextTick()
  expect(wrapper.findComponent(Table).exists()).toBe(true)
  expect(wrapper.findComponent(Table).props().permissions).toStrictEqual({delete:false,edit:true})
  expect(wrapper.findAllComponents(FormButton).length).toBe(8)
  expect(wrapper.findAllComponents(FormButton).at(0).props().type).toBe('create')
  expect(wrapper.findAllComponents(FormButton).at(1).props().type).toBe('edit')
  expect(wrapper.findAllComponents(FormButton).at(2).props().type).toBe('edit')
  expect(wrapper.findAllComponents(FormButton).at(3).props().type).toBe('edit')
})
it("Should Only Allow Deletion If Permissions Only Grant Deletion Permissions",async ()=>{
  wrapper.vm.$store.state.User.Data = UserData
  wrapper.vm.$store.state.User.Data.record.expand.permissions_id.edit_structure = false
  await wrapper.vm.$nextTick()
  expect(wrapper.findComponent(Table).exists()).toBe(true)
  expect(wrapper.findComponent(Table).props().permissions).toStrictEqual({delete:true,edit:false})
  expect(wrapper.findAllComponents(FormButton).length).toBe(7)
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
import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../.mockFactory/mockFactory";
import DivisionManage from "../../../src/Components/Manage/DivisionManage/DivisionManage.vue"
import Table from "../../../src/Components/Reusables/Table.vue"
import FormButton from "../../../src/Components/Form/FormButton.vue"
describe("DivisionManage.vue", () => {
  let wrapper;
  let UserData;
  let GetDataSpy = vi.spyOn(DivisionManage.methods,'GetData')
  beforeEach(() => {
    UserData =  {"record":{"avatar":"","collectionId":"_pb_users_auth_","collectionName":"users","created":"2023-07-10 13:45:35.272Z","email":"Main@Main.com","emailVisibility":true,"expand":{"permissions_id":{"collectionId":"adadquft6s38bg8","collectionName":"user_permissions","created":"2023-07-10 13:45:10.049Z","delete_companies":true,"delete_employees":true,"delete_offices":true,"delete_permissions":true,"delete_structure":true,"edit_companies":true,"edit_employees":true,"edit_offices":true,"edit_permissions":true,"edit_structure":true,"id":"f2i74igdva80yow","read_permissions":true,"updated":"2023-07-21 07:26:00.486Z","expand":{}}},"id":"8mauhummrsbwfyy","name":"Admin","permissions_id":"f2i74igdva80yow","updated":"2023-07-12 10:27:27.970Z","username":"Main","verified":true},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE2OTExNTk4NjIsImlkIjoiOG1hdWh1bW1yc2J3Znl5IiwidHlwZSI6ImF1dGhSZWNvcmQifQ.NA156JBAoxN9QZkTucMBvzutdN2tYuLDOoZL3iFB-ks"}
    wrapper = createWrapper(DivisionManage,{
        mocks:{
            $GetCollection(){
                return Promise.resolve({items:[{"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 10:00:29.661Z","id":"1uio162voxfj2ot","name":"HRD","updated":"2023-07-12 09:00:12.518Z","expand":{}},{"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 10:00:42.505Z","id":"dmgqn0scy1z4qym","name":"RnD","updated":"2023-02-20 12:03:13.973Z","expand":{}},{"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 12:29:49.776Z","id":"5xwpimcs50j6ygi","name":"Administracija","updated":"2023-02-20 12:43:38.491Z","expand":{}},{"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 12:31:19.756Z","id":"53fjrf5alo40nc2","name":"Marketingas","updated":"2023-02-20 12:31:19.756Z","expand":{}},{"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 12:31:25.363Z","id":"fpuqxr7ahshmwrh","name":"Pardavimai","updated":"2023-02-20 12:31:25.363Z","expand":{}}]})
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
    expect(wrapper.findComponent(Table).props().data).toStrictEqual([{"collection":"divisions","id":"1uio162voxfj2ot","Padalinio pavadinimas":"HRD"},{"collection":"divisions","id":"dmgqn0scy1z4qym","Padalinio pavadinimas":"RnD"},{"collection":"divisions","id":"5xwpimcs50j6ygi","Padalinio pavadinimas":"Administracija"},{"collection":"divisions","id":"53fjrf5alo40nc2","Padalinio pavadinimas":"Marketingas"},{"collection":"divisions","id":"fpuqxr7ahshmwrh","Padalinio pavadinimas":"Pardavimai"}])
    expect(wrapper.findComponent(Table).props().permissions).toStrictEqual({delete:true,edit:true})
    expect(wrapper.findComponent(Table).props().fields).toStrictEqual(["Padalinio pavadinimas"])
    expect(wrapper.text()).toContain('HRD')
    expect(wrapper.text()).toContain('RnD')
    expect(wrapper.findAllComponents(FormButton).exists()).toBe(true)
    expect(wrapper.findAllComponents(FormButton).length).toBe(11)
})
it("Should Only Allow Creation And Editing If Permissions Only Grant Editing Permissions",async ()=>{
  wrapper.vm.$store.state.User.Data = UserData
  wrapper.vm.$store.state.User.Data.record.expand.permissions_id.delete_structure = false
  await wrapper.vm.$nextTick()
  expect(wrapper.findComponent(Table).exists()).toBe(true)
  expect(wrapper.findComponent(Table).props().permissions).toStrictEqual({delete:false,edit:true})
  expect(wrapper.findAllComponents(FormButton).length).toBe(6)
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
  expect(wrapper.findAllComponents(FormButton).length).toBe(5)
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
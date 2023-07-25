import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../.mockFactory/mockFactory";
import GroupManage from "../../../src/Components/Manage/GroupManage/GroupManage.vue"
import Table from "../../../src/Components/Reusables/Table.vue"
import FormButton from "../../../src/Components/Form/FormButton.vue"
describe("GroupManage.vue", () => {
  let wrapper;
  let UserData;
  let GetDataSpy = vi.spyOn(GroupManage.methods,'GetData')
  beforeEach(() => {
    UserData =  {"record":{"avatar":"","collectionId":"_pb_users_auth_","collectionName":"users","created":"2023-07-10 13:45:35.272Z","email":"Main@Main.com","emailVisibility":true,"expand":{"permissions_id":{"collectionId":"adadquft6s38bg8","collectionName":"user_permissions","created":"2023-07-10 13:45:10.049Z","delete_companies":true,"delete_employees":true,"delete_offices":true,"delete_permissions":true,"delete_structure":true,"edit_companies":true,"edit_employees":true,"edit_offices":true,"edit_permissions":true,"edit_structure":true,"id":"f2i74igdva80yow","read_permissions":true,"updated":"2023-07-21 07:26:00.486Z","expand":{}}},"id":"8mauhummrsbwfyy","name":"Admin","permissions_id":"f2i74igdva80yow","updated":"2023-07-12 10:27:27.970Z","username":"Main","verified":true},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE2OTExNTk4NjIsImlkIjoiOG1hdWh1bW1yc2J3Znl5IiwidHlwZSI6ImF1dGhSZWNvcmQifQ.NA156JBAoxN9QZkTucMBvzutdN2tYuLDOoZL3iFB-ks"}
    wrapper = createWrapper(GroupManage,{
        mocks:{
            $GetCollection(){
                return Promise.resolve({items:[{"collectionId":"57faccb7837p3uh","collectionName":"groups","created":"2023-02-20 12:38:12.594Z","id":"oambg9goguergbw","name":"Įterptinių sistemų programuotojai","updated":"2023-07-12 08:56:35.434Z","expand":{}},{"collectionId":"57faccb7837p3uh","collectionName":"groups","created":"2023-02-20 12:38:28.212Z","id":"13qspmhdzfcro2o","name":"Tinklų","updated":"2023-02-20 12:38:28.212Z","expand":{}},{"collectionId":"57faccb7837p3uh","collectionName":"groups","created":"2023-02-20 12:40:09.701Z","id":"q1bctefaiwik1o1","name":"Mechanikos inžinierių","updated":"2023-02-20 12:40:09.701Z","expand":{}},{"collectionId":"57faccb7837p3uh","collectionName":"groups","created":"2023-02-20 12:40:19.780Z","id":"g102qzh1azou2sg","name":"Elektronikos inžinierių","updated":"2023-02-20 12:40:19.780Z","expand":{}},{"collectionId":"57faccb7837p3uh","collectionName":"groups","created":"2023-02-20 12:40:49.943Z","id":"tbw7dgokb1rf999","name":"Automatinių testų","updated":"2023-02-20 12:40:49.943Z","expand":{}},{"collectionId":"57faccb7837p3uh","collectionName":"groups","created":"2023-02-20 12:40:54.334Z","id":"rfeqj6fnktemyor","name":"Rankinių testų","updated":"2023-02-20 12:41:16.256Z","expand":{}}]})
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
    expect(wrapper.findComponent(Table).props().data).toStrictEqual([{"collection":"groups","id":"oambg9goguergbw","Grupės pavadinimas":"Įterptinių sistemų programuotojai"},{"collection":"groups","id":"13qspmhdzfcro2o","Grupės pavadinimas":"Tinklų"},{"collection":"groups","id":"q1bctefaiwik1o1","Grupės pavadinimas":"Mechanikos inžinierių"},{"collection":"groups","id":"g102qzh1azou2sg","Grupės pavadinimas":"Elektronikos inžinierių"},{"collection":"groups","id":"tbw7dgokb1rf999","Grupės pavadinimas":"Automatinių testų"},{"collection":"groups","id":"rfeqj6fnktemyor","Grupės pavadinimas":"Rankinių testų"}])
    expect(wrapper.findComponent(Table).props().permissions).toStrictEqual({delete:true,edit:true})
    expect(wrapper.findComponent(Table).props().fields).toStrictEqual(["Grupės pavadinimas"])
    expect(wrapper.text()).toContain('Tinklų')
    expect(wrapper.text()).toContain('Rankinių testų')
    expect(wrapper.findAllComponents(FormButton).exists()).toBe(true)
    expect(wrapper.findAllComponents(FormButton).length).toBe(13)
})
it("Should Only Allow Creation And Editing If Permissions Only Grant Editing Permissions",async ()=>{
  wrapper.vm.$store.state.User.Data = UserData
  wrapper.vm.$store.state.User.Data.record.expand.permissions_id.delete_structure = false
  await wrapper.vm.$nextTick()
  expect(wrapper.findComponent(Table).exists()).toBe(true)
  expect(wrapper.findComponent(Table).props().permissions).toStrictEqual({delete:false,edit:true})
  expect(wrapper.findAllComponents(FormButton).length).toBe(7)
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
  expect(wrapper.findAllComponents(FormButton).length).toBe(6)
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
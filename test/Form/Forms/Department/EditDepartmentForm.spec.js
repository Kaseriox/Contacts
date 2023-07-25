import { describe, it, expect, vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import EditDepartmentForm from "../../../../src/Components/Form/Forms/Department/EditDepartmentForm.vue";
describe("EditCompanyForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(EditDepartmentForm, {
      mocks: {
        $GetSingleRecord() {
            return Promise.resolve({"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:02:43.008Z","id":"h3cchigia2xtmzk","name":"IoT akademija","updated":"2023-07-17 13:55:11.312Z","expand":{}});
        },
        $GetCollection({Collection})
        {
            switch(Collection)
            {
                case 'divisions':
                    return Promise.resolve({items:[
                        {
                          "collectionId": "bakpn5k6ntn68n3",
                          "collectionName": "divisions",
                          "created": "2023-02-20 10:00:29.661Z",
                          "id": "1uio162voxfj2ot",
                          "name": "HRD",
                          "updated": "2023-07-20 04:20:51.210Z",
                          "expand": {}
                        },
                        {
                          "collectionId": "bakpn5k6ntn68n3",
                          "collectionName": "divisions",
                          "created": "2023-02-20 10:00:42.505Z",
                          "id": "dmgqn0scy1z4qym",
                          "name": "RnD",
                          "updated": "2023-02-20 12:03:13.973Z",
                          "expand": {}
                        },
                        {
                          "collectionId": "bakpn5k6ntn68n3",
                          "collectionName": "divisions",
                          "created": "2023-02-20 12:29:49.776Z",
                          "id": "5xwpimcs50j6ygi",
                          "name": "Administracija",
                          "updated": "2023-02-20 12:43:38.491Z",
                          "expand": {}
                        },
                        {
                          "collectionId": "bakpn5k6ntn68n3",
                          "collectionName": "divisions",
                          "created": "2023-02-20 12:31:19.756Z",
                          "id": "53fjrf5alo40nc2",
                          "name": "Marketingas",
                          "updated": "2023-02-20 12:31:19.756Z",
                          "expand": {}
                        },
                        {
                          "collectionId": "bakpn5k6ntn68n3",
                          "collectionName": "divisions",
                          "created": "2023-02-20 12:31:25.363Z",
                          "id": "fpuqxr7ahshmwrh",
                          "name": "Pardavimai",
                          "updated": "2023-02-20 12:31:25.363Z",
                          "expand": {}
                        }
                      ]})
                case "divisions_departments":
                    return Promise.resolve({items:[
                      {
                          "collectionId": "ter9l3qqq9aqgj2",
                          "collectionName": "divisions_departments",
                          "created": "2023-02-20 12:03:04.408Z",
                          "department_id": "h3cchigia2xtmzk",
                          "division_id": "1uio162voxfj2ot",
                          "expand": {
                              "division_id": {
                                  "collectionId": "bakpn5k6ntn68n3",
                                  "collectionName": "divisions",
                                  "created": "2023-02-20 10:00:29.661Z",
                                  "id": "1uio162voxfj2ot",
                                  "name": "HRD",
                                  "updated": "2023-07-12 09:00:12.518Z",
                                  "expand": {}
                              }
                          },
                          "id": "ok4kr4d68q9y02c",
                          "updated": "2023-02-20 12:03:04.408Z"
                      }
                  ]})
            }
        },
        $UpdateRecord()
        {
            return Promise.resolve(true)
        }
      },
    });
    wrapper.vm.$store.state.Form.id = "1"
  });



  it("Should Populate Input Fields With Data From Record", () => {
    const InputField = wrapper.find('input')
    expect(InputField.element.value).toContain('IoT akademija')
  })

  it("Should Validate Form On Pressing Submit Button",async ()=>{
    const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(0)
    const SubmitButton = wrapper.findAll('button').at(1)
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
  })


  it("Should Not Let Submit Form If Required Field Is Missing Information",async ()=>{
    const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
    const InputField = wrapper.find('input')
    const SubmitButton = wrapper.findAll('button').at(1)
    expect(ValidateFormSpy).toHaveBeenCalledTimes(0)
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
    expect(ValidateFormSpy).toHaveLastReturnedWith(true)

    InputField.setValue('')
    await wrapper.vm.$nextTick()
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(2)
    expect(ValidateFormSpy).toHaveLastReturnedWith(false)

    wrapper.vm.$data.tags = [{text:'test'}]
    InputField.setValue('Testing')
    await wrapper.vm.$nextTick()
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(3)
    expect(ValidateFormSpy).toHaveLastReturnedWith(true)
  })
  it("Should Set Success Message if Record Is Updated",async ()=>{
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)
    await wrapper.findAll('button').at(1).trigger('click')
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Sėkmingai atnaujintas skyrius',type:'success'})
  })
  it("Should Set Failure Message If Records Failed To Update",async ()=>{
    wrapper = createWrapper(EditDepartmentForm, {
      mocks: {
        $GetSingleRecord() {
            return Promise.resolve({"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:02:43.008Z","id":"h3cchigia2xtmzk","name":"IoT akademija","updated":"2023-07-17 13:55:11.312Z","expand":{}});
        },
        $GetCollection({Collection})
        {
            switch(Collection)
            {
                case 'divisions':
                    return Promise.resolve({items:[
                        {
                          "collectionId": "bakpn5k6ntn68n3",
                          "collectionName": "divisions",
                          "created": "2023-02-20 10:00:29.661Z",
                          "id": "1uio162voxfj2ot",
                          "name": "HRD",
                          "updated": "2023-07-20 04:20:51.210Z",
                          "expand": {}
                        },
                        {
                          "collectionId": "bakpn5k6ntn68n3",
                          "collectionName": "divisions",
                          "created": "2023-02-20 10:00:42.505Z",
                          "id": "dmgqn0scy1z4qym",
                          "name": "RnD",
                          "updated": "2023-02-20 12:03:13.973Z",
                          "expand": {}
                        },
                        {
                          "collectionId": "bakpn5k6ntn68n3",
                          "collectionName": "divisions",
                          "created": "2023-02-20 12:29:49.776Z",
                          "id": "5xwpimcs50j6ygi",
                          "name": "Administracija",
                          "updated": "2023-02-20 12:43:38.491Z",
                          "expand": {}
                        },
                        {
                          "collectionId": "bakpn5k6ntn68n3",
                          "collectionName": "divisions",
                          "created": "2023-02-20 12:31:19.756Z",
                          "id": "53fjrf5alo40nc2",
                          "name": "Marketingas",
                          "updated": "2023-02-20 12:31:19.756Z",
                          "expand": {}
                        },
                        {
                          "collectionId": "bakpn5k6ntn68n3",
                          "collectionName": "divisions",
                          "created": "2023-02-20 12:31:25.363Z",
                          "id": "fpuqxr7ahshmwrh",
                          "name": "Pardavimai",
                          "updated": "2023-02-20 12:31:25.363Z",
                          "expand": {}
                        }
                      ]})
                case "divisions_departments":
                    return Promise.resolve({items:[
                      {
                          "collectionId": "ter9l3qqq9aqgj2",
                          "collectionName": "divisions_departments",
                          "created": "2023-02-20 12:03:04.408Z",
                          "department_id": "h3cchigia2xtmzk",
                          "division_id": "1uio162voxfj2ot",
                          "expand": {
                              "division_id": {
                                  "collectionId": "bakpn5k6ntn68n3",
                                  "collectionName": "divisions",
                                  "created": "2023-02-20 10:00:29.661Z",
                                  "id": "1uio162voxfj2ot",
                                  "name": "HRD",
                                  "updated": "2023-07-12 09:00:12.518Z",
                                  "expand": {}
                              }
                          },
                          "id": "ok4kr4d68q9y02c",
                          "updated": "2023-02-20 12:03:04.408Z"
                      }
                  ]})
            }
        },
        $UpdateRecord()
        {
            return Promise.resolve(null)
        },
        $CreateRecord()
        {
          return Promise.resolve(null)
        },
        $DeleteRecord()
        {
          return Promise.resolve(null)
        }
      },
    
      });
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)
    const InputField = wrapper.find('input')
    await InputField.setValue('Test')
    await wrapper.findAll('button').at(1).trigger('click')
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Nepavyko atnaujinti skyriaus',type:'error'})
  })
  
    


});

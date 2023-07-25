import { describe, it, expect, vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import EditGroupForm from "../../../../src/Components/Form/Forms/Group/EditGroupForm.vue";
describe("EditCompanyForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(EditGroupForm, {
      mocks: {
        $GetSingleRecord() {
            return Promise.resolve({"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:02:43.008Z","id":"h3cchigia2xtmzk","name":"IoT akademija","updated":"2023-07-17 13:55:11.312Z","expand":{}});
        },
        $GetCollection({Collection})
        {
            switch(Collection)
            {
                case 'departments':
                    return Promise.resolve({items:[
                        {
                            "collectionId": "bthy7mqw35rkvvb",
                            "collectionName": "departments",
                            "created": "2023-02-20 12:02:43.008Z",
                            "id": "h3cchigia2xtmzk",
                            "name": "IoT akademija",
                            "updated": "2023-07-17 13:55:11.312Z"
                        },
                        {
                            "collectionId": "bthy7mqw35rkvvb",
                            "collectionName": "departments",
                            "created": "2023-02-20 12:36:51.570Z",
                            "id": "yyn7p8ka5stjvr6",
                            "name": "Testavimo",
                            "updated": "2023-02-20 12:37:45.732Z"
                        },
                        {
                            "collectionId": "bthy7mqw35rkvvb",
                            "collectionName": "departments",
                            "created": "2023-02-20 12:37:29.907Z",
                            "id": "3e8d0k0jpeg7pvg",
                            "name": "Konstruktorių",
                            "updated": "2023-02-20 12:37:42.835Z"
                        },
                        {
                            "collectionId": "bthy7mqw35rkvvb",
                            "collectionName": "departments",
                            "created": "2023-02-20 12:37:50.627Z",
                            "id": "w0bc7yv297l1uej",
                            "name": "Programuotojų",
                            "updated": "2023-02-20 12:37:50.627Z"
                        },
                        {
                            "collectionId": "bthy7mqw35rkvvb",
                            "collectionName": "departments",
                            "created": "2023-02-20 12:43:20.937Z",
                            "id": "pwg05eofg41afyi",
                            "name": "Biuro ir vadybos",
                            "updated": "2023-02-20 12:43:20.937Z"
                        },
                        {
                            "collectionId": "bthy7mqw35rkvvb",
                            "collectionName": "departments",
                            "created": "2023-02-20 12:43:57.537Z",
                            "id": "8t31iyvwrhqnmiq",
                            "name": "IT adminsitratorių",
                            "updated": "2023-02-20 12:43:57.537Z"
                        },
                        {
                            "collectionId": "bthy7mqw35rkvvb",
                            "collectionName": "departments",
                            "created": "2023-02-23 13:45:43.047Z",
                            "id": "9y1n8rkzaojgqzz",
                            "name": "Not existing",
                            "updated": "2023-02-23 13:45:43.047Z"
                        }
                    ]})
                case "departments_groups":
                    return Promise.resolve({items:[
                         {
                          collectionId: 'tc5kfi49ge03emy',
                          collectionName: 'departments_groups',
                          created: '2023-02-20 12:40:00.460Z',
                          department_id: 'w0bc7yv297l1uej',
                          expand: {
                            department_id: {
                              collectionId: 'bthy7mqw35rkvvb',
                              collectionName: 'departments',
                              created: '2023-02-20 12:37:50.627Z',
                              id: 'w0bc7yv297l1uej',
                              name: 'Programuotojų',
                              updated: '2023-02-20 12:37:50.627Z',
                              expand: {}
                            }
                          },
                          group_id: 'oambg9goguergbw',
                          id: '9naeurwm6u54tl1',
                          updated: '2023-02-20 12:40:00.460Z',
                        },
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
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Sėkmingai atnaujinta grupė',type:'success'})
  })
  it("Should Set Failure Message If Records Failed To Update",async ()=>{
    wrapper = createWrapper(EditGroupForm, {
        mocks: {
          $GetSingleRecord() {
              return Promise.resolve({"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:02:43.008Z","id":"h3cchigia2xtmzk","name":"IoT akademija","updated":"2023-07-17 13:55:11.312Z","expand":{}});
          },
          $GetCollection({Collection})
          {
              switch(Collection)
              {
                  case 'departments':
                      return Promise.resolve({items:[
                          {
                              "collectionId": "bthy7mqw35rkvvb",
                              "collectionName": "departments",
                              "created": "2023-02-20 12:02:43.008Z",
                              "id": "h3cchigia2xtmzk",
                              "name": "IoT akademija",
                              "updated": "2023-07-17 13:55:11.312Z"
                          },
                          {
                              "collectionId": "bthy7mqw35rkvvb",
                              "collectionName": "departments",
                              "created": "2023-02-20 12:36:51.570Z",
                              "id": "yyn7p8ka5stjvr6",
                              "name": "Testavimo",
                              "updated": "2023-02-20 12:37:45.732Z"
                          },
                          {
                              "collectionId": "bthy7mqw35rkvvb",
                              "collectionName": "departments",
                              "created": "2023-02-20 12:37:29.907Z",
                              "id": "3e8d0k0jpeg7pvg",
                              "name": "Konstruktorių",
                              "updated": "2023-02-20 12:37:42.835Z"
                          },
                          {
                              "collectionId": "bthy7mqw35rkvvb",
                              "collectionName": "departments",
                              "created": "2023-02-20 12:37:50.627Z",
                              "id": "w0bc7yv297l1uej",
                              "name": "Programuotojų",
                              "updated": "2023-02-20 12:37:50.627Z"
                          },
                          {
                              "collectionId": "bthy7mqw35rkvvb",
                              "collectionName": "departments",
                              "created": "2023-02-20 12:43:20.937Z",
                              "id": "pwg05eofg41afyi",
                              "name": "Biuro ir vadybos",
                              "updated": "2023-02-20 12:43:20.937Z"
                          },
                          {
                              "collectionId": "bthy7mqw35rkvvb",
                              "collectionName": "departments",
                              "created": "2023-02-20 12:43:57.537Z",
                              "id": "8t31iyvwrhqnmiq",
                              "name": "IT adminsitratorių",
                              "updated": "2023-02-20 12:43:57.537Z"
                          },
                          {
                              "collectionId": "bthy7mqw35rkvvb",
                              "collectionName": "departments",
                              "created": "2023-02-23 13:45:43.047Z",
                              "id": "9y1n8rkzaojgqzz",
                              "name": "Not existing",
                              "updated": "2023-02-23 13:45:43.047Z"
                          }
                      ]})
                  case "departments_groups":
                      return Promise.resolve({items:[
                           {
                            collectionId: 'tc5kfi49ge03emy',
                            collectionName: 'departments_groups',
                            created: '2023-02-20 12:40:00.460Z',
                            department_id: 'w0bc7yv297l1uej',
                            expand: {
                              department_id: {
                                collectionId: 'bthy7mqw35rkvvb',
                                collectionName: 'departments',
                                created: '2023-02-20 12:37:50.627Z',
                                id: 'w0bc7yv297l1uej',
                                name: 'Programuotojų',
                                updated: '2023-02-20 12:37:50.627Z',
                                expand: {}
                              }
                            },
                            group_id: 'oambg9goguergbw',
                            id: '9naeurwm6u54tl1',
                            updated: '2023-02-20 12:40:00.460Z',
                          },
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
      wrapper.vm.$store.state.Form.id = "1"

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)
    const InputField = wrapper.find('input')
    await InputField.setValue('Test')
    await wrapper.findAll('button').at(1).trigger('click')
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Nepavyko atnaujinti grupės',type:'error'})
  })
  
    


});

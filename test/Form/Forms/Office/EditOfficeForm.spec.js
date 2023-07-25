import { describe, it, expect, vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import EditOfficeForm from "../../../../src/Components/Form/Forms/Office/EditOfficeForm.vue";
describe("EditCompanyForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(EditOfficeForm, {
      mocks: {
        $GetSingleRecord() {
            return Promise.resolve({"city":"Kaunas","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:51:32.012Z","id":"vm438vfq27bg17e","name":"K. Baršausko st. 66, Kaunas, Lithuania","street":"K. Baršausko st.","street_number":"66","updated":"2023-07-17 13:55:03.870Z","expand":{}});
        },
        $GetCollection({Collection})
        {
            switch(Collection)
            {
                case 'companies':
                    return Promise.resolve({items:[
                        {
                            "collectionId": "6pm3nos89zp7y7o",
                            "collectionName": "companies",
                            "created": "2023-02-20 11:44:14.612Z",
                            "id": "5ask1scw3rf23yq",
                            "name": "TELTONIKA NETWORKS",
                            "updated": "2023-07-17 13:54:58.277Z"
                        },
                        {
                            "collectionId": "6pm3nos89zp7y7o",
                            "collectionName": "companies",
                            "created": "2023-02-20 11:44:22.744Z",
                            "id": "yqxlilctgbchc22",
                            "name": "TELTONIKA TELEMATICS",
                            "updated": "2023-02-20 11:44:22.744Z"
                        },
                        {
                            "collectionId": "6pm3nos89zp7y7o",
                            "collectionName": "companies",
                            "created": "2023-02-21 11:57:14.240Z",
                            "id": "gud0wunpwb8g08e",
                            "name": "TELTONIKA ENERGY",
                            "updated": "2023-02-21 12:01:52.080Z"
                        }
                    ]})
                case "companies_offices":
                    return Promise.resolve({items:[
                         {
                          collectionId: '69msfhns5ee63rg',
                          collectionName: 'companies_offices',
                          company_id: '5ask1scw3rf23yq',
                          created: '2023-02-20 11:50:09.060Z',
                          expand: {
                            company_id:  {
                              collectionId: '6pm3nos89zp7y7o',
                              collectionName: 'companies',
                              created: '2023-02-20 11:44:14.612Z',
                              id: '5ask1scw3rf23yq',
                              name: 'TELTONIKA NETWORKS',
                              updated: '2023-07-17 13:54:58.277Z',
                              expand: {}
                            }
                          },
                          id: 'lq7ibz15ismb62d',
                          office_id: 'vm438vfq27bg17e',
                          updated: '2023-02-20 11:50:09.060Z'
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
    expect(wrapper.findAll('input').at(0).element.value).toBe("K. Baršausko st.")
    expect(wrapper.findAll('input').at(1).element.value).toBe("66")
    expect(wrapper.findAll('input').at(2).element.value).toBe("Kaunas")
    expect(wrapper.findAll('input').at(3).element.value).toBe("Lithuania")
    expect(wrapper.vm.$data.tags).toStrictEqual([{"text":"TELTONIKA NETWORKS","id":"5ask1scw3rf23yq"}])
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
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Sėkmingai atnaujintas ofisas',type:'success'})
  })
  it("Should Set Failure Message If Records Failed To Update",async ()=>{
    wrapper = createWrapper(EditOfficeForm, {
        mocks: {
          $GetSingleRecord() {
              return Promise.resolve({"city":"Kaunas","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:51:32.012Z","id":"vm438vfq27bg17e","name":"K. Baršausko st. 66, Kaunas, Lithuania","street":"K. Baršausko st.","street_number":"66","updated":"2023-07-17 13:55:03.870Z","expand":{}});
          },
          $GetCollection({Collection})
          {
              switch(Collection)
              {
                  case 'companies':
                      return Promise.resolve({items:[
                          {
                              "collectionId": "6pm3nos89zp7y7o",
                              "collectionName": "companies",
                              "created": "2023-02-20 11:44:14.612Z",
                              "id": "5ask1scw3rf23yq",
                              "name": "TELTONIKA NETWORKS",
                              "updated": "2023-07-17 13:54:58.277Z"
                          },
                          {
                              "collectionId": "6pm3nos89zp7y7o",
                              "collectionName": "companies",
                              "created": "2023-02-20 11:44:22.744Z",
                              "id": "yqxlilctgbchc22",
                              "name": "TELTONIKA TELEMATICS",
                              "updated": "2023-02-20 11:44:22.744Z"
                          },
                          {
                              "collectionId": "6pm3nos89zp7y7o",
                              "collectionName": "companies",
                              "created": "2023-02-21 11:57:14.240Z",
                              "id": "gud0wunpwb8g08e",
                              "name": "TELTONIKA ENERGY",
                              "updated": "2023-02-21 12:01:52.080Z"
                          }
                      ]})
                  case "companies_offices":
                      return Promise.resolve({items:[
                           {
                            collectionId: '69msfhns5ee63rg',
                            collectionName: 'companies_offices',
                            company_id: '5ask1scw3rf23yq',
                            created: '2023-02-20 11:50:09.060Z',
                            expand: {
                              company_id:  {
                                collectionId: '6pm3nos89zp7y7o',
                                collectionName: 'companies',
                                created: '2023-02-20 11:44:14.612Z',
                                id: '5ask1scw3rf23yq',
                                name: 'TELTONIKA NETWORKS',
                                updated: '2023-07-17 13:54:58.277Z',
                                expand: {}
                              }
                            },
                            id: 'lq7ibz15ismb62d',
                            office_id: 'vm438vfq27bg17e',
                            updated: '2023-02-20 11:50:09.060Z'
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
      wrapper.vm.$store.state.Form.id = "1"

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)
    const InputField = wrapper.find('input')
    await InputField.setValue('Test')
    await wrapper.findAll('button').at(1).trigger('click')
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Nepavyko atnaujinti ofiso',type:'error'})
  })
  
    


});


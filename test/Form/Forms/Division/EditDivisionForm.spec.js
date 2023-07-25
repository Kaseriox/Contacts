import { describe, it, expect, vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import EditDivisionForm from "../../../../src/Components/Form/Forms/Division/EditDivisionForm.vue";
describe("EditCompanyForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(EditDivisionForm, {
      mocks: {
        $GetSingleRecord() {
            return Promise.resolve({
                "collectionId": "bakpn5k6ntn68n3",
                "collectionName": "divisions",
                "created": "2023-02-20 10:00:29.661Z",
                "id": "1uio162voxfj2ot",
                "name": "HRD",
                "updated": "2023-07-12 09:00:12.518Z",
                "expand": {}
            });
        },
        $GetCollection({Collection})
        {
            switch(Collection)
            {
                case 'offices':
                    return Promise.resolve({items:[
                        {
                            "city": "Kaunas",
                            "collectionId": "sgv7cbhlqq9svxa",
                            "collectionName": "offices",
                            "country": "Lithuania",
                            "created": "2023-02-20 09:51:32.012Z",
                            "id": "vm438vfq27bg17e",
                            "name": "K. Baršausko st. 66, Kaunas, Lithuania",
                            "street": "K. Baršausko st.",
                            "street_number": "66",
                            "updated": "2023-07-12 09:00:54.925Z",
                            "expand": {}
                        },
                        {
                            "city": "Vilnius",
                            "collectionId": "sgv7cbhlqq9svxa",
                            "collectionName": "offices",
                            "country": "Lithuania",
                            "created": "2023-02-20 09:57:31.159Z",
                            "id": "sc6mh0r9dny79um",
                            "name": "Saltoniškių st. 2, Vilnius, Lithuania",
                            "street": "Saltoniškių st.",
                            "street_number": "2",
                            "updated": "2023-02-20 12:26:53.095Z",
                            "expand": {}
                        },
                        {
                            "city": "Vilnius",
                            "collectionId": "sgv7cbhlqq9svxa",
                            "collectionName": "offices",
                            "country": "Lithuania",
                            "created": "2023-02-20 09:59:45.806Z",
                            "id": "6nfo4x8qda3rfhi",
                            "name": "Saltoniškių st. 9B-1, Vilnius, Lithuania",
                            "street": "Saltoniškių st.",
                            "street_number": "9B-1",
                            "updated": "2023-02-20 12:26:27.397Z",
                            "expand": {}
                        },
                        {
                            "city": "Kaunas",
                            "collectionId": "sgv7cbhlqq9svxa",
                            "collectionName": "offices",
                            "country": "Lithuania",
                            "created": "2023-02-21 12:10:52.834Z",
                            "id": "vcu1j5pg3hxjonj",
                            "name": "Jonavos st. 150, Kaunas, Lithuania",
                            "street": "Jonavos st.",
                            "street_number": "150",
                            "updated": "2023-02-21 12:18:04.110Z",
                            "expand": {}
                        }
                    ]})
                case "offices_divisions":
                    return Promise.resolve({items:[
                        {
                            "collectionId": "zzim4v132ojclwp",
                            "collectionName": "offices_divisions",
                            "created": "2023-02-20 12:35:15.024Z",
                            "division_id": "1uio162voxfj2ot",
                            "expand": {
                                "office_id": {
                                    "city": "Kaunas",
                                    "collectionId": "sgv7cbhlqq9svxa",
                                    "collectionName": "offices",
                                    "country": "Lithuania",
                                    "created": "2023-02-20 09:51:32.012Z",
                                    "id": "vm438vfq27bg17e",
                                    "name": "K. Baršausko st. 66, Kaunas, Lithuania",
                                    "street": "K. Baršausko st.",
                                    "street_number": "66",
                                    "updated": "2023-07-12 09:00:54.925Z",
                                    "expand": {}
                                }
                            },
                            "id": "np91m88tuhv0nzv",
                            "office_id": "vm438vfq27bg17e",
                            "updated": "2023-02-20 12:35:15.024Z"
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
    expect(InputField.element.value).toContain('HRD')
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
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Sėkmingai atnaujintas padalinys',type:'success'})
  })
  it("Should Set Failure Message If Records Failed To Update",async ()=>{
    wrapper = createWrapper(EditDivisionForm, {
        mocks: {
          $GetSingleRecord() {
              return Promise.resolve({
                  "collectionId": "bakpn5k6ntn68n3",
                  "collectionName": "divisions",
                  "created": "2023-02-20 10:00:29.661Z",
                  "id": "1uio162voxfj2ot",
                  "name": "HRD",
                  "updated": "2023-07-12 09:00:12.518Z",
                  "expand": {}
              });
          },
          $GetCollection({Collection})
          {
              switch(Collection)
              {
                  case 'offices':
                      return Promise.resolve({items:[
                          {
                              "city": "Kaunas",
                              "collectionId": "sgv7cbhlqq9svxa",
                              "collectionName": "offices",
                              "country": "Lithuania",
                              "created": "2023-02-20 09:51:32.012Z",
                              "id": "vm438vfq27bg17e",
                              "name": "K. Baršausko st. 66, Kaunas, Lithuania",
                              "street": "K. Baršausko st.",
                              "street_number": "66",
                              "updated": "2023-07-12 09:00:54.925Z",
                              "expand": {}
                          },
                          {
                              "city": "Vilnius",
                              "collectionId": "sgv7cbhlqq9svxa",
                              "collectionName": "offices",
                              "country": "Lithuania",
                              "created": "2023-02-20 09:57:31.159Z",
                              "id": "sc6mh0r9dny79um",
                              "name": "Saltoniškių st. 2, Vilnius, Lithuania",
                              "street": "Saltoniškių st.",
                              "street_number": "2",
                              "updated": "2023-02-20 12:26:53.095Z",
                              "expand": {}
                          },
                          {
                              "city": "Vilnius",
                              "collectionId": "sgv7cbhlqq9svxa",
                              "collectionName": "offices",
                              "country": "Lithuania",
                              "created": "2023-02-20 09:59:45.806Z",
                              "id": "6nfo4x8qda3rfhi",
                              "name": "Saltoniškių st. 9B-1, Vilnius, Lithuania",
                              "street": "Saltoniškių st.",
                              "street_number": "9B-1",
                              "updated": "2023-02-20 12:26:27.397Z",
                              "expand": {}
                          },
                          {
                              "city": "Kaunas",
                              "collectionId": "sgv7cbhlqq9svxa",
                              "collectionName": "offices",
                              "country": "Lithuania",
                              "created": "2023-02-21 12:10:52.834Z",
                              "id": "vcu1j5pg3hxjonj",
                              "name": "Jonavos st. 150, Kaunas, Lithuania",
                              "street": "Jonavos st.",
                              "street_number": "150",
                              "updated": "2023-02-21 12:18:04.110Z",
                              "expand": {}
                          }
                      ]})
                  case "offices_divisions":
                      return Promise.resolve({items:[
                          {
                              "collectionId": "zzim4v132ojclwp",
                              "collectionName": "offices_divisions",
                              "created": "2023-02-20 12:35:15.024Z",
                              "division_id": "1uio162voxfj2ot",
                              "expand": {
                                  "office_id": {
                                      "city": "Kaunas",
                                      "collectionId": "sgv7cbhlqq9svxa",
                                      "collectionName": "offices",
                                      "country": "Lithuania",
                                      "created": "2023-02-20 09:51:32.012Z",
                                      "id": "vm438vfq27bg17e",
                                      "name": "K. Baršausko st. 66, Kaunas, Lithuania",
                                      "street": "K. Baršausko st.",
                                      "street_number": "66",
                                      "updated": "2023-07-12 09:00:54.925Z",
                                      "expand": {}
                                  }
                              },
                              "id": "np91m88tuhv0nzv",
                              "office_id": "vm438vfq27bg17e",
                              "updated": "2023-02-20 12:35:15.024Z"
                          }
                      ]})
              }
          },
          $UpdateRecord()
          {
              return Promise.resolve(null)
          },
          $DeleteRecord()
          {
                return Promise.resolve(null)
          },
          $CreateRecord()
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
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Nepavyko atnaujinti padalinio',type:'error'})
  })
  
    


});

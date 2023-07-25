import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import CreateDivisionForm from "../../../../src/Components/Form/Forms/Division/CreateDivisionForm.vue"
import Input from "../../../../src/Components/InputField/InputField.vue"
import VueTagsInput from "@johmun/vue-tags-input";
describe("CreateDivisionForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(CreateDivisionForm,{
        mocks:{
            $GetCollection()
            {
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
            }
        }
    });
    wrapper.vm.$data.tags=[{"text":"Jonavos st. 150, Kaunas, Lithuania","id":"vcu1j5pg3hxjonj","tiClasses":["ti-valid"]}]
  });

  it('Should Contain All Necessary Fields ', ()=>{
    const InputFields = wrapper.findAllComponents(Input)
    const VueTagsInputFields = wrapper.findAllComponents(VueTagsInput)
    expect(InputFields.exists()).toBeTruthy()
    expect(InputFields).toHaveLength(1)
    expect(VueTagsInputFields).toBeTruthy()
    expect(VueTagsInputFields).toHaveLength(1)


  })

  it("Should Validate Form When Trying To Submit It",async ()=>{
    const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(0)
    const SubmitButton = wrapper.findAll('button').at(1)
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
  })

  it("Form Should Make Sure All Required Fields Are Populated Correctly Before Submitting",async ()=>{
    
    const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(0)

    const SubmitButton = wrapper.findAll('button').at(1)

   const InputField = wrapper.find('input')
   await SubmitButton.trigger('click')
   expect(ValidateFormSpy).toHaveLastReturnedWith(false)
   expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
   wrapper.vm.$data.tags=[]
   await InputField.setValue('Test')
   await SubmitButton.trigger('click')
   expect(ValidateFormSpy).toHaveLastReturnedWith(false)
   expect(ValidateFormSpy).toHaveBeenCalledTimes(2)
   wrapper.vm.$data.tags=[{"text":"Jonavos st. 150, Kaunas, Lithuania","id":"vcu1j5pg3hxjonj","tiClasses":["ti-valid"]}]
   await SubmitButton.trigger('click')
   expect(ValidateFormSpy).toHaveLastReturnedWith(true)
   expect(ValidateFormSpy).toHaveBeenCalledTimes(3)

})

  it('Should Display Message If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')

    const InputField = wrapper.find('input')
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)

    await InputField.setValue('Test')
    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({
        message: `Sėkmingai sukurtas padalinys`,
        type: "success",
      })

  })

  it('Should Close Modal Form If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const CloseSpy = vi.spyOn(wrapper.vm,'Close')

    const InputField = wrapper.find('input')
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(CloseSpy).toHaveBeenCalledTimes(0)

    await InputField.setValue('Test')
    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(CloseSpy).toHaveBeenCalledTimes(1)


  })

  it('Should Call Refresh Method If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const RefreshSpy = vi.spyOn(wrapper.vm,'refresh')

    const InputField = wrapper.find('input')
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(RefreshSpy).toHaveBeenCalledTimes(0)

    await InputField.setValue('Test')
    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(RefreshSpy).toHaveBeenCalledTimes(1)
  })

  it('Should Set Failure Message If Creating Record Failed',async ()=>{
    wrapper = createWrapper(CreateDivisionForm,{
        mocks:{
            $CreateRecord()
                {
                    return Promise.resolve(null)
                },
                $GetCollection()
            {
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
            }
        }
       })
    wrapper.vm.$data.tags=[{"text":"Jonavos st. 150, Kaunas, Lithuania","id":"vcu1j5pg3hxjonj","tiClasses":["ti-valid"]}]
    await wrapper.vm.$nextTick()
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')

    const InputField = wrapper.find('input')
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)

    await InputField.setValue('Test')
    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({
        message: "Nepavyko sukurti padalinio",
        type: "error",
      })
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
  })
})

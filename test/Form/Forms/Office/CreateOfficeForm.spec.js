import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import CreateOfficeForm from "../../../../src/Components/Form/Forms/Office/CreateOfficeForm.vue"
import Input from "../../../../src/Components/InputField/InputField.vue"
import VueTagsInput from "@johmun/vue-tags-input";
describe("CreateOfficeForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(CreateOfficeForm,{
        mocks:{
            $GetCollection()
            {
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
            }
        }
    });
  });

  it('Should Contain All Necessary Fields ', ()=>{
    const InputFields = wrapper.findAllComponents(Input)
    const VueTagsInputFields = wrapper.findAllComponents(VueTagsInput)
    expect(InputFields.exists()).toBeTruthy()
    expect(InputFields).toHaveLength(4)
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

   await SubmitButton.trigger('click')
   expect(ValidateFormSpy).toHaveLastReturnedWith(false)
   expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
   
   await wrapper.findAll('input').at(0).setValue('Test')
   await SubmitButton.trigger('click')
   expect(ValidateFormSpy).toHaveLastReturnedWith(false)
   expect(ValidateFormSpy).toHaveBeenCalledTimes(2)

   await wrapper.findAll('input').at(1).setValue('12')
   await SubmitButton.trigger('click')
   expect(ValidateFormSpy).toHaveLastReturnedWith(false)
   expect(ValidateFormSpy).toHaveBeenCalledTimes(3)

   await wrapper.findAll('input').at(2).setValue('Testing')
   await SubmitButton.trigger('click')
   expect(ValidateFormSpy).toHaveLastReturnedWith(false)
   expect(ValidateFormSpy).toHaveBeenCalledTimes(4)


   await wrapper.findAll('input').at(3).setValue('TestCountry')
   await SubmitButton.trigger('click')
   expect(ValidateFormSpy).toHaveLastReturnedWith(false)
   expect(ValidateFormSpy).toHaveBeenCalledTimes(5)


   wrapper.vm.$data.tags = [{"text":"TELTONIKA NETWORKS","id":"5ask1scw3rf23yq","tiClasses":["ti-valid"]}]
   await SubmitButton.trigger('click')
   expect(ValidateFormSpy).toHaveLastReturnedWith(true)
   expect(ValidateFormSpy).toHaveBeenCalledTimes(6)

})

  it('Should Display Message If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)


    await wrapper.findAll('input').at(0).setValue('Test')
    await wrapper.findAll('input').at(1).setValue('12')
    await wrapper.findAll('input').at(2).setValue('Testing')
    await wrapper.findAll('input').at(3).setValue('TestCountry')
    wrapper.vm.$data.tags = [{"text":"TELTONIKA NETWORKS","id":"5ask1scw3rf23yq","tiClasses":["ti-valid"]}]

    await SubmitButton.trigger('click')

    await wrapper.vm.$nextTick()

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({
        message: `Sėkmingai sukurtas ofisas`,
        type: "success",
      })

  })

  it('Should Close Modal Form If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const CloseSpy = vi.spyOn(wrapper.vm,'Close')
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(CloseSpy).toHaveBeenCalledTimes(0)

    await wrapper.findAll('input').at(0).setValue('Test')
    await wrapper.findAll('input').at(1).setValue('12')
    await wrapper.findAll('input').at(2).setValue('Testing')
    await wrapper.findAll('input').at(3).setValue('TestCountry')
    wrapper.vm.$data.tags = [{"text":"TELTONIKA NETWORKS","id":"5ask1scw3rf23yq","tiClasses":["ti-valid"]}]
    await SubmitButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(CloseSpy).toHaveBeenCalledTimes(1)


  })

  it('Should Call Refresh Method If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const RefreshSpy = vi.spyOn(wrapper.vm,'refresh')

    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(RefreshSpy).toHaveBeenCalledTimes(0)

    await wrapper.findAll('input').at(0).setValue('Test')
    await wrapper.findAll('input').at(1).setValue('12')
    await wrapper.findAll('input').at(2).setValue('Testing')
    await wrapper.findAll('input').at(3).setValue('TestCountry')
    wrapper.vm.$data.tags = [{"text":"TELTONIKA NETWORKS","id":"5ask1scw3rf23yq","tiClasses":["ti-valid"]}]
    await SubmitButton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(RefreshSpy).toHaveBeenCalledTimes(1)
  })

  it('Should Set Failure Message If Creating Record Failed',async ()=>{
    wrapper = createWrapper(CreateOfficeForm,{
        mocks:{
            $GetCollection()
            {
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
            },
            $CreateRecord()
            {
                return Promise.resolve(null)
            }
        }
    });
    await wrapper.vm.$nextTick()
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')

    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)

    await wrapper.findAll('input').at(0).setValue('Test')
    await wrapper.findAll('input').at(1).setValue('12')
    await wrapper.findAll('input').at(2).setValue('Testing')
    await wrapper.findAll('input').at(3).setValue('TestCountry')
    wrapper.vm.$data.tags = [{"text":"TELTONIKA NETWORKS","id":"5ask1scw3rf23yq","tiClasses":["ti-valid"]}]
    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({
        message: "Nepavyko sukurti ofiso",
        type: "error",
      })
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
  })
})

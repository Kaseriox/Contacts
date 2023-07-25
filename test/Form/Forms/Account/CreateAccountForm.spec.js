import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import CreateAccountForm from "../../../../src/Components/Form/Forms/Account/CreateAccountForm.vue"
import Input from "../../../../src/Components/InputField/InputField.vue"
import UploadField from "../../../../src/Components/InputField/UploadField.vue"
import VueTagsInput from "@johmun/vue-tags-input";
describe("CreateAccountForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(CreateAccountForm);
  });

  it('Should Contain All Necessary Fields ', ()=>{
    const InputFields = wrapper.findAllComponents(Input)
    const UploadFields = wrapper.findAllComponents(UploadField)
    const VueTagsInputFields = wrapper.findAllComponents(VueTagsInput)
    expect(InputFields.exists()).toBeTruthy()
    expect(InputFields).toHaveLength(2)
    expect(UploadFields).toBeTruthy()
    expect(UploadFields).toHaveLength(1)
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

    const NameInputField = wrapper.findAll('input').at(0)
    const EmailInputField = wrapper.findAll('input').at(1)
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveReturnedWith(false)
    expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
    

    await NameInputField.setValue('Test')
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveReturnedWith(false)
    expect(ValidateFormSpy).toHaveBeenCalledTimes(2)

    await EmailInputField.setValue('Test')
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveReturnedWith(false)
    expect(ValidateFormSpy).toHaveBeenCalledTimes(3)

    await EmailInputField.setValue('Test@gmail.com')
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveReturnedWith(true)
    expect(ValidateFormSpy).toHaveBeenCalledTimes(4)

    await NameInputField.setValue('1455')
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveReturnedWith(false)
    expect(ValidateFormSpy).toHaveBeenCalledTimes(5)
  })

  it('Should Display Message If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')

    const NameInputField = wrapper.findAll('input').at(0)
    const EmailInputField = wrapper.findAll('input').at(1)
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)

    await NameInputField.setValue('Test')
    await EmailInputField.setValue('Test@gmail.com')
    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({
        message: `Paskyra sėkmingai sukurta`,
        type: "success",
      })

  })

  it('Should Close Modal Form If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const CloseSpy = vi.spyOn(wrapper.vm,'Close')

    const NameInputField = wrapper.findAll('input').at(0)
    const EmailInputField = wrapper.findAll('input').at(1)
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(CloseSpy).toHaveBeenCalledTimes(0)

    await NameInputField.setValue('Test')
    await EmailInputField.setValue('Test@gmail.com')
    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(CloseSpy).toHaveBeenCalledTimes(1)


  })

  it('Should Call Refresh Method If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const RefreshSpy = vi.spyOn(wrapper.vm,'refresh')

    const NameInputField = wrapper.findAll('input').at(0)
    const EmailInputField = wrapper.findAll('input').at(1)
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(RefreshSpy).toHaveBeenCalledTimes(0)

    await NameInputField.setValue('Test')
    await EmailInputField.setValue('Test@gmail.com')
    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(RefreshSpy).toHaveBeenCalledTimes(1)
  })

  it('Should Set Failure Message If Creating Record Failed',async ()=>{
   wrapper = createWrapper(CreateAccountForm,{
    mocks:{
        $CreateRecord()
            {
                return Promise.resolve(null)
            },
    }
   })
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')

    const NameInputField = wrapper.findAll('input').at(0)
    const EmailInputField = wrapper.findAll('input').at(1)
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)

    await NameInputField.setValue('Test')
    await EmailInputField.setValue('Test@gmail.com')
    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({
        message: "Nepavyko sukurti paskyros",
        type: "error",
      })
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
  })
})

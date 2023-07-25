import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import CreateCompanyForm from "../../../../src/Components/Form/Forms/Company/CreateCompanyForm.vue"
import Input from "../../../../src/Components/InputField/InputField.vue"
describe("CreateCompanyForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(CreateCompanyForm);
  });

  
  it('Should Contain All Necessary Fields ', ()=>{
    const InputFields = wrapper.findAllComponents(Input)
    expect(InputFields.exists()).toBeTruthy()
    expect(InputFields).toHaveLength(1)
  })

  it("Should Validate Form When Trying To Submit It",async ()=>{
    const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(0)
    const SubmitButton = wrapper.findAll('button').at(1)
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
  })

  it("Should Make Sure All Required Fields Are Populated When Submitting",async ()=>{
    const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(0)
    const SubmitButton = wrapper.findAll('button').at(1)
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
    expect(ValidateFormSpy).toHaveReturnedWith(false)

    const InputField = await wrapper.find('input')
    await InputField.setValue('Testing')
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(2)
    expect(ValidateFormSpy).toHaveReturnedWith(true)
  })

  it('Should Close Modal Form If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const CloseSpy = vi.spyOn(wrapper.vm,'Close')

    const InputField = wrapper.find('input')
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(CloseSpy).toHaveBeenCalledTimes(0)

    await InputField.setValue('Testing')
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

    await InputField.setValue('Testing')
    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(RefreshSpy).toHaveBeenCalledTimes(1)
  })
  it('Should Set Failure Message If Creating Record Failed',async ()=>{
    wrapper = createWrapper(CreateCompanyForm,{
     mocks:{
         $CreateRecord()
             {
                 return Promise.resolve(null)
             },
     }
    })
     const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
     const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
 
     const InputField = wrapper.find('input')
    const SubmitButton = wrapper.findAll('button').at(1)
 
     expect(HandleFormSpy).toHaveBeenCalledTimes(0)
     expect(SetMessageSpy).toHaveBeenCalledTimes(0)
 
     await InputField.setValue('Testing')
    await SubmitButton.trigger('click')
 
     expect(HandleFormSpy).toHaveBeenCalledTimes(1)
     expect(SetMessageSpy).toHaveBeenCalledWith({
         message: "Nepavyko sukurti įmonės",
         type: "error",
       })
     expect(SetMessageSpy).toHaveBeenCalledTimes(1)
   })
  
})

import { describe, it, expect, vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import EditCompanyForm from "../../../../src/Components/Form/Forms/Company/EditCompanyForm.vue";
describe("EditCompanyForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(EditCompanyForm, {
      mocks: {
        $GetSingleRecord() {
            return Promise.resolve({"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:14.612Z","id":"5ask1scw3rf23yq","name":"TELTONIKA NETWORKS","updated":"2023-07-17 13:54:58.277Z","expand":{}})
        },
        $UpdateRecord()
        {
            return Promise.resolve(true)
        }
      },
    });
  });



  it("Should Populate Input Fields With Data From Record", () => {
    
    const InputField = wrapper.find('input')
    expect(InputField.element.value).toContain('TELTONIKA NETWORKS')
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
    expect(ValidateFormSpy).toHaveReturned(true)

    InputField.setValue('')
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(2)
    expect(ValidateFormSpy).toHaveReturned(false)


    InputField.setValue('Testing')
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(3)
    expect(ValidateFormSpy).toHaveReturned(true)
  })
  it("Should Set Success Message if Record Is Updated",async ()=>{
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)
    await wrapper.findAll('button').at(1).trigger('click')
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Sėkmingai atnaujinta įmonė',type:'success'})
  })
  it("Should Set Failure Message If Records Failed To Update",async ()=>{
    wrapper = createWrapper(EditCompanyForm, {
        mocks: {
          $GetSingleRecord() {
              return Promise.resolve({"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:14.612Z","id":"5ask1scw3rf23yq","name":"TELTONIKA NETWORKS","updated":"2023-07-17 13:54:58.277Z","expand":{}})
          },
          $UpdateRecord()
          {
              return Promise.resolve(null)
          }
        },
      });
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)
    const InputField = wrapper.find('input')
    await InputField.setValue('Test')
    await wrapper.findAll('button').at(1).trigger('click')
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Nepavyko atnaujinti įmonės',type:'error'})
  })
  
    


});

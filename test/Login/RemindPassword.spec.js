import { describe, it, expect, vi } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import RemindPassword from "../../src/Components/Login/RemindPassword.vue"

describe("RemindPassword.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(RemindPassword,{
        mocks:{
            $PasswordReset(Email)
            {
                if(Email==='Test@email.com')
                {
                    return Promise.resolve(true)
                }
                return Promise.resolve({status:400})
            },
        }
    });
  });

  it("Should Return code 400 If Email Doesn't Exist In User Database",async ()=>{
    const RemindPasswordSpy = vi.spyOn(wrapper.vm,'$PasswordReset')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')

    expect(RemindPasswordSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)

    const EmailInput = wrapper.find('input')
    const SubmitForm = wrapper.find('form')

    await EmailInput.setValue('NotCorrect@email.com')
    await SubmitForm.trigger('submit')
    await wrapper.vm.$nextTick()

    expect(RemindPasswordSpy).toHaveBeenCalledTimes(1)
    expect(RemindPasswordSpy).toHaveBeenCalledWith('NotCorrect@email.com')
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Blogas Elektroninis paštas',type:'error'})
    
  })

  it("Should Succesfully Send Reset Password Message If Email Exists In User Database",async ()=>{
    const RemindPasswordSpy = vi.spyOn(wrapper.vm,'$PasswordReset')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')

    expect(RemindPasswordSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)

    const EmailInput = wrapper.find('input')
    const SubmitForm = wrapper.find('form')

    await EmailInput.setValue('Test@email.com')
    await SubmitForm.trigger('submit')
    await wrapper.vm.$nextTick()

    expect(RemindPasswordSpy).toHaveBeenCalledTimes(1)
    expect(RemindPasswordSpy).toHaveBeenCalledWith('Test@email.com')
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Slaptažodžio pakeitimas sėkmingai išsiųsta',type:'success'})
    
  })
  it("Should Not Let In To Login If Email Or Password Is Wrong",async ()=>
    {
        wrapper.destroy()
        wrapper = createWrapper(RemindPassword,{
            mocks:{
                $PasswordReset()
                {
                    return Promise.resolve({status:0})
                },
            }
        });

        const RemindPasswordSpy = vi.spyOn(wrapper.vm,'$PasswordReset')
        const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
    
        expect(RemindPasswordSpy).toHaveBeenCalledTimes(0)
        expect(SetMessageSpy).toHaveBeenCalledTimes(0)
    
        const EmailInput = wrapper.find('input')
        const SubmitForm = wrapper.find('form')
    
        await EmailInput.setValue('Test@email.com')
        await SubmitForm.trigger('submit')
        await wrapper.vm.$nextTick()
    
        expect(RemindPasswordSpy).toHaveBeenCalledTimes(1)
        expect(RemindPasswordSpy).toHaveBeenCalledWith('Test@email.com')
        expect(SetMessageSpy).toHaveBeenCalledTimes(1)
        expect(SetMessageSpy).toHaveBeenCalledWith({message:'Serveris neatsako',type:'error'})


        
    })

    it("Should Emit 'ChangeComponent'",async ()=>{
        const BackButton = wrapper.findAll('button').at(1)
        await BackButton.trigger('click')
        expect(wrapper.emitted().ChangeComponent).toBeTruthy()
        expect(wrapper.emitted().ChangeComponent.length).toBe(1)
    })
});

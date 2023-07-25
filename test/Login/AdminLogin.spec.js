import { describe, it, expect, vi } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import AdminLogin from "../../src/Components/Login/AdminLogin.vue"

describe("AdminLogin.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(AdminLogin,{
        mocks:{
            $Authenticate(Login)
            {
                if(Login.Email==='Test@email.com' && Login.Password==='Test123456')
                {
                    return Promise.resolve({status:200,token:'123456789'})
                }
                return Promise.resolve({status:400})
            },
        }
    });
  });

it("Should Not Let In To Login If Email Or Password Is Wrong",async ()=>
{
    const EmailInput = wrapper.findAll('input').at(0)
    const PasswordInput = wrapper.findAll('input').at(1)
    const SubmitForm = wrapper.find('form')


    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const AuthenticateSpy = vi.spyOn(wrapper.vm,'$Authenticate')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(AuthenticateSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)

    await EmailInput.setValue('Test@email.com')
    await PasswordInput.setValue('Test654')
    await SubmitForm.trigger('submit')
    await wrapper.vm.$nextTick()
    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(AuthenticateSpy).toHaveBeenCalledTimes(1)
    expect(AuthenticateSpy).toHaveReturnedWith({status:400})
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Elektroninis paštas arba slaptažodis neteisingas',type:'error'})
    
})

it("Should Not Let In To Login If Email Or Password Is Wrong",async ()=>
{
    const EmailInput = wrapper.findAll('input').at(0)
    const PasswordInput = wrapper.findAll('input').at(1)
    const SubmitForm = wrapper.find('form')


    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const AuthenticateSpy = vi.spyOn(wrapper.vm,'$Authenticate')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
    const RouterSpy = vi.spyOn(wrapper.vm.$router,'push')
    const SetUserDataSpy = vi.spyOn(wrapper.vm,'set_user_data')


    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(AuthenticateSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)
    expect(RouterSpy).toHaveBeenCalledTimes(0)
    expect(SetUserDataSpy).toHaveBeenCalledTimes(0)

    await EmailInput.setValue('Test@email.com')
    await PasswordInput.setValue('Test123456')
    await SubmitForm.trigger('submit')
    await wrapper.vm.$nextTick()

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(AuthenticateSpy).toHaveBeenCalledTimes(1)
    expect(AuthenticateSpy).toHaveReturnedWith({status:200,token:'123456789'})
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Sėkmingai prisijungta',type:'success'})
    expect(RouterSpy).toHaveBeenCalledTimes(1)
    expect(RouterSpy).toHaveBeenCalledWith('/')
    expect(SetUserDataSpy).toHaveBeenCalledTimes(1)
    expect(SetUserDataSpy).toHaveBeenCalledWith({status:200,token:'123456789'})
    
})
    

it("Should Not Let In To Login If Email Or Password Is Wrong",async ()=>
{
    wrapper.destroy()
    wrapper = createWrapper(AdminLogin,{
        mocks:{
            $Authenticate()
            {
                return Promise.resolve({status:0})
            },
        }
    });

    const EmailInput = wrapper.findAll('input').at(0)
    const PasswordInput = wrapper.findAll('input').at(1)
    const SubmitForm = wrapper.find('form')


    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const AuthenticateSpy = vi.spyOn(wrapper.vm,'$Authenticate')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(AuthenticateSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)

    await EmailInput.setValue('Test@email.com')
    await PasswordInput.setValue('Test654')
    await SubmitForm.trigger('submit')
    await wrapper.vm.$nextTick()

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(AuthenticateSpy).toHaveBeenCalledTimes(1)
    expect(AuthenticateSpy).toHaveReturnedWith({status:0})
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Serveris neatsako',type:'error'})
    
})

it('Back Button Should Bring Back To Main Page',async ()=>{
    const RouterSpy = vi.spyOn(wrapper.vm.$router,'push')
    const BackButton = wrapper.findAll('button').at(1)
    expect(RouterSpy).toHaveBeenCalledTimes(0)

    await BackButton.trigger('click')
    expect(RouterSpy).toHaveBeenCalledTimes(1)
    expect(RouterSpy).toHaveBeenCalledWith('/')
})

it('Pressing "Pakeisti slaptažodį" Should Emit "ChangeComponent"',async ()=>{
    const ChangePassword = wrapper.findAll('p').at(4)
    await ChangePassword.trigger('click')
    expect(wrapper.emitted().ChangeComponent).toBeTruthy()
    expect(wrapper.emitted().ChangeComponent.length).toBe(1)
})
});

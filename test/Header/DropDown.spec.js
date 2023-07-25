import { describe, it, expect,vi } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import DropDown from '../../src/Components/Header/DropDown.vue'
import ResetPassword from '../../src/Components/Form/Forms/ResetPassword/ResetPassword.vue'
describe("DropDown.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(DropDown);
  });

  it('Image With Admin Icon Should Exist',()=>{
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
  })

  it('Pressing On Image Should Activate Drop Down With Buttons',async ()=>{
    const img = wrapper.find('img')
    expect(wrapper.vm.$data.Active).toBe(false)
    await img.trigger('click')
    expect(wrapper.vm.$data.Active).toBe(true)
    let button = wrapper.findAll('button')
    expect(button.length).toBe(1)
    expect(button.at(0).text()).toContain('Prisijungti')

    await img.trigger('click')
    expect(wrapper.vm.$data.Active).toBe(false)
    wrapper.vm.$store.state.User.Data = {record:true}
    await wrapper.vm.$nextTick()
    await img.trigger('click')
    expect(wrapper.vm.$data.Active).toBe(true)
    button = wrapper.findAll('button')
    expect(button.length).toBe(2)
  })

  it('Should Call Login Method If "Prisijungti" Button Is Pressed',async ()=>{
    const img = wrapper.find('img')
    const LoginSpy = vi.spyOn(wrapper.vm,'Login')
    const RouterPushSpy = vi.spyOn(wrapper.vm.$router,'push')
    expect(wrapper.vm.$data.Active).toBe(false)
    expect(LoginSpy).toHaveBeenCalledTimes(0)
    expect(RouterPushSpy).toHaveBeenCalledTimes(0)

    await img.trigger('click')
    
    expect(wrapper.vm.$data.Active).toBe(true)
    const LoginButton = wrapper.find('button')
    expect(LoginButton.text()).toContain('Prisijungti')
    await LoginButton.trigger('click')
    expect(LoginSpy).toHaveBeenCalledTimes(1)
    expect(RouterPushSpy).toHaveBeenCalledTimes(1)
    expect(RouterPushSpy).toHaveBeenCalledWith('/login')
    expect(wrapper.vm.$data.Active).toBe(false)
  })

  it('The DropDown Menu Should Change If There Is User Data',async ()=>{
    const img = wrapper.find('img')
    wrapper.vm.$store.state.User.Data = {record:true}
    await wrapper.vm.$nextTick()

    await img.trigger('click')
    expect(wrapper.text()).toContain('Pakeisti slaptažodį')
    expect(wrapper.text()).toContain('Atsijungti')
  })

  it("Should Open Modal Form Once 'Pakeisti slaptažodį' button is pressed",async ()=>{
    const img = wrapper.find('img')
    const SetComponentSpy = vi.spyOn(wrapper.vm,'set_component')
    const OpenSpy = vi.spyOn(wrapper.vm,'open')

    expect(SetComponentSpy).toHaveBeenCalledTimes(0)
    expect(OpenSpy).toHaveBeenCalledTimes(0)

    wrapper.vm.$route.path = '/contacts'
    wrapper.vm.$store.state.User.Data = {record:true}
    await wrapper.vm.$nextTick()

    await img.trigger('click')
    const ChangePasswordButton = wrapper.findAll('button').at(0)
    await ChangePasswordButton.trigger('click')

    expect(SetComponentSpy).toHaveBeenCalledTimes(1)
    expect(SetComponentSpy).toHaveBeenCalledWith(ResetPassword)
    expect(OpenSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$data.Active).toBe(false)
  })

  it("Should Call Logout Method If 'Atsijungti' Button Is Pressed",async ()=>{
    const img = wrapper.find('img')
    const LogoutSpy = vi.spyOn(wrapper.vm,'Logout')
    const SetUserDataSpy = vi.spyOn(wrapper.vm,'set_user_data')
    const RouterPushSpy = vi.spyOn(wrapper.vm.$router,'push')

    expect(LogoutSpy).toHaveBeenCalledTimes(0)
    expect(SetUserDataSpy).toHaveBeenCalledTimes(0)
    expect(RouterPushSpy).toHaveBeenCalledTimes(0)


    wrapper.vm.$route.path = '/contacts'
    wrapper.vm.$store.state.User.Data = {record:true}
    await wrapper.vm.$nextTick()

    await img.trigger('click')
    const LogoutButton = wrapper.findAll('button').at(1)
    await LogoutButton.trigger('click')

    expect(LogoutSpy).toHaveBeenCalledTimes(1)
    expect(SetUserDataSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$store.state.User.Data).toBe(undefined)
    expect(RouterPushSpy).toHaveBeenCalledTimes(1)
  })


})
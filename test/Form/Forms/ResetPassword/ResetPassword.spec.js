import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import ResetPassword from "../../../../src/Components/Form/Forms/ResetPassword/ResetPassword.vue"
import Input from "../../../../src/Components/InputField/InputField.vue"
describe("ResetPassword.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(ResetPassword,{
        mocks:{
            $UpdateRecord()
            {
                return Promise.resolve({id:"1"})
            }
        }
    });
    wrapper.vm.$store.state.User.Data = {"record":{"avatar":"","collectionId":"_pb_users_auth_","collectionName":"users","created":"2023-02-20 09:51:12.612Z","email":"admin@teltonika.lt","emailVisibility":true,"expand":{"permissions_id":{"collectionId":"adadquft6s38bg8","collectionName":"user_permissions","created":"2023-02-20 09:49:38.574Z","delete_companies":true,"delete_employees":true,"delete_offices":true,"delete_permissions":true,"delete_structure":true,"edit_companies":true,"edit_employees":true,"edit_offices":true,"edit_permissions":true,"edit_structure":true,"id":"4y2zp4n8ehzyzi0","read_permissions":true,"updated":"2023-07-17 12:29:43.104Z","expand":{}}},"id":"ulzaiqke8x0xdi1","name":"Admin","permissions_id":"4y2zp4n8ehzyzi0","updated":"2023-07-18 04:11:52.259Z","username":"admin","verified":true},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE2OTE0NzM2NzcsImlkIjoidWx6YWlxa2U4eDB4ZGkxIiwidHlwZSI6ImF1dGhSZWNvcmQifQ.WEyTOfFLC4cCcv5iFgQA1BUaFNXFU1VbaKjQhgDnk0Q"}
  });


    it("Should Include 3 Input Fields",()=>{
       expect(wrapper.findAllComponents(Input)).toHaveLength(3)
    })
    it("Should Validate Form",async ()=>{
        const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
        expect(ValidateFormSpy).toHaveBeenCalledTimes(0)
        const SubmitButton = wrapper.findAll('button').at(1)
        await SubmitButton.trigger('click')
        expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
        expect(ValidateFormSpy).toHaveLastReturnedWith(false)

        await wrapper.findAll('input').at(0).setValue('TestTest')
        await SubmitButton.trigger('click')
        expect(ValidateFormSpy).toHaveBeenCalledTimes(2)
        expect(ValidateFormSpy).toHaveLastReturnedWith(false)
        
        await wrapper.findAll('input').at(1).setValue('Slaptažodis')
        await SubmitButton.trigger('click')
        expect(ValidateFormSpy).toHaveBeenCalledTimes(3)
        expect(ValidateFormSpy).toHaveLastReturnedWith(false)


        await wrapper.findAll('input').at(0).setValue('Test')
        await SubmitButton.trigger('click')
        expect(ValidateFormSpy).toHaveBeenCalledTimes(4)
        expect(ValidateFormSpy).toHaveLastReturnedWith(false)


      
        

        await wrapper.findAll('input').at(0).setValue('TestTest')
        await wrapper.findAll('input').at(1).setValue('Nesutampa')
        await SubmitButton.trigger('click')
        expect(ValidateFormSpy).toHaveBeenCalledTimes(5)
        expect(ValidateFormSpy).toHaveLastReturnedWith(false)
        expect(wrapper.vm.$data.error).toBe('Nauji Slaptažodžiai nesutampa')

        await wrapper.findAll('input').at(1).setValue('Slaptažodis')
        await wrapper.findAll('input').at(2).setValue('Slaptažodis')
        await SubmitButton.trigger('click')
        expect(ValidateFormSpy).toHaveBeenCalledTimes(6)
        expect(ValidateFormSpy).toHaveLastReturnedWith(true)



      
        await wrapper.findAll('input').at(1).setValue('Nesutampa')
        await SubmitButton.trigger('click')
        expect(ValidateFormSpy).toHaveBeenCalledTimes(7)
        expect(ValidateFormSpy).toHaveLastReturnedWith(false)
        expect(wrapper.vm.$data.error).toBe('Nauji Slaptažodžiai nesutampa')
    })

    it("Should Say That Password If Succesfully Changed",async ()=>{
        const MessageSpy = vi.spyOn(wrapper.vm,'set_message')
        expect(MessageSpy).toHaveBeenCalledTimes(0)
        const SubmitButton = wrapper.findAll('button').at(1)
 
        await wrapper.findAll('input').at(0).setValue('TestTest')
        await wrapper.findAll('input').at(1).setValue('Slaptažodis')
        await wrapper.findAll('input').at(2).setValue('Slaptažodis')
        await SubmitButton.trigger('click')
        await wrapper.vm.$nextTick()
        expect(MessageSpy).toHaveBeenCalledTimes(1)
        expect(MessageSpy).toHaveBeenCalledWith({message:'Sėkmingai atnaujintas slaptažodis',type:'success'})
    })

    it("Should Disconnect User When Password Is Changed",async ()=>{
        const SetUserDataSpy = vi.spyOn(wrapper.vm,'set_user_data')
        const LogoutSpy = vi.spyOn(wrapper.vm,'$Logout')
        const RoutePushSpy = vi.spyOn(wrapper.vm.$router,'push')
        const CloseSpy = vi.spyOn(wrapper.vm,'Close')
        const SubmitButton = wrapper.findAll('button').at(1)
 
        expect(SetUserDataSpy).toHaveBeenCalledTimes(0)
        expect(LogoutSpy).toHaveBeenCalledTimes(0)
        expect(RoutePushSpy).toHaveBeenCalledTimes(0)
        expect(CloseSpy).toHaveBeenCalledTimes(0)
        await wrapper.findAll('input').at(0).setValue('TestTest')
        await wrapper.findAll('input').at(1).setValue('Slaptažodis')
        await wrapper.findAll('input').at(2).setValue('Slaptažodis')
        await SubmitButton.trigger('click')
        await wrapper.vm.$nextTick()
        
        expect(SetUserDataSpy).toHaveBeenCalledTimes(1)
        expect(LogoutSpy).toHaveBeenCalledTimes(1)
        expect(RoutePushSpy).toHaveBeenCalledTimes(1)
        expect(RoutePushSpy).toHaveBeenCalledWith('/')
        expect(CloseSpy).toHaveBeenCalledTimes(1)
    })
    it("Should Set Error Message If Failed To Update Password",async ()=>{
        wrapper = createWrapper(ResetPassword,{
            mocks:{
                $UpdateRecord()
                {
                    return Promise.resolve(null)
                }
            }
        });
        wrapper.vm.$store.state.User.Data = {"record":{"avatar":"","collectionId":"_pb_users_auth_","collectionName":"users","created":"2023-02-20 09:51:12.612Z","email":"admin@teltonika.lt","emailVisibility":true,"expand":{"permissions_id":{"collectionId":"adadquft6s38bg8","collectionName":"user_permissions","created":"2023-02-20 09:49:38.574Z","delete_companies":true,"delete_employees":true,"delete_offices":true,"delete_permissions":true,"delete_structure":true,"edit_companies":true,"edit_employees":true,"edit_offices":true,"edit_permissions":true,"edit_structure":true,"id":"4y2zp4n8ehzyzi0","read_permissions":true,"updated":"2023-07-17 12:29:43.104Z","expand":{}}},"id":"ulzaiqke8x0xdi1","name":"Admin","permissions_id":"4y2zp4n8ehzyzi0","updated":"2023-07-18 04:11:52.259Z","username":"admin","verified":true},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE2OTE0NzM2NzcsImlkIjoidWx6YWlxa2U4eDB4ZGkxIiwidHlwZSI6ImF1dGhSZWNvcmQifQ.WEyTOfFLC4cCcv5iFgQA1BUaFNXFU1VbaKjQhgDnk0Q"}
      
        
        const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
        const SubmitButton = wrapper.findAll('button').at(1)
 
        expect(SetMessageSpy).toHaveBeenCalledTimes(0)
        await wrapper.findAll('input').at(0).setValue('TestTest')
        await wrapper.findAll('input').at(1).setValue('Slaptažodis')
        await wrapper.findAll('input').at(2).setValue('Slaptažodis')
        await SubmitButton.trigger('click')
        await wrapper.vm.$nextTick()
        
        expect(SetMessageSpy).toHaveBeenCalledTimes(1)
        expect(SetMessageSpy).toHaveBeenCalledWith({message:'Nepavyko atnaujinti slaptažodžio',type:'error'})
    })
});

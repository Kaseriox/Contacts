import { describe, it, expect, vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import EditAccountForm from "../../../../src/Components/Form/Forms/Account/EditAccountForm.vue";
describe("CreateAccountForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(EditAccountForm, {
      mocks: {
        $GetSingleRecord({ Collection }) {
          if (Collection === "users") {
            return Promise.resolve({
              avatar: "",
              collectionId: "_pb_users_auth_",
              collectionName: "users",
              created: "2023-02-20 09:51:12.612Z",
              email: "admin@teltonika.lt",
              emailVisibility: true,
              id: "ulzaiqke8x0xdi1",
              name: "Admin",
              permissions_id: "4y2zp4n8ehzyzi0",
              updated: "2023-07-18 04:11:52.259Z",
              username: "admin",
              verified: true,
              expand: {},
            });
          }
          if (Collection === "user_permissions") {
            return Promise.resolve({
                collectionId: 'adadquft6s38bg8',
                collectionName: 'user_permissions',
                created: '2023-02-20 09:49:38.574Z',
                delete_companies: true,
                delete_employees: true,
                delete_offices: true,
                delete_permissions: true,
                delete_structure: true,
                edit_companies: true,
                edit_employees: true,
                edit_offices: true,
                edit_permissions: true,
                edit_structure: true,
                id: '4y2zp4n8ehzyzi0',
                read_permissions: true,
                updated: '2023-07-17 12:29:43.104Z',
                expand: {},
              });
          }
        },
        $UpdateRecord()
        {
            return Promise.resolve(true)
        }
      },
    });
  });


 
  let Wrapper2 = createWrapper(EditAccountForm, {
    mocks: {
      $GetSingleRecord({ Collection }) {
        if (Collection === "users") {
          return Promise.resolve({
            avatar: "",
            collectionId: "_pb_users_auth_",
            collectionName: "users",
            created: "2023-02-20 09:51:12.612Z",
            email: "admin@teltonika.lt",
            emailVisibility: true,
            id: "ulzaiqke8x0xdi1",
            name: "Admin",
            permissions_id: "4y2zp4n8ehzyzi0",
            updated: "2023-07-18 04:11:52.259Z",
            username: "admin",
            verified: true,
            expand: {},
          });
        }
        if (Collection === "user_permissions") {
          return Promise.resolve({
              collectionId: 'adadquft6s38bg8',
              collectionName: 'user_permissions',
              created: '2023-02-20 09:49:38.574Z',
              delete_companies: true,
              delete_employees: true,
              delete_offices: true,
              delete_permissions: true,
              delete_structure: true,
              edit_companies: true,
              edit_employees: true,
              edit_offices: true,
              edit_permissions: true,
              edit_structure: true,
              id: '4y2zp4n8ehzyzi0',
              read_permissions: true,
              updated: '2023-07-17 12:29:43.104Z',
              expand: {},
            });
        }
      },
      $UpdateRecord()
      {
          return Promise.resolve(null)
      }
    },
  });


  it("Should Populate Input Fields With Data From Record", () => {
    const NameInput = wrapper.findAll("input").at(0);
    const EmailInput = wrapper.findAll("input").at(1);
    expect(NameInput.element.value).toContain('admin')
    expect(EmailInput.element.value).toContain("admin@teltonika.lt")
  });
  it("Should Validate Form On Pressing Submit Button",async ()=>{
    const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(0)
    const SubmitButton = wrapper.findAll('button').at(1)
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
  })


  it("Should Not Let Submit Form If Required Field Is Missing Information",async ()=>{
    const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
    const NameInput = wrapper.findAll('input').at(0)
    const EmailInput = wrapper.findAll('input').at(1)
    const SubmitButton = wrapper.findAll('button').at(1)
    expect(ValidateFormSpy).toHaveBeenCalledTimes(0)
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
    expect(ValidateFormSpy).toHaveReturned(true)

    NameInput.setValue('')
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(2)
    expect(ValidateFormSpy).toHaveReturned(false)

    NameInput.setValue('admin')
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(3)
    expect(ValidateFormSpy).toHaveReturned(true)

    EmailInput.setValue('')
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(4)
    expect(ValidateFormSpy).toHaveReturned(false)

    EmailInput.setValue('admin@teltonika.lt')
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(5)
    expect(ValidateFormSpy).toHaveReturned(true)
  })
  it("Should Set Success Message if Record Is Updated",async ()=>{
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)
    await wrapper.findAll('button').at(1).trigger('click')
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Pavyko atnaujinti paskyrą',type:'success'})
  })
  it("Should Set Failure Message If Records Failed To Update",async ()=>{
    const SetMessageSpy = vi.spyOn(Wrapper2.vm,'set_message')
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)
    await Wrapper2.findAll('button').at(1).trigger('click')
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Nepavyko atnaujinti paskyros',type:'error'})
  })
  
    


});

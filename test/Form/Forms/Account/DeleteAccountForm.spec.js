import { describe, it, expect, vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import DeleteAccountForm from "../../../../src/Components/Form/Forms/Account/DeleteAccountForm.vue";
describe("CreateAccountForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(DeleteAccountForm, {
      mocks: {
        $GetSingleRecord() {
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
          })
        },
      },
    });
  });

  it("Should Display Correct Text", () => {
    expect(wrapper.text()).toContain("Ar tikrai norite ištrinti paskyrą?");
    expect(wrapper.text()).toContain("Paskyros vardas: admin ");
    expect(wrapper.text()).toContain("Elektroninis paštas: admin@teltonika.lt")
  });
  it("Should Close Modal Window If 'Ne' Is Pressed",async ()=>{
    const CloseSpy = vi.spyOn(wrapper.vm,'Close')
    const NoButton = wrapper.findAll('p').at(2)
    expect(CloseSpy).toHaveBeenCalledTimes(0)
    await NoButton.trigger('click')
    expect(CloseSpy).toHaveBeenCalledTimes(1)
  })

  it("Should Delete Records if 'Yes' Is Pressed",async ()=>{

    const MessageSpy = vi.spyOn(wrapper.vm,'set_message')
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const YesButton = wrapper.findAll('p').at(1)
    expect(MessageSpy).toHaveBeenCalledTimes(0)
    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    await YesButton.trigger('click')
    expect(MessageSpy).toHaveBeenCalledTimes(1)
    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(MessageSpy).toHaveBeenCalledWith({message:'Sėkmingai panaikinta paskyra',type:'success'})
  })

  it("Should Set Failure Message if Record Failed To Delete",async ()=>{
    wrapper = createWrapper(DeleteAccountForm,{
        mocks:{
            $DeleteRecord()
            {
                return new Promise((resolve) =>
                resolve(null));
            },
            $GetSingleRecord() {
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
                })
              },
        }
    })
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const MessageSpy = vi.spyOn(wrapper.vm,'set_message')
    const YesButton = wrapper.findAll('p').at(1)
    expect(MessageSpy).toHaveBeenCalledTimes(0)
    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    await YesButton.trigger('click')
    expect(MessageSpy).toHaveBeenCalledTimes(1)
    expect(MessageSpy).toHaveBeenCalledWith({message:'Nepavyko panaikinti paskyros',type:'error'})
    expect(HandleFormSpy).toHaveBeenCalledTimes(1)

  })

});

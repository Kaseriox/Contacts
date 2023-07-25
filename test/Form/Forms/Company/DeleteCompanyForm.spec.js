import { describe, it, expect, vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import DeleteCompanyForm from "../../../../src/Components/Form/Forms/Company/DeleteCompanyForm.vue";
describe("DeleteCompanyForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(DeleteCompanyForm, {
      mocks: {
        $GetSingleRecord() {
          return Promise.resolve({"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:14.612Z","id":"5ask1scw3rf23yq","name":"TELTONIKA NETWORKS","updated":"2023-07-17 13:54:58.277Z","expand":{}})
        },
        $GetCollection()
        {
            return Promise.resolve({totalItems:0,items:[]})
        }
      },
    });
  });

  it("Should Display Correct Text", () => {
    expect(wrapper.text()).toContain("Ar tikrai norite ištrinti įmonę?");
    expect(wrapper.text()).toContain("Įmonės pavadinimas: TELTONIKA NETWORKS");
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
    expect(MessageSpy).toHaveBeenCalledWith({message:'Sėkmingai panaikinta įmonė',type:'success'})
  })

  it("Should Set Failure Message if Record Failed To Delete",async ()=>{
    wrapper = createWrapper(DeleteCompanyForm,{
        mocks:{
            $DeleteRecord()
            {
                return new Promise((resolve) =>
                resolve(null));
            },
            $GetCollection()
            {
            return Promise.resolve({totalItems:0,items:[]})
            }
        }
    })
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const MessageSpy = vi.spyOn(wrapper.vm,'set_message')
    const YesButton = wrapper.findAll('p').at(1)
    expect(MessageSpy).toHaveBeenCalledTimes(0)
    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    await YesButton.trigger('click')
    expect(MessageSpy).toHaveBeenCalledTimes(1)
    expect(MessageSpy).toHaveBeenCalledWith({message:'Nepavyko panaikinti įmonės',type:'error'})
    expect(HandleFormSpy).toHaveBeenCalledTimes(1)

  })

});

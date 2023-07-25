import { describe, it, expect, vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import DeleteEmployeeForm from "../../../../src/Components/Form/Forms/Employee/DeleteEmployeeForm.vue";
describe("DeleteEmployeeForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(DeleteEmployeeForm, {
      mocks: {
        $GetSingleRecord() {
          return Promise.resolve({"collectionId":"b2oym7fr4tkhpsr","collectionName":"employees","company_id":"5ask1scw3rf23yq","created":"2023-02-20 12:33:50.440Z","department_id":"h3cchigia2xtmzk","division_id":"1uio162voxfj2ot","email":"gedas.test@teltonika.lt","group_id":"","id":"bfjmhvdguk99hxx","name":"Gedas","office_id":"vm438vfq27bg17e","phone_number":"+370648977894591","photo":"","position":"Iot academy coordinator","surname":"Test","updated":"2023-07-17 12:52:10.367Z","expand":{}})
        },
        $GetCollection()
        {
            return Promise.resolve({totalItems:0,items:[]})
        }
      },
    });
  });

  it("Should Display Correct Text", () => {
    expect(wrapper.text()).toContain("Ar tikrai norite ištrinti kontaktą?");
    expect(wrapper.text()).toContain("Vardas ir pavardė: Gedas Test");
    expect(wrapper.text()).toContain("Pozicija: Iot academy coordinator");
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
    expect(MessageSpy).toHaveBeenCalledWith({message:'Sėkmingai panaikintas kontaktas',type:'success'})
  })

  it("Should Set Failure Message if Record Failed To Delete",async ()=>{
    wrapper = createWrapper(DeleteEmployeeForm,{
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
    expect(MessageSpy).toHaveBeenCalledWith({message:'Nepavyko panaikinti kontakto',type:'error'})
    expect(HandleFormSpy).toHaveBeenCalledTimes(1)

  })

});

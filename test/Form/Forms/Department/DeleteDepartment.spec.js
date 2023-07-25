import { describe, it, expect, vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import DeleteDepartmentForm from "../../../../src/Components/Form/Forms/Department/DeleteDepartmentForm.vue";
describe("DeleteDepartmentForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(DeleteDepartmentForm, {
      mocks: {
        $GetSingleRecord() {
          return Promise.resolve({"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:02:43.008Z","id":"h3cchigia2xtmzk","name":"IoT akademija","updated":"2023-07-17 13:55:11.312Z","expand":{}})
        },
        $GetCollection()
        {
            return Promise.resolve({totalItems:0,items:[]})
        }
      },
    });
  });

  it("Should Display Correct Text", () => {
    expect(wrapper.text()).toContain("Ar tikrai norite ištrinti skyrių?");
    expect(wrapper.text()).toContain("Skyriaus pavadinimas: IoT akademija");
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
    expect(MessageSpy).toHaveBeenCalledWith({message:'Sėkmingai panaikintas skyrius',type:'success'})
  })

  it("Should Set Failure Message if Record Failed To Delete",async ()=>{
    wrapper = createWrapper(DeleteDepartmentForm,{
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
    expect(MessageSpy).toHaveBeenCalledWith({message:'Nepavyko panaikinti skyriaus',type:'error'})
    expect(HandleFormSpy).toHaveBeenCalledTimes(1)

  })

});

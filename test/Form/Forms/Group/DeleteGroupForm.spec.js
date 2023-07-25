import { describe, it, expect, vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import DeleteGroupForm from "../../../../src/Components/Form/Forms/Group/DeleteGroupForm.vue";
describe("DeleteDepartmentForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(DeleteGroupForm, {
      mocks: {
        $GetSingleRecord() {
          return Promise.resolve({"collectionId":"57faccb7837p3uh","collectionName":"groups","created":"2023-02-20 12:38:12.594Z","id":"oambg9goguergbw","name":"Įterptinių sistemų programuotojai","updated":"2023-07-17 13:55:14.823Z","expand":{}})
        },
        $GetCollection()
        {
            return Promise.resolve({totalItems:0,items:[]})
        }
      },
    });
  });

  it("Should Display Correct Text", () => {
    expect(wrapper.text()).toContain("Ar tikrai norite ištrinti grupę?");
    expect(wrapper.text()).toContain("Grupės pavadinimas: Įterptinių sistemų programuotojai");
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
    expect(MessageSpy).toHaveBeenCalledWith({message:'Sėkmingai panaikinta grupė',type:'success'})
  })

  it("Should Set Failure Message if Record Failed To Delete",async ()=>{
    wrapper = createWrapper(DeleteGroupForm, {
        mocks: {
          $GetSingleRecord() {
            return Promise.resolve({"collectionId":"57faccb7837p3uh","collectionName":"groups","created":"2023-02-20 12:38:12.594Z","id":"oambg9goguergbw","name":"Įterptinių sistemų programuotojai","updated":"2023-07-17 13:55:14.823Z","expand":{}})
          },
          $GetCollection()
          {
              return Promise.resolve({totalItems:0,items:[]})
          },
          $DeleteRecord()
          {
            return Promise.resolve(null)
          }
        },
      })
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const MessageSpy = vi.spyOn(wrapper.vm,'set_message')
    const YesButton = wrapper.findAll('p').at(1)
    expect(MessageSpy).toHaveBeenCalledTimes(0)
    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    await YesButton.trigger('click')
    expect(MessageSpy).toHaveBeenCalledTimes(1)
    expect(MessageSpy).toHaveBeenCalledWith({message:'Nepavyko panaikinti grupės',type:'error'})
    expect(HandleFormSpy).toHaveBeenCalledTimes(1)

  })

});

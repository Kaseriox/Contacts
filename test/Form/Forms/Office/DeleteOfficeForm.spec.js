import { describe, it, expect, vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import DeleteOfficeForm from "../../../../src/Components/Form/Forms/Office/DeleteOfficeForm.vue";
describe("DeleteOfficeForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(DeleteOfficeForm, {
      mocks: {
        $GetSingleRecord() {
          return Promise.resolve({"city":"Kaunas","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:51:32.012Z","id":"vm438vfq27bg17e","name":"K. Baršausko st. 66, Kaunas, Lithuania","street":"K. Baršausko st.","street_number":"66","updated":"2023-07-17 13:55:03.870Z","expand":{}})
        },
        $GetCollection()
        {
            return Promise.resolve({totalItems:0,items:[]})
        }
      },
    });
  });

  it("Should Display Correct Text", () => {
    expect(wrapper.text()).toContain("Ar tikrai norite ištrinti ofisą?");
    expect(wrapper.text()).toContain("Ofiso pavadinimas: K. Baršausko st. 66, Kaunas, Lithuania");
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
    expect(MessageSpy).toHaveBeenCalledWith({message:'Sėkmingai panaikintas ofisas',type:'success'})
  })

  it("Should Set Failure Message if Record Failed To Delete",async ()=>{
    wrapper = createWrapper(DeleteOfficeForm, {
        mocks: {
          $GetSingleRecord() {
            return Promise.resolve({"city":"Kaunas","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:51:32.012Z","id":"vm438vfq27bg17e","name":"K. Baršausko st. 66, Kaunas, Lithuania","street":"K. Baršausko st.","street_number":"66","updated":"2023-07-17 13:55:03.870Z","expand":{}})
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
      });
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const MessageSpy = vi.spyOn(wrapper.vm,'set_message')
    const YesButton = wrapper.findAll('p').at(1)
    expect(MessageSpy).toHaveBeenCalledTimes(0)
    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    await YesButton.trigger('click')
    expect(MessageSpy).toHaveBeenCalledTimes(1)
    expect(MessageSpy).toHaveBeenCalledWith({message:'Nepavyko panaikinti ofiso',type:'error'})
    expect(HandleFormSpy).toHaveBeenCalledTimes(1)

  })

});


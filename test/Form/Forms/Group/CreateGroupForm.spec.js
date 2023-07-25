import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import CreateGroupForm from "../../../../src/Components/Form/Forms/Group/CreateGroupForm.vue"
import Input from "../../../../src/Components/InputField/InputField.vue"
import VueTagsInput from "@johmun/vue-tags-input";
describe("CreateGroupForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(CreateGroupForm,{
        mocks:{
            $GetCollection()
            {
                return Promise.resolve({items:[
                    {
                        "collectionId": "bthy7mqw35rkvvb",
                        "collectionName": "departments",
                        "created": "2023-02-20 12:02:43.008Z",
                        "id": "h3cchigia2xtmzk",
                        "name": "IoT akademija",
                        "updated": "2023-07-17 13:55:11.312Z"
                    },
                    {
                        "collectionId": "bthy7mqw35rkvvb",
                        "collectionName": "departments",
                        "created": "2023-02-20 12:36:51.570Z",
                        "id": "yyn7p8ka5stjvr6",
                        "name": "Testavimo",
                        "updated": "2023-02-20 12:37:45.732Z"
                    },
                    {
                        "collectionId": "bthy7mqw35rkvvb",
                        "collectionName": "departments",
                        "created": "2023-02-20 12:37:29.907Z",
                        "id": "3e8d0k0jpeg7pvg",
                        "name": "Konstruktorių",
                        "updated": "2023-02-20 12:37:42.835Z"
                    },
                    {
                        "collectionId": "bthy7mqw35rkvvb",
                        "collectionName": "departments",
                        "created": "2023-02-20 12:37:50.627Z",
                        "id": "w0bc7yv297l1uej",
                        "name": "Programuotojų",
                        "updated": "2023-02-20 12:37:50.627Z"
                    },
                    {
                        "collectionId": "bthy7mqw35rkvvb",
                        "collectionName": "departments",
                        "created": "2023-02-20 12:43:20.937Z",
                        "id": "pwg05eofg41afyi",
                        "name": "Biuro ir vadybos",
                        "updated": "2023-02-20 12:43:20.937Z"
                    },
                    {
                        "collectionId": "bthy7mqw35rkvvb",
                        "collectionName": "departments",
                        "created": "2023-02-20 12:43:57.537Z",
                        "id": "8t31iyvwrhqnmiq",
                        "name": "IT adminsitratorių",
                        "updated": "2023-02-20 12:43:57.537Z"
                    },
                    {
                        "collectionId": "bthy7mqw35rkvvb",
                        "collectionName": "departments",
                        "created": "2023-02-23 13:45:43.047Z",
                        "id": "9y1n8rkzaojgqzz",
                        "name": "Not existing",
                        "updated": "2023-02-23 13:45:43.047Z"
                    }
                ]})
            }
        }
    });
  });

  it('Should Contain All Necessary Fields ', ()=>{
    const InputFields = wrapper.findAllComponents(Input)
    const VueTagsInputFields = wrapper.findAllComponents(VueTagsInput)
    expect(InputFields.exists()).toBeTruthy()
    expect(InputFields).toHaveLength(1)
    expect(VueTagsInputFields).toBeTruthy()
    expect(VueTagsInputFields).toHaveLength(1)


  })

  it("Should Validate Form When Trying To Submit It",async ()=>{
    const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(0)
    const SubmitButton = wrapper.findAll('button').at(1)
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
  })

  it("Form Should Make Sure All Required Fields Are Populated Correctly Before Submitting",async ()=>{
    
    const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(0)

    const SubmitButton = wrapper.findAll('button').at(1)

   const InputField = wrapper.find('input')
   await SubmitButton.trigger('click')
   expect(ValidateFormSpy).toHaveLastReturnedWith(false)
   expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
   wrapper.vm.$data.tags=[]
   await InputField.setValue('Test')
   await SubmitButton.trigger('click')
   expect(ValidateFormSpy).toHaveLastReturnedWith(false)
   expect(ValidateFormSpy).toHaveBeenCalledTimes(2)
   wrapper.vm.$data.tags=[{"text":"IoT akademija","id":"h3cchigia2xtmzk","tiClasses":["ti-valid"]}]
   await SubmitButton.trigger('click')
   expect(ValidateFormSpy).toHaveLastReturnedWith(true)
   expect(ValidateFormSpy).toHaveBeenCalledTimes(3)

})

  it('Should Display Message If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')

    const InputField = wrapper.find('input')
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)

    await InputField.setValue('Test')
    wrapper.vm.$data.tags=[{"text":"IoT akademija","id":"h3cchigia2xtmzk","tiClasses":["ti-valid"]}]
    await SubmitButton.trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({
        message: `Sėkmingai sukurta grupė`,
        type: "success",
      })

  })

  it('Should Close Modal Form If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const CloseSpy = vi.spyOn(wrapper.vm,'Close')

    const InputField = wrapper.find('input')
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(CloseSpy).toHaveBeenCalledTimes(0)

    await InputField.setValue('Test')
    wrapper.vm.$data.tags=[{"text":"IoT akademija","id":"h3cchigia2xtmzk","tiClasses":["ti-valid"]}]
    await SubmitButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(CloseSpy).toHaveBeenCalledTimes(1)


  })

  it('Should Call Refresh Method If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const RefreshSpy = vi.spyOn(wrapper.vm,'refresh')

    const InputField = wrapper.find('input')
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(RefreshSpy).toHaveBeenCalledTimes(0)

    await InputField.setValue('Test')
    wrapper.vm.$data.tags=[{"text":"IoT akademija","id":"h3cchigia2xtmzk","tiClasses":["ti-valid"]}]
    await SubmitButton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(RefreshSpy).toHaveBeenCalledTimes(1)
  })

  it('Should Set Failure Message If Creating Record Failed',async ()=>{
    wrapper = createWrapper(CreateGroupForm,{
        mocks:{
            $GetCollection()
            {
                return Promise.resolve({items:[
                    {
                        "collectionId": "bthy7mqw35rkvvb",
                        "collectionName": "departments",
                        "created": "2023-02-20 12:02:43.008Z",
                        "id": "h3cchigia2xtmzk",
                        "name": "IoT akademija",
                        "updated": "2023-07-17 13:55:11.312Z"
                    },
                    {
                        "collectionId": "bthy7mqw35rkvvb",
                        "collectionName": "departments",
                        "created": "2023-02-20 12:36:51.570Z",
                        "id": "yyn7p8ka5stjvr6",
                        "name": "Testavimo",
                        "updated": "2023-02-20 12:37:45.732Z"
                    },
                    {
                        "collectionId": "bthy7mqw35rkvvb",
                        "collectionName": "departments",
                        "created": "2023-02-20 12:37:29.907Z",
                        "id": "3e8d0k0jpeg7pvg",
                        "name": "Konstruktorių",
                        "updated": "2023-02-20 12:37:42.835Z"
                    },
                    {
                        "collectionId": "bthy7mqw35rkvvb",
                        "collectionName": "departments",
                        "created": "2023-02-20 12:37:50.627Z",
                        "id": "w0bc7yv297l1uej",
                        "name": "Programuotojų",
                        "updated": "2023-02-20 12:37:50.627Z"
                    },
                    {
                        "collectionId": "bthy7mqw35rkvvb",
                        "collectionName": "departments",
                        "created": "2023-02-20 12:43:20.937Z",
                        "id": "pwg05eofg41afyi",
                        "name": "Biuro ir vadybos",
                        "updated": "2023-02-20 12:43:20.937Z"
                    },
                    {
                        "collectionId": "bthy7mqw35rkvvb",
                        "collectionName": "departments",
                        "created": "2023-02-20 12:43:57.537Z",
                        "id": "8t31iyvwrhqnmiq",
                        "name": "IT adminsitratorių",
                        "updated": "2023-02-20 12:43:57.537Z"
                    },
                    {
                        "collectionId": "bthy7mqw35rkvvb",
                        "collectionName": "departments",
                        "created": "2023-02-23 13:45:43.047Z",
                        "id": "9y1n8rkzaojgqzz",
                        "name": "Not existing",
                        "updated": "2023-02-23 13:45:43.047Z"
                    }
                ]})
            },
            $CreateRecord()
            {
                return Promise.resolve(null)
            }
        }
    });
    await wrapper.vm.$nextTick()
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')

    const InputField = wrapper.find('input')
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)

    await InputField.setValue('Test')
    wrapper.vm.$data.tags=[{"text":"IoT akademija","id":"h3cchigia2xtmzk","tiClasses":["ti-valid"]}]
    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({
        message: "Nepavyko sukurti grupės",
        type: "error",
      })
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
  })
})

import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import CreateDepartmentForm from "../../../../src/Components/Form/Forms/Department/CreateDepartmentForm.vue"
import Input from "../../../../src/Components/InputField/InputField.vue"
import VueTagsInput from "@johmun/vue-tags-input";
describe("CreateDepartmentForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(CreateDepartmentForm,{
        mocks:{
            $GetCollection()
            {
                return Promise.resolve({items:[
                    {
                      "collectionId": "bakpn5k6ntn68n3",
                      "collectionName": "divisions",
                      "created": "2023-02-20 10:00:29.661Z",
                      "id": "1uio162voxfj2ot",
                      "name": "HRD",
                      "updated": "2023-07-20 04:20:51.210Z",
                      "expand": {}
                    },
                    {
                      "collectionId": "bakpn5k6ntn68n3",
                      "collectionName": "divisions",
                      "created": "2023-02-20 10:00:42.505Z",
                      "id": "dmgqn0scy1z4qym",
                      "name": "RnD",
                      "updated": "2023-02-20 12:03:13.973Z",
                      "expand": {}
                    },
                    {
                      "collectionId": "bakpn5k6ntn68n3",
                      "collectionName": "divisions",
                      "created": "2023-02-20 12:29:49.776Z",
                      "id": "5xwpimcs50j6ygi",
                      "name": "Administracija",
                      "updated": "2023-02-20 12:43:38.491Z",
                      "expand": {}
                    },
                    {
                      "collectionId": "bakpn5k6ntn68n3",
                      "collectionName": "divisions",
                      "created": "2023-02-20 12:31:19.756Z",
                      "id": "53fjrf5alo40nc2",
                      "name": "Marketingas",
                      "updated": "2023-02-20 12:31:19.756Z",
                      "expand": {}
                    },
                    {
                      "collectionId": "bakpn5k6ntn68n3",
                      "collectionName": "divisions",
                      "created": "2023-02-20 12:31:25.363Z",
                      "id": "fpuqxr7ahshmwrh",
                      "name": "Pardavimai",
                      "updated": "2023-02-20 12:31:25.363Z",
                      "expand": {}
                    }
                  ]})
            }
        }
    });
    wrapper.vm.$data.tags=[{"text":"Administracija","id":"5xwpimcs50j6ygi","tiClasses":["ti-valid"]}]
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
   wrapper.vm.$data.tags=[{"text":"Administracija","id":"5xwpimcs50j6ygi","tiClasses":["ti-valid"]}]
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
    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({
        message: `Sėkmingai sukurtas skyrius`,
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
    await SubmitButton.trigger('click')

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
    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(RefreshSpy).toHaveBeenCalledTimes(1)
  })

  it('Should Set Failure Message If Creating Record Failed',async ()=>{
    wrapper = createWrapper(CreateDepartmentForm,{
        mocks:{
            $CreateRecord()
                {
                    return Promise.resolve(null)
                },
                $GetCollection()
            {
                return Promise.resolve({items:[
                    {
                      "collectionId": "bakpn5k6ntn68n3",
                      "collectionName": "divisions",
                      "created": "2023-02-20 10:00:29.661Z",
                      "id": "1uio162voxfj2ot",
                      "name": "HRD",
                      "updated": "2023-07-20 04:20:51.210Z",
                      "expand": {}
                    },
                    {
                      "collectionId": "bakpn5k6ntn68n3",
                      "collectionName": "divisions",
                      "created": "2023-02-20 10:00:42.505Z",
                      "id": "dmgqn0scy1z4qym",
                      "name": "RnD",
                      "updated": "2023-02-20 12:03:13.973Z",
                      "expand": {}
                    },
                    {
                      "collectionId": "bakpn5k6ntn68n3",
                      "collectionName": "divisions",
                      "created": "2023-02-20 12:29:49.776Z",
                      "id": "5xwpimcs50j6ygi",
                      "name": "Administracija",
                      "updated": "2023-02-20 12:43:38.491Z",
                      "expand": {}
                    },
                    {
                      "collectionId": "bakpn5k6ntn68n3",
                      "collectionName": "divisions",
                      "created": "2023-02-20 12:31:19.756Z",
                      "id": "53fjrf5alo40nc2",
                      "name": "Marketingas",
                      "updated": "2023-02-20 12:31:19.756Z",
                      "expand": {}
                    },
                    {
                      "collectionId": "bakpn5k6ntn68n3",
                      "collectionName": "divisions",
                      "created": "2023-02-20 12:31:25.363Z",
                      "id": "fpuqxr7ahshmwrh",
                      "name": "Pardavimai",
                      "updated": "2023-02-20 12:31:25.363Z",
                      "expand": {}
                    }
                  ]})
            }
        }
       })
    wrapper.vm.$data.tags=[{"text":"Administracija","id":"5xwpimcs50j6ygi","tiClasses":["ti-valid"]}]
    await wrapper.vm.$nextTick()
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')

    const InputField = wrapper.find('input')
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)

    await InputField.setValue('Test')
    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({
        message: "Nepavyko sukurti skyriaus",
        type: "error",
      })
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
  })
})

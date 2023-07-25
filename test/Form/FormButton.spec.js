import { describe, it, expect,vi } from "vitest";
import createWrapper from '../.mockFactory/mockFactory'
import FormButton from '../../src/Components/Form/FormButton.vue'
import CreateGroupForm from '../../src/Components/Form/Forms/Group/CreateGroupForm.vue'
import EditGroupForm from '../../src/Components/Form/Forms/Group/EditGroupForm.vue'
import DeleteGroupForm from '../../src/Components/Form/Forms/Group/DeleteGroupForm.vue'
describe("FormButton.vue", () => {
  let wrapper;


  it('Should Display Create Button',async ()=>{
    const wrapper =  createWrapper(FormButton,{
        propsData:{
            type:'create',
            id:"1",
            collection:'employees'
        }
    })
    const icon = wrapper.find('iconify-icon-stub').attributes().icon
    expect(icon).contain('add')
    

  })

  it('Should Display Edit Button',async ()=>{
    const wrapper =  createWrapper(FormButton,{
        propsData:{
            type:'edit',
            id:"1",
            collection:'employees'
        }
    })
    const icon = wrapper.find('iconify-icon-stub').attributes().icon
    expect(icon).contain('edit')

  })

  it('Should Display Delete Button',async ()=>{
    const wrapper =  createWrapper(FormButton,{
        propsData:{
            type:'delete',
            id:"1",
            collection:'employees'
        }
    })
    const icon = wrapper.find('iconify-icon-stub').attributes().icon
    expect(icon).contain('baseline-delete')

  })

  it('Should Set Correct Create Component',async ()=>{
    const wrapper =  createWrapper(FormButton,{
        propsData:{
            type:'create',
            id:"1",
            collection:'groups'
        }
    })
    const CreateFormSpy = vi.spyOn(wrapper.vm, 'CreateForm')
    const HandleClickSpy = vi.spyOn(wrapper.vm,'HandleClick')
    const SetComponentSpy = vi.spyOn(wrapper.vm,'set_component')
    const SetIDSpy = vi.spyOn(wrapper.vm,'set_id')
    const SetCollectionSpy = vi.spyOn(wrapper.vm,'set_collection')
    const SetTypeSpy = vi.spyOn(wrapper.vm,'set_type')

    expect(HandleClickSpy).toHaveBeenCalledTimes(0)
    expect(CreateFormSpy).toHaveBeenCalledTimes(0)
    expect(SetComponentSpy).toHaveBeenCalledTimes(0)
    expect(SetIDSpy).toHaveBeenCalledTimes(0)
    expect(SetCollectionSpy).toHaveBeenCalledTimes(0)
    expect(SetTypeSpy).toHaveBeenCalledTimes(0)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(HandleClickSpy).toHaveBeenCalledTimes(1)
    expect(CreateFormSpy).toHaveBeenCalledTimes(1)
    expect(SetComponentSpy).toHaveBeenCalledTimes(1)
    expect(SetIDSpy).toHaveBeenCalledTimes(1)
    expect(SetCollectionSpy).toHaveBeenCalledTimes(1)
    expect(SetTypeSpy).toHaveBeenCalledTimes(1)
    expect(SetComponentSpy).toHaveBeenCalledWith(CreateGroupForm)
    expect(SetIDSpy).toHaveBeenCalledWith('1')
    expect(SetCollectionSpy).toHaveBeenCalledWith('groups')
    expect(SetTypeSpy).toHaveBeenCalledWith('create')
    expect(wrapper.vm.$store.state.Modal.Component).toBe(CreateGroupForm)


  })

  it('Should Set Correct Edit Component',async ()=>{
    const wrapper =  createWrapper(FormButton,{
        propsData:{
            type:'edit',
            id:"1",
            collection:'groups'
        }
    })
    const EditFormSpy = vi.spyOn(wrapper.vm, 'EditForm')
    const HandleClickSpy = vi.spyOn(wrapper.vm,'HandleClick')
    const SetComponentSpy = vi.spyOn(wrapper.vm,'set_component')
    const SetIDSpy = vi.spyOn(wrapper.vm,'set_id')
    const SetCollectionSpy = vi.spyOn(wrapper.vm,'set_collection')
    const SetTypeSpy = vi.spyOn(wrapper.vm,'set_type')

    expect(HandleClickSpy).toHaveBeenCalledTimes(0)
    expect(EditFormSpy).toHaveBeenCalledTimes(0)
    expect(SetComponentSpy).toHaveBeenCalledTimes(0)
    expect(SetIDSpy).toHaveBeenCalledTimes(0)
    expect(SetCollectionSpy).toHaveBeenCalledTimes(0)
    expect(SetTypeSpy).toHaveBeenCalledTimes(0)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(HandleClickSpy).toHaveBeenCalledTimes(1)
    expect(EditFormSpy).toHaveBeenCalledTimes(1)
    expect(SetComponentSpy).toHaveBeenCalledTimes(1)
    expect(SetIDSpy).toHaveBeenCalledTimes(1)
    expect(SetCollectionSpy).toHaveBeenCalledTimes(1)
    expect(SetTypeSpy).toHaveBeenCalledTimes(1)
    expect(SetComponentSpy).toHaveBeenCalledWith(EditGroupForm)
    expect(SetIDSpy).toHaveBeenCalledWith('1')
    expect(SetCollectionSpy).toHaveBeenCalledWith('groups')
    expect(SetTypeSpy).toHaveBeenCalledWith('edit')
    expect(wrapper.vm.$store.state.Modal.Component).toBe(EditGroupForm)


  })

  it('Should Set Correct delete Component',async ()=>{
    const wrapper =  createWrapper(FormButton,{
        propsData:{
            type:'delete',
            id:"1",
            collection:'groups'
        }
    })
    const DeleteFormSpy = vi.spyOn(wrapper.vm, 'DeleteForm')
    const HandleClickSpy = vi.spyOn(wrapper.vm,'HandleClick')
    const SetComponentSpy = vi.spyOn(wrapper.vm,'set_component')
    const SetIDSpy = vi.spyOn(wrapper.vm,'set_id')
    const SetCollectionSpy = vi.spyOn(wrapper.vm,'set_collection')
    const SetTypeSpy = vi.spyOn(wrapper.vm,'set_type')

    expect(HandleClickSpy).toHaveBeenCalledTimes(0)
    expect(DeleteFormSpy).toHaveBeenCalledTimes(0)
    expect(SetComponentSpy).toHaveBeenCalledTimes(0)
    expect(SetIDSpy).toHaveBeenCalledTimes(0)
    expect(SetCollectionSpy).toHaveBeenCalledTimes(0)
    expect(SetTypeSpy).toHaveBeenCalledTimes(0)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(HandleClickSpy).toHaveBeenCalledTimes(1)
    expect(DeleteFormSpy).toHaveBeenCalledTimes(1)
    expect(SetComponentSpy).toHaveBeenCalledTimes(1)
    expect(SetIDSpy).toHaveBeenCalledTimes(1)
    expect(SetCollectionSpy).toHaveBeenCalledTimes(1)
    expect(SetTypeSpy).toHaveBeenCalledTimes(1)
    expect(SetComponentSpy).toHaveBeenCalledWith(DeleteGroupForm)
    expect(SetIDSpy).toHaveBeenCalledWith('1')
    expect(SetCollectionSpy).toHaveBeenCalledWith('groups')
    expect(SetTypeSpy).toHaveBeenCalledWith('delete')
    expect(wrapper.vm.$store.state.Modal.Component).toBe(DeleteGroupForm)


  })

})

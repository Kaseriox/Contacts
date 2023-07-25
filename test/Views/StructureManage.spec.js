import { describe, it, expect, beforeEach } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import StructureManage from "../../src/Views/StructureManage.vue"
import Header from '../../src/Components/Header/Header.vue';
import OfficeManage from '../../src/Components/Manage/OfficeManage/OfficeManage.vue'
import DepartmentManage from '../../src/Components/Manage/DepartmentManage/DepartmentManage.vue'
import DivisionManage from '../../src/Components/Manage/DivisionManage/DivisionManage.vue'
import GroupManage from '../../src/Components/Manage/GroupManage/GroupManage.vue'
describe("StructureManage.vue", () => {
    let wrapper
    const SetComponentSpy = vi.spyOn(StructureManage.methods,'set_component')
    beforeEach(()=>{
        wrapper = createWrapper(StructureManage,{
            mocks:{
                $GetCollection()
                {
                    return Promise.resolve({items:[]})
                }
            }
        })
    })
    it("Should Set OfficeManage Component On Mount",()=>{
        expect(SetComponentSpy).toHaveBeenCalledTimes(1)
        expect(wrapper.findComponent(OfficeManage).exists()).toBe(true)
    })
    it("Should Display Required Components",()=>{
        expect(wrapper.findComponent(Header).exists()).toBe(true)
        expect(wrapper.findComponent(OfficeManage).exists()).toBe(true)
    })
    it("Should Change Component If Pressed On Of The Structures That Is Not Selected",async ()=>{
        const SetComponentSpy = vi.spyOn(wrapper.vm,'set_component')
        const ChangeComponentSpy = vi.spyOn(wrapper.vm,'ChangeComponent')
        expect(SetComponentSpy).toHaveBeenCalledTimes(0)
        expect(ChangeComponentSpy).toHaveBeenCalledTimes(0)
        const DivisionButton = wrapper.findAll('div').at(8)
        expect(DivisionButton.text()).toContain('Padaliniai')
        await DivisionButton.trigger('click')
        await wrapper.vm.$nextTick()
        expect(ChangeComponentSpy).toHaveBeenCalledTimes(1)
        expect(ChangeComponentSpy).toHaveBeenCalledWith(DivisionManage)
        expect(SetComponentSpy).toHaveBeenCalledTimes(1)
    })
    
})
import { describe, it, expect, vi } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import ModalWindow from "../../src/Components/Modal/ModalWindow.vue"
import CreateCompanyForm from "../../src/Components/Form/Forms/Company/CreateCompanyForm.vue"
describe("StructureManagement.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(ModalWindow);
  });

  it("Should Not Render If Not Active",async ()=>{
    let ModalWindow = wrapper.find('div')
    expect(ModalWindow.exists()).toBe(false)
    wrapper.vm.$store.state.Modal.Open = true
    await wrapper.vm.$nextTick()
    ModalWindow = wrapper.find('div')
    expect(ModalWindow.exists()).toBe(true)
})
it("Should Rnder CreateCompanyForm Component Inside",async ()=>{
    let ModalWindow = wrapper.find('div')
    expect(ModalWindow.exists()).toBe(false)
    expect(wrapper.findComponent(CreateCompanyForm).exists()).toBe(false)
    wrapper.vm.$store.state.Modal.Open = true
    wrapper.vm.$store.state.Modal.Component = CreateCompanyForm
    await wrapper.vm.$nextTick()
    ModalWindow = wrapper.find('div')
    expect(ModalWindow.exists()).toBe(true)
    expect(wrapper.findComponent(CreateCompanyForm).exists()).toBe(true)
})
});

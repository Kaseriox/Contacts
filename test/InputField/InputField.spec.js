import { describe, it, expect,vi } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import InputField from "../../src/Components/InputField/InputField.vue"

describe("InputField.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(InputField,{
        propsData:{
            hidden:true,
            icon:{
                size:24,
                type:"material-symbols:mail"
            },
            label:"Elektroninis paštas",
            open:true,
            placeholder:"Įveskite el.pašto adresą...",
            value:'',
        }
    });
  });

    it("Should Render Input Field",()=>{
        const input = wrapper.find('input')
        expect(wrapper.text()).toContain('Elektroninis paštas')
        expect(input.attributes().placeholder).toContain('Įveskite el.pašto adresą')
        expect(input.attributes().type).toBe('password')
        expect(input.attributes().disabled).toBeUndefined()
    })
    it("Should Disable Input If Props Variable 'open' Is Set To False",()=>{
        wrapper.destroy()
        wrapper = createWrapper(InputField,{
            propsData:{
                hidden:true,
                icon:{
                    size:24,
                    type:"material-symbols:mail"
                },
                label:"Elektroninis paštas",
                open:false,
                placeholder:"Įveskite el.pašto adresą...",
            }
        });
        const input = wrapper.find('input')
        expect(input.attributes().disabled).toBeDefined()
    })

    it("Should Emit Changes On Input",()=>{
        const input = wrapper.find('input')
        input.setValue('Test')
        expect(wrapper.emitted().input).toBeTruthy()
        expect(wrapper.emitted().input.length).toBe(1)
        expect(wrapper.emitted().input[0]).toEqual(['Test'])
    })
    it('Should Change Input Type If Eye Is Pressed',async ()=>{
        const input = wrapper.find('input')
        const switchVisibilitySpy = vi.spyOn(wrapper.vm,'switchVisibility')
        expect(switchVisibilitySpy).toHaveBeenCalledTimes(0)
        expect(input.attributes().type).toBe('password')
        const eye = wrapper.findAll('iconify-icon-stub').at(1)
        wrapper.vm.switchVisibility()
        await wrapper.vm.$nextTick()
        expect(switchVisibilitySpy).toHaveBeenCalledTimes(1)
        expect(input.attributes().type).toBe('text')
    })
    it('Should Show Error Message If "error" variable Is A String Value',async ()=>{
        let error = wrapper.find('[class="text-center text-custom-red"]')
        expect(error.exists()).toBe(false)
        wrapper.vm.$data.error = 'test error'
        await wrapper.vm.$nextTick()
        error = wrapper.find('[class="text-center text-custom-red"]')
        expect(error.exists()).toBe(true)
        expect(error.text()).toContain('test error')
    })

})
import { describe, it, expect, beforeEach } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import Table from "../../src/Components/Reusables/Table.vue"
import FormButton from "../../src/Components/Form/FormButton.vue"
describe("Table.vue", () => {
    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(Table,{
            propsData:{
                data:[{"collection":"groups","id":"oambg9goguergbw","Grupės pavadinimas":"Įterptinių sistemų programuotojai"},{"collection":"groups","id":"13qspmhdzfcro2o","Grupės pavadinimas":"Tinklų"},{"collection":"groups","id":"q1bctefaiwik1o1","Grupės pavadinimas":"Mechanikos inžinierių"},{"collection":"groups","id":"g102qzh1azou2sg","Grupės pavadinimas":"Elektronikos inžinierių"},{"collection":"groups","id":"tbw7dgokb1rf999","Grupės pavadinimas":"Automatinių testų"},{"collection":"groups","id":"rfeqj6fnktemyor","Grupės pavadinimas":"Rankinių testų"}],
                fields:['Grupės pavadinimas'],
                permissions:{edit:true,delete:true}
            }
        })
    })
    
    it("Should Display Table With All The Data",()=>{
        let wrapperText = wrapper.text()
        expect(wrapperText).toContain('Įterptinių sistemų programuotojai')
        expect(wrapperText).toContain('Tinklų')
        expect(wrapperText).toContain('Mechanikos inžinierių')
        expect(wrapperText).toContain('Elektronikos inžinierių')
        expect(wrapperText).toContain('Automatinių testų')
        expect(wrapperText).toContain('Rankinių testų')
        expect(wrapper.findAllComponents(FormButton).length).toBe(12)
    })
    
    it("Should Display Table With Only 'Edit' Choice If Only Edit Permissions Are Set To True",()=>{
        wrapper.destroy()
        wrapper = createWrapper(Table,{
            propsData:{
                data:[{"collection":"groups","id":"oambg9goguergbw","Grupės pavadinimas":"Įterptinių sistemų programuotojai"},{"collection":"groups","id":"13qspmhdzfcro2o","Grupės pavadinimas":"Tinklų"},{"collection":"groups","id":"q1bctefaiwik1o1","Grupės pavadinimas":"Mechanikos inžinierių"},{"collection":"groups","id":"g102qzh1azou2sg","Grupės pavadinimas":"Elektronikos inžinierių"},{"collection":"groups","id":"tbw7dgokb1rf999","Grupės pavadinimas":"Automatinių testų"},{"collection":"groups","id":"rfeqj6fnktemyor","Grupės pavadinimas":"Rankinių testų"}],
                fields:['Grupės pavadinimas'],
                permissions:{edit:true,delete:false}
            }
        })
        expect(wrapper.findAllComponents(FormButton).length).toBe(6)
        expect(wrapper.findComponent(FormButton).props().type).toBe('edit')
    })

    it("Should Display Table With Only 'Edit' Choice If Only Delete Permissions Are Set To True",()=>{
        wrapper.destroy()
        wrapper = createWrapper(Table,{
            propsData:{
                data:[{"collection":"groups","id":"oambg9goguergbw","Grupės pavadinimas":"Įterptinių sistemų programuotojai"},{"collection":"groups","id":"13qspmhdzfcro2o","Grupės pavadinimas":"Tinklų"},{"collection":"groups","id":"q1bctefaiwik1o1","Grupės pavadinimas":"Mechanikos inžinierių"},{"collection":"groups","id":"g102qzh1azou2sg","Grupės pavadinimas":"Elektronikos inžinierių"},{"collection":"groups","id":"tbw7dgokb1rf999","Grupės pavadinimas":"Automatinių testų"},{"collection":"groups","id":"rfeqj6fnktemyor","Grupės pavadinimas":"Rankinių testų"}],
                fields:['Grupės pavadinimas'],
                permissions:{edit:false,delete:true}
            }
        })
        expect(wrapper.findAllComponents(FormButton).length).toBe(6)
        expect(wrapper.findComponent(FormButton).props().type).toBe('delete')
    })

    it("Should Display Table With No Buttons If Both Permissions Are Set To False",()=>{
        wrapper.destroy()
        wrapper = createWrapper(Table,{
            propsData:{
                data:[{"collection":"groups","id":"oambg9goguergbw","Grupės pavadinimas":"Įterptinių sistemų programuotojai"},{"collection":"groups","id":"13qspmhdzfcro2o","Grupės pavadinimas":"Tinklų"},{"collection":"groups","id":"q1bctefaiwik1o1","Grupės pavadinimas":"Mechanikos inžinierių"},{"collection":"groups","id":"g102qzh1azou2sg","Grupės pavadinimas":"Elektronikos inžinierių"},{"collection":"groups","id":"tbw7dgokb1rf999","Grupės pavadinimas":"Automatinių testų"},{"collection":"groups","id":"rfeqj6fnktemyor","Grupės pavadinimas":"Rankinių testų"}],
                fields:['Grupės pavadinimas'],
                permissions:{edit:false,delete:false}
            }
        })
        expect(wrapper.findAllComponents(FormButton).length).toBe(0)
    })
})
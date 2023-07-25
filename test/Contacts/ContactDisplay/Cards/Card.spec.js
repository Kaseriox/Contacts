
import { describe, it, expect } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import Card from "../../../../src/Components/Contacts/ContactDisplay/Cards/Card.vue"
describe("Card.vue", () => {

    let wrapper 
    beforeEach(()=>{
        wrapper = createWrapper(Card,{
            propsData:{
                Data:{
                    'Vardas ir pavardė':'Lorem Ipsum',
                    'Pozicija':'Tester',
                    'Telefono numeris':'+37061111111',
                    'Elektroninis paštas':'Tester@Testing.com',
                    'Adresas':'Testing Street 20',
                    id:1
                }
            }
        })
    })

    it('Should Render The Props Data',()=>{
        expect(wrapper.text()).toContain('Lorem Ipsum')
        expect(wrapper.text()).toContain('Pozicija: Tester')
        expect(wrapper.text()).toContain('El. paštas: Tester@Testing.com')
        expect(wrapper.text()).toContain('Telefono nr: +37061111111')
        expect(wrapper.text()).toContain('Adresas: Testing Street 20')
    })


});
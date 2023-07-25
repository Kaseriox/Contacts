import { describe, it, expect, beforeEach } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import PageNotFound from "../../src/Views/PageNotFound.vue"
describe("PageNotFound.vue", () => {
    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(PageNotFound,{
            mocks:{
                $router:{
                    push:vi.fn()
                }
            }
        })
    })
    
    it("Page Should Display Text Saying That Page Doesn't exist",async ()=>{
        const button = wrapper.find('button')
        expect(wrapper.text()).toContain('Puslapis, kurio ieškote, neegzistuoja')
        expect(button.text()).toContain('Grąžinti į pagrindinį puslapį')
    })

    it("Button Should Push Route To Main Page",async ()=>{
        const RoutePushSpy = vi.spyOn(wrapper.vm.$router,'push')
        expect(RoutePushSpy).toHaveBeenCalledTimes(0)
        const button = wrapper.find('button')
        await button.trigger('click')
        expect(RoutePushSpy).toHaveBeenCalledTimes(1)
        expect(RoutePushSpy).toHaveBeenCalledWith('/')
    })
})
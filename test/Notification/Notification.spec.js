import { describe, it, expect, beforeEach } from "vitest";
import createWrapper from '../.mockFactory/mockFactory'
import Notification from '../../src/Components/Notification/Notification.vue'

describe("Notification.vue", () => {
    vi.useFakeTimers()
    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(Notification)
    })
    

    it("Should Display Success Notification With Message",async ()=>{
        let Notification = wrapper.find('div')
        expect(Notification.exists()).toBe(false)
        wrapper.vm.$store.state.Notification.type = 'success'
        wrapper.vm.$store.state.Notification.message = 'Testing Success Notification'
        await wrapper.vm.$nextTick()
        Notification = wrapper.find('div')
        expect(Notification.exists()).toBe(true)
        expect(Notification.text()).toContain('Testing Success Notification')
        expect(Notification.text()).toContain('Check icon')
    })

    it("Should Display Error Notification With Message",async ()=>{
        let Notification = wrapper.find('div')
        expect(Notification.exists()).toBe(false)
        wrapper.vm.$store.state.Notification.type = 'error'
        wrapper.vm.$store.state.Notification.message = 'Testing Error Notification'
        await wrapper.vm.$nextTick()
        Notification = wrapper.find('div')
        expect(Notification.exists()).toBe(true)
        expect(Notification.text()).toContain('Testing Error Notification')
        expect(Notification.text()).toContain('Error icon')
    })

    it("Should Display Warning Notification With Message",async ()=>{
        let Notification = wrapper.find('div')
        expect(Notification.exists()).toBe(false)
        wrapper.vm.$store.state.Notification.type = 'warning'
        wrapper.vm.$store.state.Notification.message = 'Testing Warning Notification'
        await wrapper.vm.$nextTick()
        Notification = wrapper.find('div')
        expect(Notification.exists()).toBe(true)
        expect(Notification.text()).toContain('Testing Warning Notification')
        expect(Notification.text()).toContain('Warning icon')
    })

    it("Notification Should Dissapear After 5 Seconds",async ()=>{
        let Notification = wrapper.find('div')
        expect(Notification.exists()).toBe(false)
        wrapper.vm.$store.state.Notification.type = 'error'
        wrapper.vm.$store.state.Notification.message = 'Testing Error Notification'
        await wrapper.vm.$nextTick()
        Notification = wrapper.find('div')
        expect(Notification.exists()).toBe(true)
        expect(Notification.text()).toContain('Testing Error Notification')
        expect(Notification.text()).toContain('Error icon')
        await vi.advanceTimersByTime(5000)
        Notification = wrapper.find('div')
        expect(Notification.exists()).toBe(false)
    })

    it("Notification Should Dissapear On Route Path Change",async ()=>{
        let Notification = wrapper.find('div')
        expect(Notification.exists()).toBe(false)
        wrapper.vm.$store.state.Notification.type = 'error'
        wrapper.vm.$store.state.Notification.message = 'Testing Error Notification'
        await wrapper.vm.$nextTick()
        Notification = wrapper.find('div')
        expect(Notification.exists()).toBe(true)
        expect(Notification.text()).toContain('Testing Error Notification')
        expect(Notification.text()).toContain('Error icon')
        wrapper.vm.$route.path = '/test'
        await wrapper.vm.$nextTick()
        Notification = wrapper.find('div')
        expect(Notification.exists()).toBe(false)
    })
})
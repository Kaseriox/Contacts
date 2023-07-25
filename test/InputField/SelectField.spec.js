import { describe, it, expect, vi } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import SelectField from "../../src/Components/InputField/SelectField.vue";

describe("SelectField.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(SelectField, {
      propsData: {
        label: "Įmonės",
        open: true,
        value:'',
        options: [
          {
            collectionId: "6pm3nos89zp7y7o",
            collectionName: "companies",
            created: "2023-02-20 11:44:14.612Z",
            id: "5ask1scw3rf23yq",
            name: "TELTONIKA NETWORKS",
            updated: "2023-07-12 08:56:12.708Z",
            expand: {},
          },
          {
            collectionId: "6pm3nos89zp7y7o",
            collectionName: "companies",
            created: "2023-02-20 11:44:22.744Z",
            id: "yqxlilctgbchc22",
            name: "TELTONIKA TELEMATICS",
            updated: "2023-02-20 11:44:22.744Z",
            expand: {},
          },
          {
            collectionId: "6pm3nos89zp7y7o",
            collectionName: "companies",
            created: "2023-02-21 11:57:14.240Z",
            id: "gud0wunpwb8g08e",
            name: "TELTONIKA ENERGY",
            updated: "2023-07-05 08:52:12.791Z",
            expand: {},
          },
        ],
        placeholder:'Pasirinkite įmonę'
      },
    });
  });



    it("Should Render Display Correct Choices", () => {
        const options = wrapper.find('select').findAll('option')
        expect(options.at(0).text()).toContain('Pasirinkite įmonę')
        expect(options.at(1).text()).toContain('TELTONIKA NETWORKS')
        expect(options.at(2).text()).toContain('TELTONIKA TELEMATICS')
        expect(options.at(3).text()).toContain('TELTONIKA ENERGY')
    });

    it('Should Show Error Message If "error" variable Is A String Value',async ()=>{
    let error = wrapper.find('[class="text-center text-custom-red"]')
    expect(error.exists()).toBe(false)
    wrapper.vm.$data.error = 'test error'
    await wrapper.vm.$nextTick()
    error = wrapper.find('[class="text-center text-custom-red"]')
    expect(error.exists()).toBe(true)
    expect(error.text()).toContain('test error')
    });

    it('Should Emit Event If There Is A Selection',async ()=>{
        const options = wrapper.find('select').findAll('option')
        await options.at(1).setSelected()
        expect(wrapper.emitted().input).toBeTruthy()
        expect(wrapper.emitted().input.length).toBe(1)
        expect(wrapper.emitted().input[0]).toEqual(['5ask1scw3rf23yq'])
        expect(wrapper.find('option:checked').element.value).toBe('5ask1scw3rf23yq')
    })
    it("Should Disable Selection If Props Variable 'open' Is Set To False",()=>{
      wrapper.destroy()
      wrapper = createWrapper(SelectField, {
        propsData: {
          label: "Įmonės",
          open: false,
          value:'',
          options: [
            {
              collectionId: "6pm3nos89zp7y7o",
              collectionName: "companies",
              created: "2023-02-20 11:44:14.612Z",
              id: "5ask1scw3rf23yq",
              name: "TELTONIKA NETWORKS",
              updated: "2023-07-12 08:56:12.708Z",
              expand: {},
            },
            {
              collectionId: "6pm3nos89zp7y7o",
              collectionName: "companies",
              created: "2023-02-20 11:44:22.744Z",
              id: "yqxlilctgbchc22",
              name: "TELTONIKA TELEMATICS",
              updated: "2023-02-20 11:44:22.744Z",
              expand: {},
            },
            {
              collectionId: "6pm3nos89zp7y7o",
              collectionName: "companies",
              created: "2023-02-21 11:57:14.240Z",
              id: "gud0wunpwb8g08e",
              name: "TELTONIKA ENERGY",
              updated: "2023-07-05 08:52:12.791Z",
              expand: {},
            },
          ],
          placeholder:'Pasirinkite įmonę'
        },
      });
      const selection = wrapper.find('select')
      expect(selection.attributes().disabled).toBeDefined()
  })
    
});

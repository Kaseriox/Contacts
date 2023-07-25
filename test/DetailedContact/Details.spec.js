import { describe, it, expect, vi } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import Details from "../../src/Components/DetailedContact/Details.vue";
describe("Details.vue", () => {
  let wrapper;
  const GetDataSpy = vi.spyOn(Details.methods,'GetData')
  beforeEach(() => {
    wrapper = createWrapper(Details, {
        propsData:{
            id:12
        },
      mocks: {
        $GetCollection() {
          return new Promise((resolve) => {
            resolve({
              items: [
                {
                  collectionId: "b2oym7fr4tkhpsr",
                  collectionName: "employees",
                  company_id: "5ask1scw3rf23yq",
                  created: "2023-02-20 12:33:50.440Z",
                  department_id: "h3cchigia2xtmzk",
                  division_id: "1uio162voxfj2ot",
                  email: "gedas.test@teltonika.lt",
                  expand: {
                    company_id: {
                      collectionId: "6pm3nos89zp7y7o",
                      collectionName: "companies",
                      created: "2023-02-20 11:44:14.612Z",
                      id: "5ask1scw3rf23yq",
                      name: "TELTONIKA NETWORKS",
                      updated: "2023-07-17 13:54:58.277Z",
                      expand: {},
                    },
                    department_id: {
                      collectionId: "bthy7mqw35rkvvb",
                      collectionName: "departments",
                      created: "2023-02-20 12:02:43.008Z",
                      id: "h3cchigia2xtmzk",
                      name: "IoT akademija",
                      updated: "2023-07-17 13:55:11.312Z",
                      expand: {},
                    },
                    division_id: {
                      collectionId: "bakpn5k6ntn68n3",
                      collectionName: "divisions",
                      created: "2023-02-20 10:00:29.661Z",
                      id: "1uio162voxfj2ot",
                      name: "HRD",
                      updated: "2023-07-17 13:55:07.319Z",
                      expand: {},
                    },
                    office_id: {
                      city: "Kaunas",
                      collectionId: "sgv7cbhlqq9svxa",
                      collectionName: "offices",
                      country: "Lithuania",
                      created: "2023-02-20 09:51:32.012Z",
                      id: "vm438vfq27bg17e",
                      name: "K. Baršausko st. 66, Kaunas, Lithuania",
                      street: "K. Baršausko st.",
                      street_number: "66",
                      updated: "2023-07-17 13:55:03.870Z",
                      expand: {},
                    },
                  },
                  group_id: "",
                  id: "bfjmhvdguk99hxx",
                  name: "Gedas",
                  office_id: "vm438vfq27bg17e",
                  phone_number: "+370648977894591",
                  photo: "",
                  position: "Iot academy coordinator",
                  surname: "Test",
                  updated: "2023-07-17 12:52:10.367Z",
                },
              ],

            });
          });
        },
      },
    });
  });

  it("Created Lifecycle Hook Should Call 'GetData' Method", async () => {
    expect(GetDataSpy).toHaveBeenCalledTimes(1)
  });
  it("Should Contain All Necessary Information",()=>{
    expect(wrapper.text()).toContain('Detalesnė kontakto informacija:')
    expect(wrapper.text()).toContain('Gedas Test')
    expect(wrapper.text()).toContain('Pozicija: Iot academy coordinator')
    expect(wrapper.text()).toContain('Kontaktinės detalės:')
    expect(wrapper.text()).toContain('Kompanijos detalės:')
    expect(wrapper.text()).toContain('Elektroninis paštas: gedas.test@teltonika.lt')
    expect(wrapper.text()).toContain('Telefono numeris: +370648977894591')
    expect(wrapper.text()).toContain('Kompanija: TELTONIKA NETWORKS')
    expect(wrapper.text()).toContain('Būstinė: K. Baršausko st. 66, Kaunas, Lithuania')
    expect(wrapper.text()).toContain('Padalinys: HRD')
    expect(wrapper.text()).toContain('Skyrius: IoT akademija')
    expect(wrapper.text()).toContain('Grupė: Nėra grupės')
  })
});

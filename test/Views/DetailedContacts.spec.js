import { describe, it, expect, vi } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import DetailedContacts from "../../src/Views/DetailedContacts.vue"
import Details from "../../src/Components/DetailedContact/Details.vue"
import Header from "../../src/Components/Header/Header.vue"
describe("StructureManagement.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(DetailedContacts,{
      mocks:{
        $route:{
            params:{
                id:'5'
            }
        },
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
    }
    });
  });

  it("Should Display OfficeManage Component When StructureComponent Is Set To It",async ()=>{
    expect(wrapper.findComponent(Details).exists()).toBe(true)
    expect(wrapper.findComponent(Header).exists()).toBe(true)
    expect(wrapper.findComponent(Details).props().id).toBe('5')

  })
});

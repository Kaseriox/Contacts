import { describe, it, expect, vi } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import Contacts from "../../src/Components/Contacts/Contacts.vue";
import ContactCards from "../../src/Components/Contacts/ContactDisplay/Cards/ContactCards.vue"
import Table from "../../src/Components/Reusables/Table.vue"
describe("Contacts.vue", () => {
  let wrapper;
  let GetDataSpy = vi.spyOn(Contacts.methods, "GetData");
  let SetItemCountSpy = vi.spyOn(Contacts.methods,'set_item_count')
  beforeEach(() => {
    wrapper = createWrapper(Contacts, {
      mocks: {
        $GetCollection() {
          return new Promise((resolve) =>
            resolve({
              items: [
                {
                  collectionId: "b2oym7fr4tkhpsr",
                  collectionName: "employees",
                  company_id: "5ask1scw3rf23yq",
                  created: "2023-02-20 12:33:10.198Z",
                  department_id: "h3cchigia2xtmzk",
                  division_id: "1uio162voxfj2ot",
                  email: "lukas.test@teltonika.lt",
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
                  id: "xt0frf8gtmq4wzr",
                  name: "Lukas",
                  office_id: "vm438vfq27bg17e",
                  phone_number: "+3706549997779",
                  photo: "",
                  position: "IoT academy manager",
                  surname: "Test",
                  updated: "2023-02-20 12:33:10.198Z",
                },
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
                {
                  collectionId: "b2oym7fr4tkhpsr",
                  collectionName: "employees",
                  company_id: "5ask1scw3rf23yq",
                  created: "2023-07-18 03:55:24.575Z",
                  department_id: "w0bc7yv297l1uej",
                  division_id: "dmgqn0scy1z4qym",
                  email: "Test@test.com",
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
                      created: "2023-02-20 12:37:50.627Z",
                      id: "w0bc7yv297l1uej",
                      name: "Programuotojų",
                      updated: "2023-02-20 12:37:50.627Z",
                      expand: {},
                    },
                    division_id: {
                      collectionId: "bakpn5k6ntn68n3",
                      collectionName: "divisions",
                      created: "2023-02-20 10:00:42.505Z",
                      id: "dmgqn0scy1z4qym",
                      name: "RnD",
                      updated: "2023-02-20 12:03:13.973Z",
                      expand: {},
                    },
                    group_id: {
                      collectionId: "57faccb7837p3uh",
                      collectionName: "groups",
                      created: "2023-02-20 12:38:28.212Z",
                      id: "13qspmhdzfcro2o",
                      name: "Tinklų",
                      updated: "2023-02-20 12:38:28.212Z",
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
                  group_id: "13qspmhdzfcro2o",
                  id: "mtuw3y0uu0sel5h",
                  name: "Testing",
                  office_id: "vm438vfq27bg17e",
                  phone_number: "+37061111111",
                  photo:
                    "54e9d447425aae14f1dc8460962e33791c3ad6e04e5074417c2f7cd39e4dc4_640_T52F24kpkk.jpg",
                  position: "Testing Position",
                  surname: "test",
                  updated: "2023-07-18 03:55:24.575Z",
                },
              ],
              'totalItems':3
            })
          );
        },
      },
    });
  });

  it("Created Lifecycle Hook Should Call GetData Method ", () => {
    expect(GetDataSpy).toHaveBeenCalledTimes(1);
    expect(SetItemCountSpy).toHaveBeenCalledTimes(1)
    expect(SetItemCountSpy).toHaveBeenCalledWith(3)
    expect(wrapper.vm.$data.Contacts).toBeTruthy()
    
  });
  it("ViewComponent Variable Should Change If ChangeView Method Is Called",async ()=>{
    expect(wrapper.vm.$data.ViewComponent).toBe(ContactCards)
    await wrapper.vm.ChangeView()
    expect(wrapper.vm.$data.ViewComponent).toBe(Table)
  })
  it("Should Display Text 'Kontaktų Sistema'",()=>{
    expect(wrapper.text()).toContain('Kontaktų Sistema')
  })
  it("Should Call Function 'GetData' Once PageNumber Changes",async ()=>{
    const GetDataSpy = vi.spyOn(wrapper.vm,'GetData')
    expect(GetDataSpy).toHaveBeenCalledTimes(0)
    expect(wrapper.vm.$store.state.Paging.Page).toBe(1)
    wrapper.vm.$store.state.Paging.Page = 25
    await wrapper.vm.$nextTick()
    expect(GetDataSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$store.state.Paging.Page).toBe(25)
  })
  it("Should Call Function 'GetData' Once ItemsPerPage Changes",async ()=>{
    const GetDataSpy = vi.spyOn(wrapper.vm,'GetData')
    expect(GetDataSpy).toHaveBeenCalledTimes(0)
    expect(wrapper.vm.$store.state.Paging.ItemsPerPage).toBe(25)
    wrapper.vm.$store.state.Paging.ItemsPerPage = 5
    await wrapper.vm.$nextTick()
    expect(GetDataSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$store.state.Paging.ItemsPerPage).toBe(5)
  })
  it("Should Call Function 'GetData' Once FilterString Changes",async ()=>{
    const GetDataSpy = vi.spyOn(wrapper.vm,'GetData')
    expect(GetDataSpy).toHaveBeenCalledTimes(0)
    expect(wrapper.vm.$store.state.Paging.Filter.length).toBe(0)
    wrapper.vm.$store.state.Paging.Filter = [`company_id='d5qd4wq4qdw2d2f'`]
    await wrapper.vm.$nextTick()
    expect(GetDataSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$store.state.Paging.Filter.length).toBe(1)
    expect(wrapper.vm.$store.state.Paging.Filter).toStrictEqual([`company_id='d5qd4wq4qdw2d2f'`])

  })

  it("Should Call Function 'GetData' Once refreshID Changes",async ()=>{
    const GetDataSpy = vi.spyOn(wrapper.vm,'GetData')
    expect(GetDataSpy).toHaveBeenCalledTimes(0)
    expect(wrapper.vm.$store.state.Refresh.refresh).toBe(0)
    wrapper.vm.$store.state.Refresh.refresh = 1
    await wrapper.vm.$nextTick()
    expect(GetDataSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$store.state.Refresh.refresh).toBe(1)

  })
});

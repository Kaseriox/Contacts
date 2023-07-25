import { describe, it, expect } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import ContactCards from "../../../../src/Components/Contacts/ContactDisplay/Cards/ContactCards.vue";
import Card from "../../../../src/Components/Contacts/ContactDisplay/Cards/Card.vue";
describe("ContactCards.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(ContactCards, {
      propsData: {
        data: [
          {
            collectionId: "b2oym7fr4tkhpsr",
            collection: "employees",
            id: "xt0frf8gtmq4wzr",
            "Vardas ir pavardė": "Lukas Test",
            Pozicija: "IoT academy manager",
            "Telefono numeris": "+3706549997779",
            "Elektroninis paštas": "lukas.test@teltonika.lt",
            Adresas: "K. Baršausko st. 66, Kaunas, Lithuania",
            photo: "",
          },
          {
            collectionId: "b2oym7fr4tkhpsr",
            collection: "employees",
            id: "bfjmhvdguk99hxx",
            "Vardas ir pavardė": "Gedas Test",
            Pozicija: "Iot academy coordinator",
            "Telefono numeris": "+370648977894591",
            "Elektroninis paštas": "gedas.test@teltonika.lt",
            Adresas: "K. Baršausko st. 66, Kaunas, Lithuania",
            photo: "",
          },
          {
            collectionId: "b2oym7fr4tkhpsr",
            collection: "employees",
            id: "mtuw3y0uu0sel5h",
            "Vardas ir pavardė": "Testing test",
            Pozicija: "Testing Position",
            "Telefono numeris": "+37061111111",
            "Elektroninis paštas": "Test@test.com",
            Adresas: "K. Baršausko st. 66, Kaunas, Lithuania",
            photo:
              "54e9d447425aae14f1dc8460962e33791c3ad6e04e5074417c2f7cd39e4dc4_640_T52F24kpkk.jpg",
          },
        ],
      },


    });
  });


  it('Should Contain 3 Card Components',()=>{
    const cards = wrapper.findAllComponents(Card)
    expect(cards.exists()).toBe(true)
    expect(cards).toHaveLength(3)
    
  })
});

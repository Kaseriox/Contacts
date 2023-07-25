import { describe, it, expect, vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import EditEmployeeForm from "../../../../src/Components/Form/Forms/Employee/EditEmployeeForm.vue";
describe("EditCompanyForm.vue", () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = createWrapper(EditEmployeeForm, {
      mocks: {
        $GetCollection({Collection})
        {
            switch(Collection)
            {
                case 'companies':
                    return Promise.resolve({items:[{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:14.612Z","id":"5ask1scw3rf23yq","name":"TELTONIKA NETWORKS","updated":"2023-07-12 08:56:12.708Z","expand":{}},{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:22.744Z","id":"yqxlilctgbchc22","name":"TELTONIKA TELEMATICS","updated":"2023-02-20 11:44:22.744Z","expand":{}},{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-21 11:57:14.240Z","id":"gud0wunpwb8g08e","name":"TELTONIKA ENERGY","updated":"2023-07-05 08:52:12.791Z","expand":{}}]})
                case 'companies_offices':
                    return Promise.resolve({items:[
                        {
                            "collectionId": "69msfhns5ee63rg",
                            "collectionName": "companies_offices",
                            "company_id": "5ask1scw3rf23yq",
                            "created": "2023-02-20 11:49:52.948Z",
                            "expand": {
                                "office_id": {
                                    "city": "Vilnius",
                                    "collectionId": "sgv7cbhlqq9svxa",
                                    "collectionName": "offices",
                                    "country": "Lithuania",
                                    "created": "2023-02-20 09:57:31.159Z",
                                    "id": "sc6mh0r9dny79um",
                                    "name": "Saltoniškių st. 2, Vilnius, Lithuania",
                                    "street": "Saltoniškių st.",
                                    "street_number": "2",
                                    "updated": "2023-02-20 12:26:53.095Z",
                                    "expand": {}
                                }
                            },
                            "id": "kre1c8dkynqinmp",
                            "office_id": "sc6mh0r9dny79um",
                            "updated": "2023-02-20 11:49:52.948Z"
                        },
                        {
                            "collectionId": "69msfhns5ee63rg",
                            "collectionName": "companies_offices",
                            "company_id": "5ask1scw3rf23yq",
                            "created": "2023-02-20 11:50:09.060Z",
                            "expand": {
                                "office_id": {
                                    "city": "Kaunas",
                                    "collectionId": "sgv7cbhlqq9svxa",
                                    "collectionName": "offices",
                                    "country": "Lithuania",
                                    "created": "2023-02-20 09:51:32.012Z",
                                    "id": "vm438vfq27bg17e",
                                    "name": "K. Baršausko st. 66, Kaunas, Lithuania",
                                    "street": "K. Baršausko st.",
                                    "street_number": "66",
                                    "updated": "2023-07-12 09:00:54.925Z",
                                    "expand": {}
                                }
                            },
                            "id": "lq7ibz15ismb62d",
                            "office_id": "vm438vfq27bg17e",
                            "updated": "2023-02-20 11:50:09.060Z"
                        }
                    ]})
                case 'offices_divisions':
                    return Promise.resolve({items:[
                        {
                            "collectionId": "zzim4v132ojclwp",
                            "collectionName": "offices_divisions",
                            "created": "2023-02-20 12:35:30.448Z",
                            "division_id": "dmgqn0scy1z4qym",
                            "expand": {
                                "division_id": {
                                    "collectionId": "bakpn5k6ntn68n3",
                                    "collectionName": "divisions",
                                    "created": "2023-02-20 10:00:42.505Z",
                                    "id": "dmgqn0scy1z4qym",
                                    "name": "RnD",
                                    "updated": "2023-02-20 12:03:13.973Z",
                                    "expand": {}
                                }
                            },
                            "id": "rn8ndsgfln8a74e",
                            "office_id": "sc6mh0r9dny79um",
                            "updated": "2023-02-20 12:35:30.448Z"
                        },
                        {
                            "collectionId": "zzim4v132ojclwp",
                            "collectionName": "offices_divisions",
                            "created": "2023-02-20 12:35:39.000Z",
                            "division_id": "5xwpimcs50j6ygi",
                            "expand": {
                                "division_id": {
                                    "collectionId": "bakpn5k6ntn68n3",
                                    "collectionName": "divisions",
                                    "created": "2023-02-20 12:29:49.776Z",
                                    "id": "5xwpimcs50j6ygi",
                                    "name": "Administracija",
                                    "updated": "2023-02-20 12:43:38.491Z",
                                    "expand": {}
                                }
                            },
                            "id": "mxme4lx9xyois1i",
                            "office_id": "sc6mh0r9dny79um",
                            "updated": "2023-02-20 12:35:39.000Z"
                        }
                    ]})
                case 'divisions_departments':
                    return Promise.resolve({items:[
                        {
                            "collectionId": "ter9l3qqq9aqgj2",
                            "collectionName": "divisions_departments",
                            "created": "2023-02-20 12:44:23.355Z",
                            "department_id": "w0bc7yv297l1uej",
                            "division_id": "dmgqn0scy1z4qym",
                            "expand": {
                                "department_id": {
                                    "collectionId": "bthy7mqw35rkvvb",
                                    "collectionName": "departments",
                                    "created": "2023-02-20 12:37:50.627Z",
                                    "id": "w0bc7yv297l1uej",
                                    "name": "Programuotojų",
                                    "updated": "2023-02-20 12:37:50.627Z",
                                    "expand": {}
                                }
                            },
                            "id": "o8ywt19e6vnm3w1",
                            "updated": "2023-02-20 12:44:23.355Z"
                        },
                        {
                            "collectionId": "ter9l3qqq9aqgj2",
                            "collectionName": "divisions_departments",
                            "created": "2023-02-20 12:44:31.297Z",
                            "department_id": "3e8d0k0jpeg7pvg",
                            "division_id": "dmgqn0scy1z4qym",
                            "expand": {
                                "department_id": {
                                    "collectionId": "bthy7mqw35rkvvb",
                                    "collectionName": "departments",
                                    "created": "2023-02-20 12:37:29.907Z",
                                    "id": "3e8d0k0jpeg7pvg",
                                    "name": "Konstruktorių",
                                    "updated": "2023-02-20 12:37:42.835Z",
                                    "expand": {}
                                }
                            },
                            "id": "r1q6lakyj1e9sfn",
                            "updated": "2023-02-20 12:44:31.297Z"
                        },
                        {
                            "collectionId": "ter9l3qqq9aqgj2",
                            "collectionName": "divisions_departments",
                            "created": "2023-02-20 12:44:39.545Z",
                            "department_id": "yyn7p8ka5stjvr6",
                            "division_id": "dmgqn0scy1z4qym",
                            "expand": {
                                "department_id": {
                                    "collectionId": "bthy7mqw35rkvvb",
                                    "collectionName": "departments",
                                    "created": "2023-02-20 12:36:51.570Z",
                                    "id": "yyn7p8ka5stjvr6",
                                    "name": "Testavimo",
                                    "updated": "2023-02-20 12:37:45.732Z",
                                    "expand": {}
                                }
                            },
                            "id": "gh5ksyz2bibj889",
                            "updated": "2023-02-20 12:44:39.545Z"
                        }
                    ]})
                case 'departments_groups':
                    return Promise.resolve({items:[
                        {
                            "collectionId": "tc5kfi49ge03emy",
                            "collectionName": "departments_groups",
                            "created": "2023-02-20 12:40:30.668Z",
                            "department_id": "3e8d0k0jpeg7pvg",
                            "expand": {
                                "group_id": {
                                    "collectionId": "57faccb7837p3uh",
                                    "collectionName": "groups",
                                    "created": "2023-02-20 12:40:19.780Z",
                                    "id": "g102qzh1azou2sg",
                                    "name": "Elektronikos inžinierių",
                                    "updated": "2023-02-20 12:40:19.780Z",
                                    "expand": {}
                                }
                            },
                            "group_id": "g102qzh1azou2sg",
                            "id": "ch8m3er90q3b431",
                            "updated": "2023-02-20 12:40:30.668Z"
                        },
                        {
                            "collectionId": "tc5kfi49ge03emy",
                            "collectionName": "departments_groups",
                            "created": "2023-02-20 12:40:39.492Z",
                            "department_id": "3e8d0k0jpeg7pvg",
                            "expand": {
                                "group_id": {
                                    "collectionId": "57faccb7837p3uh",
                                    "collectionName": "groups",
                                    "created": "2023-02-20 12:40:09.701Z",
                                    "id": "q1bctefaiwik1o1",
                                    "name": "Mechanikos inžinierių",
                                    "updated": "2023-02-20 12:40:09.701Z",
                                    "expand": {}
                                }
                            },
                            "group_id": "q1bctefaiwik1o1",
                            "id": "vj4cg8pg45eq2gx",
                            "updated": "2023-02-20 12:40:39.492Z"
                        }
                    ]})
                case 'offices':
                    return Promise.resolve({items:[
                        {
                            "city": "Kaunas",
                            "collectionId": "sgv7cbhlqq9svxa",
                            "collectionName": "offices",
                            "country": "Lithuania",
                            "created": "2023-02-20 09:51:32.012Z",
                            "id": "vm438vfq27bg17e",
                            "name": "K. Baršausko st. 66, Kaunas, Lithuania",
                            "street": "K. Baršausko st.",
                            "street_number": "66",
                            "updated": "2023-07-17 13:55:03.870Z"
                        },
                        {
                            "city": "Vilnius",
                            "collectionId": "sgv7cbhlqq9svxa",
                            "collectionName": "offices",
                            "country": "Lithuania",
                            "created": "2023-02-20 09:57:31.159Z",
                            "id": "sc6mh0r9dny79um",
                            "name": "Saltoniškių st. 2, Vilnius, Lithuania",
                            "street": "Saltoniškių st.",
                            "street_number": "2",
                            "updated": "2023-02-20 12:26:53.095Z"
                        },
                        {
                            "city": "Vilnius",
                            "collectionId": "sgv7cbhlqq9svxa",
                            "collectionName": "offices",
                            "country": "Lithuania",
                            "created": "2023-02-20 09:59:45.806Z",
                            "id": "6nfo4x8qda3rfhi",
                            "name": "Saltoniškių st. 9B-1, Vilnius, Lithuania",
                            "street": "Saltoniškių st.",
                            "street_number": "9B-1",
                            "updated": "2023-02-20 12:26:27.397Z"
                        },
                        {
                            "city": "Kaunas",
                            "collectionId": "sgv7cbhlqq9svxa",
                            "collectionName": "offices",
                            "country": "Lithuania",
                            "created": "2023-02-21 12:10:52.834Z",
                            "id": "vcu1j5pg3hxjonj",
                            "name": "Jonavos st. 150, Kaunas, Lithuania",
                            "street": "Jonavos st.",
                            "street_number": "150",
                            "updated": "2023-02-21 12:18:04.110Z"
                        },
                        {
                            "city": "Test",
                            "collectionId": "sgv7cbhlqq9svxa",
                            "collectionName": "offices",
                            "country": "Test",
                            "created": "2023-02-21 14:29:58.821Z",
                            "id": "0x1lb38vvho36ng",
                            "name": "Test office",
                            "street": "Test st.",
                            "street_number": "9999",
                            "updated": "2023-02-21 14:29:58.821Z"
                        }
                    ]})
                case 'divisions':
                    return Promise.resolve({items:[
                        {
                            "collectionId": "bakpn5k6ntn68n3",
                            "collectionName": "divisions",
                            "created": "2023-02-20 10:00:29.661Z",
                            "id": "1uio162voxfj2ot",
                            "name": "HRD",
                            "updated": "2023-07-20 04:20:51.210Z"
                        },
                        {
                            "collectionId": "bakpn5k6ntn68n3",
                            "collectionName": "divisions",
                            "created": "2023-02-20 10:00:42.505Z",
                            "id": "dmgqn0scy1z4qym",
                            "name": "RnD",
                            "updated": "2023-02-20 12:03:13.973Z"
                        },
                        {
                            "collectionId": "bakpn5k6ntn68n3",
                            "collectionName": "divisions",
                            "created": "2023-02-20 12:29:49.776Z",
                            "id": "5xwpimcs50j6ygi",
                            "name": "Administracija",
                            "updated": "2023-02-20 12:43:38.491Z"
                        },
                        {
                            "collectionId": "bakpn5k6ntn68n3",
                            "collectionName": "divisions",
                            "created": "2023-02-20 12:31:19.756Z",
                            "id": "53fjrf5alo40nc2",
                            "name": "Marketingas",
                            "updated": "2023-02-20 12:31:19.756Z"
                        },
                        {
                            "collectionId": "bakpn5k6ntn68n3",
                            "collectionName": "divisions",
                            "created": "2023-02-20 12:31:25.363Z",
                            "id": "fpuqxr7ahshmwrh",
                            "name": "Pardavimai",
                            "updated": "2023-02-20 12:31:25.363Z"
                        }
                    ]})
                case 'departments':
                    return Promise.resolve({items:[
                        {
                            "collectionId": "bthy7mqw35rkvvb",
                            "collectionName": "departments",
                            "created": "2023-02-20 12:02:43.008Z",
                            "id": "h3cchigia2xtmzk",
                            "name": "IoT akademija",
                            "updated": "2023-07-17 13:55:11.312Z"
                        },
                        {
                            "collectionId": "bthy7mqw35rkvvb",
                            "collectionName": "departments",
                            "created": "2023-02-20 12:36:51.570Z",
                            "id": "yyn7p8ka5stjvr6",
                            "name": "Testavimo",
                            "updated": "2023-02-20 12:37:45.732Z"
                        },
                        {
                            "collectionId": "bthy7mqw35rkvvb",
                            "collectionName": "departments",
                            "created": "2023-02-20 12:37:29.907Z",
                            "id": "3e8d0k0jpeg7pvg",
                            "name": "Konstruktorių",
                            "updated": "2023-02-20 12:37:42.835Z"
                        },
                        {
                            "collectionId": "bthy7mqw35rkvvb",
                            "collectionName": "departments",
                            "created": "2023-02-20 12:37:50.627Z",
                            "id": "w0bc7yv297l1uej",
                            "name": "Programuotojų",
                            "updated": "2023-02-20 12:37:50.627Z"
                        },
                        {
                            "collectionId": "bthy7mqw35rkvvb",
                            "collectionName": "departments",
                            "created": "2023-02-20 12:43:20.937Z",
                            "id": "pwg05eofg41afyi",
                            "name": "Biuro ir vadybos",
                            "updated": "2023-02-20 12:43:20.937Z"
                        },
                        {
                            "collectionId": "bthy7mqw35rkvvb",
                            "collectionName": "departments",
                            "created": "2023-02-20 12:43:57.537Z",
                            "id": "8t31iyvwrhqnmiq",
                            "name": "IT adminsitratorių",
                            "updated": "2023-02-20 12:43:57.537Z"
                        },
                        {
                            "collectionId": "bthy7mqw35rkvvb",
                            "collectionName": "departments",
                            "created": "2023-02-23 13:45:43.047Z",
                            "id": "9y1n8rkzaojgqzz",
                            "name": "Not existing",
                            "updated": "2023-02-23 13:45:43.047Z"
                        }
                    ]})
                case 'groups':
                    return Promise.resolve({items:[
                        {
                            "collectionId": "57faccb7837p3uh",
                            "collectionName": "groups",
                            "created": "2023-02-20 12:38:12.594Z",
                            "id": "oambg9goguergbw",
                            "name": "Įterptinių sistemų programuotojai",
                            "updated": "2023-07-17 13:55:14.823Z"
                        },
                        {
                            "collectionId": "57faccb7837p3uh",
                            "collectionName": "groups",
                            "created": "2023-02-20 12:38:28.212Z",
                            "id": "13qspmhdzfcro2o",
                            "name": "Tinklų",
                            "updated": "2023-02-20 12:38:28.212Z"
                        },
                        {
                            "collectionId": "57faccb7837p3uh",
                            "collectionName": "groups",
                            "created": "2023-02-20 12:40:09.701Z",
                            "id": "q1bctefaiwik1o1",
                            "name": "Mechanikos inžinierių",
                            "updated": "2023-02-20 12:40:09.701Z"
                        },
                        {
                            "collectionId": "57faccb7837p3uh",
                            "collectionName": "groups",
                            "created": "2023-02-20 12:40:19.780Z",
                            "id": "g102qzh1azou2sg",
                            "name": "Elektronikos inžinierių",
                            "updated": "2023-02-20 12:40:19.780Z"
                        },
                        {
                            "collectionId": "57faccb7837p3uh",
                            "collectionName": "groups",
                            "created": "2023-02-20 12:40:49.943Z",
                            "id": "tbw7dgokb1rf999",
                            "name": "Automatinių testų",
                            "updated": "2023-02-20 12:40:49.943Z"
                        },
                        {
                            "collectionId": "57faccb7837p3uh",
                            "collectionName": "groups",
                            "created": "2023-02-20 12:40:54.334Z",
                            "id": "rfeqj6fnktemyor",
                            "name": "Rankinių testų",
                            "updated": "2023-02-20 12:41:16.256Z"
                        },
                        {
                            "collectionId": "57faccb7837p3uh",
                            "collectionName": "groups",
                            "created": "2023-07-24 09:51:39.463Z",
                            "id": "b58njpf4qw5djxn",
                            "name": "Tettttt",
                            "updated": "2023-07-24 09:51:39.463Z"
                        }
                    ]})
            }
        },
        $GetSingleRecord()
        {
            return Promise.resolve({"collectionId":"b2oym7fr4tkhpsr","collectionName":"employees","company_id":"5ask1scw3rf23yq","created":"2023-02-20 12:33:50.440Z","department_id":"h3cchigia2xtmzk","division_id":"1uio162voxfj2ot","email":"gedas.test@teltonika.lt","group_id":"","id":"bfjmhvdguk99hxx","name":"Gedas","office_id":"vm438vfq27bg17e","phone_number":"+370648977894591","photo":"","position":"Iot academy coordinator","surname":"Test","updated":"2023-07-17 12:52:10.367Z","expand":{}})
        },
        $UpdateRecord()
        {
            return Promise.resolve(true)
        }
      },
    });
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()  
  });



  it("Should Populate Input Fields With Data From Record", () => {
    expect(wrapper.findAll('input').at(0).element.value).toContain('Gedas')
    expect(wrapper.findAll('input').at(1).element.value).toContain('Test')
    expect(wrapper.findAll('input').at(2).element.value).toContain('Iot academy coordinator')
    expect(wrapper.findAll('input').at(3).element.value).toContain('gedas.test@teltonika.lt')
    expect(wrapper.findAll('input').at(4).element.value).toContain('+370648977894591')
  })

  it("Should Validate Form On Pressing Submit Button",async ()=>{
    const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(0)
    const SubmitButton = wrapper.findAll('button').at(1)
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
  })


  it("Should Not Let Submit Form If Required Field Is Missing Information",async ()=>{
    const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
    const SubmitButton = wrapper.findAll('button').at(1)
    expect(ValidateFormSpy).toHaveBeenCalledTimes(0)
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
    expect(ValidateFormSpy).toHaveLastReturnedWith(true)

    wrapper.findAll('input').at(0).setValue('')
    await wrapper.vm.$nextTick()
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(2)
    expect(ValidateFormSpy).toHaveLastReturnedWith(false)

    wrapper.findAll('input').at(0).setValue('Testing')
    await wrapper.vm.$nextTick()
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(3)
    expect(ValidateFormSpy).toHaveLastReturnedWith(true)
  })
  it("Should Set Success Message if Record Is Updated",async ()=>{
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)
    await wrapper.findAll('button').at(1).trigger('click')
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Sėkmingai atnaujintas kontaktas',type:'success'})
  })
  it("Should Set Failure Message If Records Failed To Update",async ()=>{
    wrapper.destroy()
    wrapper = createWrapper(EditEmployeeForm, {
        mocks: {
          $GetCollection({Collection})
          {
              switch(Collection)
              {
                  case 'companies':
                      return Promise.resolve({items:[{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:14.612Z","id":"5ask1scw3rf23yq","name":"TELTONIKA NETWORKS","updated":"2023-07-12 08:56:12.708Z","expand":{}},{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:22.744Z","id":"yqxlilctgbchc22","name":"TELTONIKA TELEMATICS","updated":"2023-02-20 11:44:22.744Z","expand":{}},{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-21 11:57:14.240Z","id":"gud0wunpwb8g08e","name":"TELTONIKA ENERGY","updated":"2023-07-05 08:52:12.791Z","expand":{}}]})
                  case 'companies_offices':
                      return Promise.resolve({items:[
                          {
                              "collectionId": "69msfhns5ee63rg",
                              "collectionName": "companies_offices",
                              "company_id": "5ask1scw3rf23yq",
                              "created": "2023-02-20 11:49:52.948Z",
                              "expand": {
                                  "office_id": {
                                      "city": "Vilnius",
                                      "collectionId": "sgv7cbhlqq9svxa",
                                      "collectionName": "offices",
                                      "country": "Lithuania",
                                      "created": "2023-02-20 09:57:31.159Z",
                                      "id": "sc6mh0r9dny79um",
                                      "name": "Saltoniškių st. 2, Vilnius, Lithuania",
                                      "street": "Saltoniškių st.",
                                      "street_number": "2",
                                      "updated": "2023-02-20 12:26:53.095Z",
                                      "expand": {}
                                  }
                              },
                              "id": "kre1c8dkynqinmp",
                              "office_id": "sc6mh0r9dny79um",
                              "updated": "2023-02-20 11:49:52.948Z"
                          },
                          {
                              "collectionId": "69msfhns5ee63rg",
                              "collectionName": "companies_offices",
                              "company_id": "5ask1scw3rf23yq",
                              "created": "2023-02-20 11:50:09.060Z",
                              "expand": {
                                  "office_id": {
                                      "city": "Kaunas",
                                      "collectionId": "sgv7cbhlqq9svxa",
                                      "collectionName": "offices",
                                      "country": "Lithuania",
                                      "created": "2023-02-20 09:51:32.012Z",
                                      "id": "vm438vfq27bg17e",
                                      "name": "K. Baršausko st. 66, Kaunas, Lithuania",
                                      "street": "K. Baršausko st.",
                                      "street_number": "66",
                                      "updated": "2023-07-12 09:00:54.925Z",
                                      "expand": {}
                                  }
                              },
                              "id": "lq7ibz15ismb62d",
                              "office_id": "vm438vfq27bg17e",
                              "updated": "2023-02-20 11:50:09.060Z"
                          }
                      ]})
                  case 'offices_divisions':
                      return Promise.resolve({items:[
                          {
                              "collectionId": "zzim4v132ojclwp",
                              "collectionName": "offices_divisions",
                              "created": "2023-02-20 12:35:30.448Z",
                              "division_id": "dmgqn0scy1z4qym",
                              "expand": {
                                  "division_id": {
                                      "collectionId": "bakpn5k6ntn68n3",
                                      "collectionName": "divisions",
                                      "created": "2023-02-20 10:00:42.505Z",
                                      "id": "dmgqn0scy1z4qym",
                                      "name": "RnD",
                                      "updated": "2023-02-20 12:03:13.973Z",
                                      "expand": {}
                                  }
                              },
                              "id": "rn8ndsgfln8a74e",
                              "office_id": "sc6mh0r9dny79um",
                              "updated": "2023-02-20 12:35:30.448Z"
                          },
                          {
                              "collectionId": "zzim4v132ojclwp",
                              "collectionName": "offices_divisions",
                              "created": "2023-02-20 12:35:39.000Z",
                              "division_id": "5xwpimcs50j6ygi",
                              "expand": {
                                  "division_id": {
                                      "collectionId": "bakpn5k6ntn68n3",
                                      "collectionName": "divisions",
                                      "created": "2023-02-20 12:29:49.776Z",
                                      "id": "5xwpimcs50j6ygi",
                                      "name": "Administracija",
                                      "updated": "2023-02-20 12:43:38.491Z",
                                      "expand": {}
                                  }
                              },
                              "id": "mxme4lx9xyois1i",
                              "office_id": "sc6mh0r9dny79um",
                              "updated": "2023-02-20 12:35:39.000Z"
                          }
                      ]})
                  case 'divisions_departments':
                      return Promise.resolve({items:[
                          {
                              "collectionId": "ter9l3qqq9aqgj2",
                              "collectionName": "divisions_departments",
                              "created": "2023-02-20 12:44:23.355Z",
                              "department_id": "w0bc7yv297l1uej",
                              "division_id": "dmgqn0scy1z4qym",
                              "expand": {
                                  "department_id": {
                                      "collectionId": "bthy7mqw35rkvvb",
                                      "collectionName": "departments",
                                      "created": "2023-02-20 12:37:50.627Z",
                                      "id": "w0bc7yv297l1uej",
                                      "name": "Programuotojų",
                                      "updated": "2023-02-20 12:37:50.627Z",
                                      "expand": {}
                                  }
                              },
                              "id": "o8ywt19e6vnm3w1",
                              "updated": "2023-02-20 12:44:23.355Z"
                          },
                          {
                              "collectionId": "ter9l3qqq9aqgj2",
                              "collectionName": "divisions_departments",
                              "created": "2023-02-20 12:44:31.297Z",
                              "department_id": "3e8d0k0jpeg7pvg",
                              "division_id": "dmgqn0scy1z4qym",
                              "expand": {
                                  "department_id": {
                                      "collectionId": "bthy7mqw35rkvvb",
                                      "collectionName": "departments",
                                      "created": "2023-02-20 12:37:29.907Z",
                                      "id": "3e8d0k0jpeg7pvg",
                                      "name": "Konstruktorių",
                                      "updated": "2023-02-20 12:37:42.835Z",
                                      "expand": {}
                                  }
                              },
                              "id": "r1q6lakyj1e9sfn",
                              "updated": "2023-02-20 12:44:31.297Z"
                          },
                          {
                              "collectionId": "ter9l3qqq9aqgj2",
                              "collectionName": "divisions_departments",
                              "created": "2023-02-20 12:44:39.545Z",
                              "department_id": "yyn7p8ka5stjvr6",
                              "division_id": "dmgqn0scy1z4qym",
                              "expand": {
                                  "department_id": {
                                      "collectionId": "bthy7mqw35rkvvb",
                                      "collectionName": "departments",
                                      "created": "2023-02-20 12:36:51.570Z",
                                      "id": "yyn7p8ka5stjvr6",
                                      "name": "Testavimo",
                                      "updated": "2023-02-20 12:37:45.732Z",
                                      "expand": {}
                                  }
                              },
                              "id": "gh5ksyz2bibj889",
                              "updated": "2023-02-20 12:44:39.545Z"
                          }
                      ]})
                  case 'departments_groups':
                      return Promise.resolve({items:[
                          {
                              "collectionId": "tc5kfi49ge03emy",
                              "collectionName": "departments_groups",
                              "created": "2023-02-20 12:40:30.668Z",
                              "department_id": "3e8d0k0jpeg7pvg",
                              "expand": {
                                  "group_id": {
                                      "collectionId": "57faccb7837p3uh",
                                      "collectionName": "groups",
                                      "created": "2023-02-20 12:40:19.780Z",
                                      "id": "g102qzh1azou2sg",
                                      "name": "Elektronikos inžinierių",
                                      "updated": "2023-02-20 12:40:19.780Z",
                                      "expand": {}
                                  }
                              },
                              "group_id": "g102qzh1azou2sg",
                              "id": "ch8m3er90q3b431",
                              "updated": "2023-02-20 12:40:30.668Z"
                          },
                          {
                              "collectionId": "tc5kfi49ge03emy",
                              "collectionName": "departments_groups",
                              "created": "2023-02-20 12:40:39.492Z",
                              "department_id": "3e8d0k0jpeg7pvg",
                              "expand": {
                                  "group_id": {
                                      "collectionId": "57faccb7837p3uh",
                                      "collectionName": "groups",
                                      "created": "2023-02-20 12:40:09.701Z",
                                      "id": "q1bctefaiwik1o1",
                                      "name": "Mechanikos inžinierių",
                                      "updated": "2023-02-20 12:40:09.701Z",
                                      "expand": {}
                                  }
                              },
                              "group_id": "q1bctefaiwik1o1",
                              "id": "vj4cg8pg45eq2gx",
                              "updated": "2023-02-20 12:40:39.492Z"
                          }
                      ]})
                  case 'offices':
                      return Promise.resolve({items:[
                          {
                              "city": "Kaunas",
                              "collectionId": "sgv7cbhlqq9svxa",
                              "collectionName": "offices",
                              "country": "Lithuania",
                              "created": "2023-02-20 09:51:32.012Z",
                              "id": "vm438vfq27bg17e",
                              "name": "K. Baršausko st. 66, Kaunas, Lithuania",
                              "street": "K. Baršausko st.",
                              "street_number": "66",
                              "updated": "2023-07-17 13:55:03.870Z"
                          },
                          {
                              "city": "Vilnius",
                              "collectionId": "sgv7cbhlqq9svxa",
                              "collectionName": "offices",
                              "country": "Lithuania",
                              "created": "2023-02-20 09:57:31.159Z",
                              "id": "sc6mh0r9dny79um",
                              "name": "Saltoniškių st. 2, Vilnius, Lithuania",
                              "street": "Saltoniškių st.",
                              "street_number": "2",
                              "updated": "2023-02-20 12:26:53.095Z"
                          },
                          {
                              "city": "Vilnius",
                              "collectionId": "sgv7cbhlqq9svxa",
                              "collectionName": "offices",
                              "country": "Lithuania",
                              "created": "2023-02-20 09:59:45.806Z",
                              "id": "6nfo4x8qda3rfhi",
                              "name": "Saltoniškių st. 9B-1, Vilnius, Lithuania",
                              "street": "Saltoniškių st.",
                              "street_number": "9B-1",
                              "updated": "2023-02-20 12:26:27.397Z"
                          },
                          {
                              "city": "Kaunas",
                              "collectionId": "sgv7cbhlqq9svxa",
                              "collectionName": "offices",
                              "country": "Lithuania",
                              "created": "2023-02-21 12:10:52.834Z",
                              "id": "vcu1j5pg3hxjonj",
                              "name": "Jonavos st. 150, Kaunas, Lithuania",
                              "street": "Jonavos st.",
                              "street_number": "150",
                              "updated": "2023-02-21 12:18:04.110Z"
                          },
                          {
                              "city": "Test",
                              "collectionId": "sgv7cbhlqq9svxa",
                              "collectionName": "offices",
                              "country": "Test",
                              "created": "2023-02-21 14:29:58.821Z",
                              "id": "0x1lb38vvho36ng",
                              "name": "Test office",
                              "street": "Test st.",
                              "street_number": "9999",
                              "updated": "2023-02-21 14:29:58.821Z"
                          }
                      ]})
                  case 'divisions':
                      return Promise.resolve({items:[
                          {
                              "collectionId": "bakpn5k6ntn68n3",
                              "collectionName": "divisions",
                              "created": "2023-02-20 10:00:29.661Z",
                              "id": "1uio162voxfj2ot",
                              "name": "HRD",
                              "updated": "2023-07-20 04:20:51.210Z"
                          },
                          {
                              "collectionId": "bakpn5k6ntn68n3",
                              "collectionName": "divisions",
                              "created": "2023-02-20 10:00:42.505Z",
                              "id": "dmgqn0scy1z4qym",
                              "name": "RnD",
                              "updated": "2023-02-20 12:03:13.973Z"
                          },
                          {
                              "collectionId": "bakpn5k6ntn68n3",
                              "collectionName": "divisions",
                              "created": "2023-02-20 12:29:49.776Z",
                              "id": "5xwpimcs50j6ygi",
                              "name": "Administracija",
                              "updated": "2023-02-20 12:43:38.491Z"
                          },
                          {
                              "collectionId": "bakpn5k6ntn68n3",
                              "collectionName": "divisions",
                              "created": "2023-02-20 12:31:19.756Z",
                              "id": "53fjrf5alo40nc2",
                              "name": "Marketingas",
                              "updated": "2023-02-20 12:31:19.756Z"
                          },
                          {
                              "collectionId": "bakpn5k6ntn68n3",
                              "collectionName": "divisions",
                              "created": "2023-02-20 12:31:25.363Z",
                              "id": "fpuqxr7ahshmwrh",
                              "name": "Pardavimai",
                              "updated": "2023-02-20 12:31:25.363Z"
                          }
                      ]})
                  case 'departments':
                      return Promise.resolve({items:[
                          {
                              "collectionId": "bthy7mqw35rkvvb",
                              "collectionName": "departments",
                              "created": "2023-02-20 12:02:43.008Z",
                              "id": "h3cchigia2xtmzk",
                              "name": "IoT akademija",
                              "updated": "2023-07-17 13:55:11.312Z"
                          },
                          {
                              "collectionId": "bthy7mqw35rkvvb",
                              "collectionName": "departments",
                              "created": "2023-02-20 12:36:51.570Z",
                              "id": "yyn7p8ka5stjvr6",
                              "name": "Testavimo",
                              "updated": "2023-02-20 12:37:45.732Z"
                          },
                          {
                              "collectionId": "bthy7mqw35rkvvb",
                              "collectionName": "departments",
                              "created": "2023-02-20 12:37:29.907Z",
                              "id": "3e8d0k0jpeg7pvg",
                              "name": "Konstruktorių",
                              "updated": "2023-02-20 12:37:42.835Z"
                          },
                          {
                              "collectionId": "bthy7mqw35rkvvb",
                              "collectionName": "departments",
                              "created": "2023-02-20 12:37:50.627Z",
                              "id": "w0bc7yv297l1uej",
                              "name": "Programuotojų",
                              "updated": "2023-02-20 12:37:50.627Z"
                          },
                          {
                              "collectionId": "bthy7mqw35rkvvb",
                              "collectionName": "departments",
                              "created": "2023-02-20 12:43:20.937Z",
                              "id": "pwg05eofg41afyi",
                              "name": "Biuro ir vadybos",
                              "updated": "2023-02-20 12:43:20.937Z"
                          },
                          {
                              "collectionId": "bthy7mqw35rkvvb",
                              "collectionName": "departments",
                              "created": "2023-02-20 12:43:57.537Z",
                              "id": "8t31iyvwrhqnmiq",
                              "name": "IT adminsitratorių",
                              "updated": "2023-02-20 12:43:57.537Z"
                          },
                          {
                              "collectionId": "bthy7mqw35rkvvb",
                              "collectionName": "departments",
                              "created": "2023-02-23 13:45:43.047Z",
                              "id": "9y1n8rkzaojgqzz",
                              "name": "Not existing",
                              "updated": "2023-02-23 13:45:43.047Z"
                          }
                      ]})
                  case 'groups':
                      return Promise.resolve({items:[
                          {
                              "collectionId": "57faccb7837p3uh",
                              "collectionName": "groups",
                              "created": "2023-02-20 12:38:12.594Z",
                              "id": "oambg9goguergbw",
                              "name": "Įterptinių sistemų programuotojai",
                              "updated": "2023-07-17 13:55:14.823Z"
                          },
                          {
                              "collectionId": "57faccb7837p3uh",
                              "collectionName": "groups",
                              "created": "2023-02-20 12:38:28.212Z",
                              "id": "13qspmhdzfcro2o",
                              "name": "Tinklų",
                              "updated": "2023-02-20 12:38:28.212Z"
                          },
                          {
                              "collectionId": "57faccb7837p3uh",
                              "collectionName": "groups",
                              "created": "2023-02-20 12:40:09.701Z",
                              "id": "q1bctefaiwik1o1",
                              "name": "Mechanikos inžinierių",
                              "updated": "2023-02-20 12:40:09.701Z"
                          },
                          {
                              "collectionId": "57faccb7837p3uh",
                              "collectionName": "groups",
                              "created": "2023-02-20 12:40:19.780Z",
                              "id": "g102qzh1azou2sg",
                              "name": "Elektronikos inžinierių",
                              "updated": "2023-02-20 12:40:19.780Z"
                          },
                          {
                              "collectionId": "57faccb7837p3uh",
                              "collectionName": "groups",
                              "created": "2023-02-20 12:40:49.943Z",
                              "id": "tbw7dgokb1rf999",
                              "name": "Automatinių testų",
                              "updated": "2023-02-20 12:40:49.943Z"
                          },
                          {
                              "collectionId": "57faccb7837p3uh",
                              "collectionName": "groups",
                              "created": "2023-02-20 12:40:54.334Z",
                              "id": "rfeqj6fnktemyor",
                              "name": "Rankinių testų",
                              "updated": "2023-02-20 12:41:16.256Z"
                          },
                          {
                              "collectionId": "57faccb7837p3uh",
                              "collectionName": "groups",
                              "created": "2023-07-24 09:51:39.463Z",
                              "id": "b58njpf4qw5djxn",
                              "name": "Tettttt",
                              "updated": "2023-07-24 09:51:39.463Z"
                          }
                      ]})
              }
          },
          $GetSingleRecord()
          {
              return Promise.resolve({"collectionId":"b2oym7fr4tkhpsr","collectionName":"employees","company_id":"5ask1scw3rf23yq","created":"2023-02-20 12:33:50.440Z","department_id":"h3cchigia2xtmzk","division_id":"1uio162voxfj2ot","email":"gedas.test@teltonika.lt","group_id":"","id":"bfjmhvdguk99hxx","name":"Gedas","office_id":"vm438vfq27bg17e","phone_number":"+370648977894591","photo":"","position":"Iot academy coordinator","surname":"Test","updated":"2023-07-17 12:52:10.367Z","expand":{}})
          },
          $UpdateRecord()
          {
              return Promise.resolve(null)
          }
        },
      });
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick() 
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick() 

    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)
    await wrapper.findAll('button').at(1).trigger('click')
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({message:'Nepavyko atnaujinti kontakto',type:'error'})
  })
  
    


});

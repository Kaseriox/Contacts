import { describe, it, expect,vi } from "vitest";
import createWrapper from "../../../.mockFactory/mockFactory";
import CreateEmployeeForm from "../../../../src/Components/Form/Forms/Employee/CreateEmployeeForm.vue"
import Input from "../../../../src/Components/InputField/InputField.vue"
import Select from "../../../../src/Components/InputField/SelectField.vue"
describe("CreateEmployeeForm.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(CreateEmployeeForm,{
        mocks:{
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
                }
            },
        }
    });
  });

  it('Should Contain All Necessary Fields ', ()=>{
    const InputFields = wrapper.findAllComponents(Input)
    const SelectFields = wrapper.findAllComponents(Select)
    expect(InputFields.exists()).toBeTruthy()
    expect(InputFields).toHaveLength(5)
    expect(SelectFields.exists()).toBeTruthy()
    expect(SelectFields).toHaveLength(1)


  })

  it("Should Validate Form When Trying To Submit It",async ()=>{
    const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(0)
    const SubmitButton = wrapper.findAll('button').at(1)
    await SubmitButton.trigger('click')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
  })

  it("Form Should Make Sure All Required Fields Are Populated Correctly Before Submitting",async ()=>{
    
    const ValidateFormSpy = vi.spyOn(wrapper.vm,'ValidateForm')
    expect(ValidateFormSpy).toHaveBeenCalledTimes(0)

    const SubmitButton = wrapper.findAll('button').at(1)
    await SubmitButton.trigger('click')

    expect(ValidateFormSpy).toHaveBeenCalledTimes(1)
    expect(ValidateFormSpy).toHaveLastReturnedWith(false)

    await wrapper.findAll('input').at(0).setValue('Name')
    await SubmitButton.trigger('click')
    
    expect(ValidateFormSpy).toHaveBeenCalledTimes(2)
    expect(ValidateFormSpy).toHaveLastReturnedWith(false)

    await wrapper.findAll('input').at(1).setValue('Surname')
    await SubmitButton.trigger('click')
    
    expect(ValidateFormSpy).toHaveBeenCalledTimes(3)
    expect(ValidateFormSpy).toHaveLastReturnedWith(false)

    await wrapper.findAll('input').at(2).setValue('Position')
    await SubmitButton.trigger('click')
    
    expect(ValidateFormSpy).toHaveBeenCalledTimes(4)
    expect(ValidateFormSpy).toHaveLastReturnedWith(false)

    await wrapper.findAll('input').at(3).setValue('Test@test.com')
    await SubmitButton.trigger('click')
    
    expect(ValidateFormSpy).toHaveBeenCalledTimes(5)
    expect(ValidateFormSpy).toHaveLastReturnedWith(false)

    await wrapper.findAll('select').at(0).findAll('option').at(1).setSelected()
    await SubmitButton.trigger('click')
    
    expect(ValidateFormSpy).toHaveBeenCalledTimes(6)
    expect(ValidateFormSpy).toHaveLastReturnedWith(false)

    await wrapper.findAll('select').at(1).findAll('option').at(1).setSelected()
    await SubmitButton.trigger('click')
    
    expect(ValidateFormSpy).toHaveBeenCalledTimes(7)
    expect(ValidateFormSpy).toHaveLastReturnedWith(false)

    await wrapper.findAll('select').at(2).findAll('option').at(1).setSelected()
    await SubmitButton.trigger('click')
    
    expect(ValidateFormSpy).toHaveBeenCalledTimes(8)
    expect(ValidateFormSpy).toHaveLastReturnedWith(true)


})


  it('Should Display Message If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')
   
    await wrapper.vm.$nextTick()
    const SubmitButton = wrapper.findAll('button').at(1)

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)

    await wrapper.findAll('input').at(0).setValue('Name')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('input').at(1).setValue('Surname')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('input').at(2).setValue('Position')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('input').at(3).setValue('Test@test.com')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('select').at(0).findAll('option').at(1).setSelected()
    await wrapper.vm.$nextTick()
    await wrapper.findAll('select').at(1).findAll('option').at(1).setSelected()
    await wrapper.vm.$nextTick()
    await wrapper.findAll('select').at(2).findAll('option').at(1).setSelected()
    await wrapper.vm.$nextTick()

    await SubmitButton.trigger('click')
    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({
        message: `Sėkmingai sukurtas kontaktas`,
        type: "success",
      })

  })

  it('Should Close Modal Form If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const CloseSpy = vi.spyOn(wrapper.vm,'Close')

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(CloseSpy).toHaveBeenCalledTimes(0)


    await wrapper.vm.$nextTick()
    const SubmitButton = wrapper.findAll('button').at(1)

    await wrapper.findAll('input').at(0).setValue('Name')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('input').at(1).setValue('Surname')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('input').at(2).setValue('Position')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('input').at(3).setValue('Test@test.com')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('select').at(0).findAll('option').at(1).setSelected()
    await wrapper.vm.$nextTick()
    await wrapper.findAll('select').at(1).findAll('option').at(1).setSelected()
    await wrapper.vm.$nextTick()
    await wrapper.findAll('select').at(2).findAll('option').at(1).setSelected()
    await wrapper.vm.$nextTick()

    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(CloseSpy).toHaveBeenCalledTimes(1)

  })


  it('Should Call Refresh Method If Records Are Succesfully Created',async ()=>{
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const RefreshSpy = vi.spyOn(wrapper.vm,'refresh')



    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(RefreshSpy).toHaveBeenCalledTimes(0)

    await wrapper.vm.$nextTick()
    const SubmitButton = wrapper.findAll('button').at(1)


    await wrapper.findAll('input').at(0).setValue('Name')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('input').at(1).setValue('Surname')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('input').at(2).setValue('Position')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('input').at(3).setValue('Test@test.com')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('select').at(0).findAll('option').at(1).setSelected()
    await wrapper.vm.$nextTick()
    await wrapper.findAll('select').at(1).findAll('option').at(1).setSelected()
    await wrapper.vm.$nextTick()
    await wrapper.findAll('select').at(2).findAll('option').at(1).setSelected()
    await wrapper.vm.$nextTick()

    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(RefreshSpy).toHaveBeenCalledTimes(1)
  })

  it('Should Set Failure Message If Creating Record Failed',async ()=>{
    wrapper = createWrapper(CreateEmployeeForm,{
        mocks:{
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
                }
            },
            $CreateRecord()
            {
                return Promise.resolve(null)
            }
        }
    })
    await wrapper.vm.$nextTick()
    const HandleFormSpy = vi.spyOn(wrapper.vm,'HandleForm')
    const SetMessageSpy = vi.spyOn(wrapper.vm,'set_message')

   

    expect(HandleFormSpy).toHaveBeenCalledTimes(0)
    expect(SetMessageSpy).toHaveBeenCalledTimes(0)

    await wrapper.vm.$nextTick()
    const SubmitButton = wrapper.findAll('button').at(1)


    await wrapper.findAll('input').at(0).setValue('Name')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('input').at(1).setValue('Surname')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('input').at(2).setValue('Position')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('input').at(3).setValue('Test@test.com')
    await wrapper.vm.$nextTick()
    await wrapper.findAll('select').at(0).findAll('option').at(1).setSelected()
    await wrapper.vm.$nextTick()
    await wrapper.findAll('select').at(1).findAll('option').at(1).setSelected()
    await wrapper.vm.$nextTick()
    await wrapper.findAll('select').at(2).findAll('option').at(1).setSelected()
    await wrapper.vm.$nextTick()

    await SubmitButton.trigger('click')

    expect(HandleFormSpy).toHaveBeenCalledTimes(1)
    expect(SetMessageSpy).toHaveBeenCalledWith({
        message: "Nepavyko sukurti kontakto",
        type: "error",
      })
    expect(SetMessageSpy).toHaveBeenCalledTimes(1)
  })

})

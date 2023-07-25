import { describe, it, expect, vi } from "vitest";
import createWrapper from "../../.mockFactory/mockFactory";
import Filtering from "../../../src/Components/Contacts/Filtering/Filtering.vue"
import SelectField from "../../../src/Components/InputField/SelectField.vue"
describe("Filtering.vue", () => {
  vi.useFakeTimers();
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(Filtering,{
      mocks:{
        $GetCollection({Collection,query})
        {
          console.log(Collection,query)
          switch(Collection)
          {
              case 'companies':
                return Promise.resolve({items:[{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:14.612Z","id":"5ask1scw3rf23yq","name":"TELTONIKA NETWORKS","updated":"2023-07-17 13:54:58.277Z","expand":{}},{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:22.744Z","id":"yqxlilctgbchc22","name":"TELTONIKA TELEMATICS","updated":"2023-02-20 11:44:22.744Z","expand":{}},{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-21 11:57:14.240Z","id":"gud0wunpwb8g08e","name":"TELTONIKA ENERGY","updated":"2023-02-21 12:01:52.080Z","expand":{}}]})
              case 'companies_offices':
                switch(query.filter)
                {
                  
                  case "company_id='5ask1scw3rf23yq'":
                    return Promise.resolve({items:[
                      {
                        "collectionId": "69msfhns5ee63rg",
                        "collectionName": "companies_offices",
                        "company_id": "5ask1scw3rf23yq",
                        "created": "2023-02-20 11:49:52.948Z",
                        "expand": {
                          "office_id": {"city":"Vilnius","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:57:31.159Z","id":"sc6mh0r9dny79um","name":"Saltoniškių st. 2, Vilnius, Lithuania","street":"Saltoniškių st.","street_number":"2","updated":"2023-02-20 12:26:53.095Z","expand":{}}
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
                          "office_id": {"city":"Kaunas","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:51:32.012Z","id":"vm438vfq27bg17e","name":"K. Baršausko st. 66, Kaunas, Lithuania","street":"K. Baršausko st.","street_number":"66","updated":"2023-07-17 13:55:03.870Z","expand":{}}
                        },
                        "id": "lq7ibz15ismb62d",
                        "office_id": "vm438vfq27bg17e",
                        "updated": "2023-02-20 11:50:09.060Z"
                      },
                      {
                        "collectionId": "69msfhns5ee63rg",
                        "collectionName": "companies_offices",
                        "company_id": "5ask1scw3rf23yq",
                        "created": "2023-02-21 14:31:13.397Z",
                        "expand": {
                          "office_id": {"city":"Test","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Test","created":"2023-02-21 14:29:58.821Z","id":"0x1lb38vvho36ng","name":"Test office","street":"Test st.","street_number":"9999","updated":"2023-02-21 14:29:58.821Z","expand":{}}
                        },
                        "id": "54cur3aa9zzrg5x",
                        "office_id": "0x1lb38vvho36ng",
                        "updated": "2023-02-21 14:31:13.397Z"
                      }
                    ]})
                  case "company_id='yqxlilctgbchc22'":
                      return Promise.resolve({items:[
                      {
                        "collectionId": "69msfhns5ee63rg",
                        "collectionName": "companies_offices",
                        "company_id": "yqxlilctgbchc22",
                        "created": "2023-02-20 11:50:23.383Z",
                        "expand": {
                          "office_id": {"city":"Vilnius","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:59:45.806Z","id":"6nfo4x8qda3rfhi","name":"Saltoniškių st. 9B-1, Vilnius, Lithuania","street":"Saltoniškių st.","street_number":"9B-1","updated":"2023-02-20 12:26:27.397Z","expand":{}}
                        },
                        "id": "e97m3c9724rkgsf",
                        "office_id": "6nfo4x8qda3rfhi",
                        "updated": "2023-02-20 11:50:23.383Z"
                      }
                    ]})
                }
                break
              case 'offices_divisions':
                switch(query.filter)
                {
                  case "office_id='sc6mh0r9dny79um'":
                    return Promise.resolve({items:[
                      {
                        "collectionId": "zzim4v132ojclwp",
                        "collectionName": "offices_divisions",
                        "created": "2023-02-20 12:35:30.448Z",
                        "division_id": "dmgqn0scy1z4qym",
                        "expand": {
                          "division_id": {"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 10:00:42.505Z","id":"dmgqn0scy1z4qym","name":"RnD","updated":"2023-02-20 12:03:13.973Z","expand":{}}
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
                          "division_id": {"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 12:29:49.776Z","id":"5xwpimcs50j6ygi","name":"Administracija","updated":"2023-02-20 12:43:38.491Z","expand":{}}
                        },
                        "id": "mxme4lx9xyois1i",
                        "office_id": "sc6mh0r9dny79um",
                        "updated": "2023-02-20 12:35:39.000Z"
                      }
                    ]})
                  case "office_id='vm438vfq27bg17e'":
                    return Promise.resolve({items:[
                      {
                        "collectionId": "zzim4v132ojclwp",
                        "collectionName": "offices_divisions",
                        "created": "2023-02-20 10:08:09.267Z",
                        "division_id": "dmgqn0scy1z4qym",
                        "expand": {
                          "division_id": {"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 10:00:42.505Z","id":"dmgqn0scy1z4qym","name":"RnD","updated":"2023-02-20 12:03:13.973Z","expand":{}}
                        },
                        "id": "0usf4kd9oxmsc55",
                        "office_id": "vm438vfq27bg17e",
                        "updated": "2023-02-20 10:08:09.267Z"
                      },
                      {
                        "collectionId": "zzim4v132ojclwp",
                        "collectionName": "offices_divisions",
                        "created": "2023-02-20 12:34:43.950Z",
                        "division_id": "fpuqxr7ahshmwrh",
                        "expand": {
                          "division_id": {"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 12:31:25.363Z","id":"fpuqxr7ahshmwrh","name":"Pardavimai","updated":"2023-02-20 12:31:25.363Z","expand":{}}
                        },
                        "id": "jumxc2gku8pqjr0",
                        "office_id": "vm438vfq27bg17e",
                        "updated": "2023-02-20 12:34:43.950Z"
                      },
                      {
                        "collectionId": "zzim4v132ojclwp",
                        "collectionName": "offices_divisions",
                        "created": "2023-02-20 12:34:55.279Z",
                        "division_id": "53fjrf5alo40nc2",
                        "expand": {
                          "division_id": {"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 12:31:19.756Z","id":"53fjrf5alo40nc2","name":"Marketingas","updated":"2023-02-20 12:31:19.756Z","expand":{}}
                        },
                        "id": "gbvgxctdr0dac9r",
                        "office_id": "vm438vfq27bg17e",
                        "updated": "2023-02-20 12:34:55.279Z"
                      },
                      {
                        "collectionId": "zzim4v132ojclwp",
                        "collectionName": "offices_divisions",
                        "created": "2023-02-20 12:35:06.397Z",
                        "division_id": "5xwpimcs50j6ygi",
                        "expand": {
                          "division_id": {"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 12:29:49.776Z","id":"5xwpimcs50j6ygi","name":"Administracija","updated":"2023-02-20 12:43:38.491Z","expand":{}}
                        },
                        "id": "jbirpaqesfb9f3h",
                        "office_id": "vm438vfq27bg17e",
                        "updated": "2023-02-20 12:35:06.397Z"
                      },
                      {
                        "collectionId": "zzim4v132ojclwp",
                        "collectionName": "offices_divisions",
                        "created": "2023-02-20 12:35:15.024Z",
                        "division_id": "1uio162voxfj2ot",
                        "expand": {
                          "division_id": {"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 10:00:29.661Z","id":"1uio162voxfj2ot","name":"HRD","updated":"2023-07-20 04:20:51.210Z","expand":{}}
                        },
                        "id": "np91m88tuhv0nzv",
                        "office_id": "vm438vfq27bg17e",
                        "updated": "2023-02-20 12:35:15.024Z"
                      }
                    ]})
                }
                break
              case 'divisions_departments':
                switch(query.filter)
                {
                  case "division_id='dmgqn0scy1z4qym'":
                    return  Promise.resolve({items:[
                      {
                        "collectionId": "ter9l3qqq9aqgj2",
                        "collectionName": "divisions_departments",
                        "created": "2023-02-20 12:44:23.355Z",
                        "department_id": "w0bc7yv297l1uej",
                        "division_id": "dmgqn0scy1z4qym",
                        "expand": {
                          "department_id": {"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:37:50.627Z","id":"w0bc7yv297l1uej","name":"Programuotojų","updated":"2023-02-20 12:37:50.627Z","expand":{}}
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
                          "department_id": {"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:37:29.907Z","id":"3e8d0k0jpeg7pvg","name":"Konstruktorių","updated":"2023-02-20 12:37:42.835Z","expand":{}}
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
                          "department_id": {"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:36:51.570Z","id":"yyn7p8ka5stjvr6","name":"Testavimo","updated":"2023-02-20 12:37:45.732Z","expand":{}}
                        },
                        "id": "gh5ksyz2bibj889",
                        "updated": "2023-02-20 12:44:39.545Z"
                      }
                    ]})
                  case "division_id='1uio162voxfj2ot'":
                    return Promise.resolve({items:[
                      {
                        "collectionId": "ter9l3qqq9aqgj2",
                        "collectionName": "divisions_departments",
                        "created": "2023-02-20 12:03:04.408Z",
                        "department_id": "h3cchigia2xtmzk",
                        "division_id": "1uio162voxfj2ot",
                        "expand": {
                          "department_id": {"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:02:43.008Z","id":"h3cchigia2xtmzk","name":"IoT akademija","updated":"2023-07-17 13:55:11.312Z","expand":{}}
                        },
                        "id": "ok4kr4d68q9y02c",
                        "updated": "2023-02-20 12:03:04.408Z"
                      },
                      {
                        "collectionId": "ter9l3qqq9aqgj2",
                        "collectionName": "divisions_departments",
                        "created": "2023-02-23 13:49:20.448Z",
                        "department_id": "9y1n8rkzaojgqzz",
                        "division_id": "1uio162voxfj2ot",
                        "expand": {
                          "department_id": {"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-23 13:45:43.047Z","id":"9y1n8rkzaojgqzz","name":"Not existing","updated":"2023-02-23 13:45:43.047Z","expand":{}}
                        },
                        "id": "e634bvlhzmedz25",
                        "updated": "2023-02-23 13:49:20.448Z"
                      }
                    ]})
                }
                break
              case 'departments_groups':
                switch(query.filter)
                {
                  case "department_id='h3cchigia2xtmzk'":
                    return Promise.resolve({items:[]})
                  case "department_id='9y1n8rkzaojgqzz'":
                    return Promise.resolve({items:[
                      {
                        "collectionId": "tc5kfi49ge03emy",
                        "collectionName": "departments_groups",
                        "created": "2023-07-24 09:51:39.557Z",
                        "department_id": "9y1n8rkzaojgqzz",
                        "expand": {
                          "group_id": {"collectionId":"57faccb7837p3uh","collectionName":"groups","created":"2023-07-24 09:51:39.463Z","id":"b58njpf4qw5djxn","name":"Tettttt","updated":"2023-07-24 09:51:39.463Z","expand":{}}
                        },
                        "group_id": "b58njpf4qw5djxn",
                        "id": "j8hn7nob4tiqmy3",
                        "updated": "2023-07-24 09:51:39.557Z"
                      }
                    ]})
                }

          }
        }
      }
    });
  });


  it('Should Show 5 Select Fields',()=>{
    const SelectFields = wrapper.findAllComponents(SelectField)
    expect(SelectFields.length).toBe(5)
  })
  it("Filters Should Work Correctly ",async ()=>{
    expect(wrapper.vm.$data.options.companies).toStrictEqual([{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:14.612Z","id":"5ask1scw3rf23yq","name":"TELTONIKA NETWORKS","updated":"2023-07-17 13:54:58.277Z","expand":{}},{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-20 11:44:22.744Z","id":"yqxlilctgbchc22","name":"TELTONIKA TELEMATICS","updated":"2023-02-20 11:44:22.744Z","expand":{}},{"collectionId":"6pm3nos89zp7y7o","collectionName":"companies","created":"2023-02-21 11:57:14.240Z","id":"gud0wunpwb8g08e","name":"TELTONIKA ENERGY","updated":"2023-02-21 12:01:52.080Z","expand":{}}])
    const CompaniesOptions = await wrapper.findAll('select').at(0).findAll('option')
    await CompaniesOptions.at(1).setSelected()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.selection.company_id).toBe('5ask1scw3rf23yq')
    expect(wrapper.vm.$data.options.offices).toStrictEqual([{"city":"Vilnius","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:57:31.159Z","id":"sc6mh0r9dny79um","name":"Saltoniškių st. 2, Vilnius, Lithuania","street":"Saltoniškių st.","street_number":"2","updated":"2023-02-20 12:26:53.095Z","expand":{}},{"city":"Kaunas","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:51:32.012Z","id":"vm438vfq27bg17e","name":"K. Baršausko st. 66, Kaunas, Lithuania","street":"K. Baršausko st.","street_number":"66","updated":"2023-07-17 13:55:03.870Z","expand":{}},{"city":"Test","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Test","created":"2023-02-21 14:29:58.821Z","id":"0x1lb38vvho36ng","name":"Test office","street":"Test st.","street_number":"9999","updated":"2023-02-21 14:29:58.821Z","expand":{}}])

    await CompaniesOptions.at(2).setSelected()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.selection.company_id).toBe('yqxlilctgbchc22')
    expect(wrapper.vm.$data.options.offices).toStrictEqual([{"city":"Vilnius","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:59:45.806Z","id":"6nfo4x8qda3rfhi","name":"Saltoniškių st. 9B-1, Vilnius, Lithuania","street":"Saltoniškių st.","street_number":"9B-1","updated":"2023-02-20 12:26:27.397Z","expand":{}}])
  
    await CompaniesOptions.at(1).setSelected()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.selection.company_id).toBe('5ask1scw3rf23yq')
    expect(wrapper.vm.$data.options.offices).toStrictEqual([{"city":"Vilnius","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:57:31.159Z","id":"sc6mh0r9dny79um","name":"Saltoniškių st. 2, Vilnius, Lithuania","street":"Saltoniškių st.","street_number":"2","updated":"2023-02-20 12:26:53.095Z","expand":{}},{"city":"Kaunas","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Lithuania","created":"2023-02-20 09:51:32.012Z","id":"vm438vfq27bg17e","name":"K. Baršausko st. 66, Kaunas, Lithuania","street":"K. Baršausko st.","street_number":"66","updated":"2023-07-17 13:55:03.870Z","expand":{}},{"city":"Test","collectionId":"sgv7cbhlqq9svxa","collectionName":"offices","country":"Test","created":"2023-02-21 14:29:58.821Z","id":"0x1lb38vvho36ng","name":"Test office","street":"Test st.","street_number":"9999","updated":"2023-02-21 14:29:58.821Z","expand":{}}])
  

    const OfficesOptions = await wrapper.findAll('select').at(1).findAll('option')
    await OfficesOptions.at(1).setSelected()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.selection.office_id).toBe("sc6mh0r9dny79um")
    expect(wrapper.vm.$data.options.divisions).toStrictEqual([{"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 10:00:42.505Z","id":"dmgqn0scy1z4qym","name":"RnD","updated":"2023-02-20 12:03:13.973Z","expand":{}},{"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 12:29:49.776Z","id":"5xwpimcs50j6ygi","name":"Administracija","updated":"2023-02-20 12:43:38.491Z","expand":{}}])
  
    await OfficesOptions.at(2).setSelected()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.selection.office_id).toBe("vm438vfq27bg17e")
    expect(wrapper.vm.$data.options.divisions).toStrictEqual([{"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 10:00:42.505Z","id":"dmgqn0scy1z4qym","name":"RnD","updated":"2023-02-20 12:03:13.973Z","expand":{}},{"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 12:31:25.363Z","id":"fpuqxr7ahshmwrh","name":"Pardavimai","updated":"2023-02-20 12:31:25.363Z","expand":{}},{"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 12:31:19.756Z","id":"53fjrf5alo40nc2","name":"Marketingas","updated":"2023-02-20 12:31:19.756Z","expand":{}},{"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 12:29:49.776Z","id":"5xwpimcs50j6ygi","name":"Administracija","updated":"2023-02-20 12:43:38.491Z","expand":{}},{"collectionId":"bakpn5k6ntn68n3","collectionName":"divisions","created":"2023-02-20 10:00:29.661Z","id":"1uio162voxfj2ot","name":"HRD","updated":"2023-07-20 04:20:51.210Z","expand":{}}])
  

    const DivisionOptions = await wrapper.findAll('select').at(2).findAll('option')
    await DivisionOptions.at(1).setSelected()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.selection.division_id).toBe("dmgqn0scy1z4qym")
    expect(wrapper.vm.$data.options.departments).toStrictEqual([{"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:37:50.627Z","id":"w0bc7yv297l1uej","name":"Programuotojų","updated":"2023-02-20 12:37:50.627Z","expand":{}},{"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:37:29.907Z","id":"3e8d0k0jpeg7pvg","name":"Konstruktorių","updated":"2023-02-20 12:37:42.835Z","expand":{}},{"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:36:51.570Z","id":"yyn7p8ka5stjvr6","name":"Testavimo","updated":"2023-02-20 12:37:45.732Z","expand":{}}])

    await DivisionOptions.at(5).setSelected()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.selection.division_id).toBe("1uio162voxfj2ot")
    expect(wrapper.vm.$data.options.departments).toStrictEqual([{"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-20 12:02:43.008Z","id":"h3cchigia2xtmzk","name":"IoT akademija","updated":"2023-07-17 13:55:11.312Z","expand":{}},{"collectionId":"bthy7mqw35rkvvb","collectionName":"departments","created":"2023-02-23 13:45:43.047Z","id":"9y1n8rkzaojgqzz","name":"Not existing","updated":"2023-02-23 13:45:43.047Z","expand":{}}])


    const DepartmentOptions = await wrapper.findAll('select').at(3).findAll('option')
    await DepartmentOptions.at(1).setSelected()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.selection.department_id).toBe("h3cchigia2xtmzk")
    expect(wrapper.vm.$data.options.groups).toStrictEqual([])

    await DepartmentOptions.at(2).setSelected()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.selection.department_id).toBe("9y1n8rkzaojgqzz")
    expect(wrapper.vm.$data.options.groups).toStrictEqual([{"collectionId":"57faccb7837p3uh","collectionName":"groups","created":"2023-07-24 09:51:39.463Z","id":"b58njpf4qw5djxn","name":"Tettttt","updated":"2023-07-24 09:51:39.463Z","expand":{}}])


  })

  it("On Company Choice 'set_filter' and ReturnRecord Methods Should Be Called",async ()=>{
    const CompanyFilter = vi.spyOn(wrapper.vm,'set_filter')
    const ReturnRecord = vi.spyOn(wrapper.vm,'ReturnRecord')
    expect(CompanyFilter).toHaveBeenCalledTimes(0)
    expect(ReturnRecord).toHaveBeenCalledTimes(0)

    const CompaniesOptions = await wrapper.findAll('select').at(0).findAll('option')
    await CompaniesOptions.at(1).setSelected()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    expect(ReturnRecord).toHaveBeenCalledTimes(1)
    expect(CompanyFilter).toHaveBeenCalledTimes(1)
    expect(CompanyFilter).toHaveBeenCalledWith(["company_id='5ask1scw3rf23yq'",""])

    await CompaniesOptions.at(0).setSelected()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
    
    expect(ReturnRecord).toHaveBeenCalledTimes(1)
    expect(CompanyFilter).toHaveBeenCalledTimes(2)
    expect(CompanyFilter).toHaveBeenCalledWith(["","company_id='5ask1scw3rf23yq'"])
  })

 
});
































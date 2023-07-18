<template>
  <div>
    <p class=" font-thin text-6xl mb-6">Kontaktų Sistema</p>

    <div class="flex flex-row items-center mb-2">
        <Search class="w-1/4"/>
        <ViewChange v-on:ChangeView="ChangeView"/>
        <FormButton v-if="user_data?.expand.permissions_id?.edit_employees" :type="'create'" :collection="'employees'"/>
    </div>

    <ItemsFound :count="ItemCount" :name="'kontaktai'"/>
    <ContactsPerPage/>
    <Filtering :Expand="Contacts" class="mb-4"/>

    <div class="mb-2" v-if="Contacts">
         <component :is="ViewComponent" :data="SetData()" :fields="SetFields()" :permissions="SetPermissions()" />
    </div>

    <Paging v-if="ItemsPerPage!=='All'" class=" h-12"/>

  </div>

  </template>
  
  <script>
  import ItemsFound from './Paging/ItemsFound.vue';
  import ContactsPerPage from './ContactDisplay/ContactsPerPage.vue';
  import Table from '../Reusables/Table.vue';
  import ContactCards from './ContactDisplay/Cards/ContactCards.vue';
  import Search from './Search/Search.vue';
  import ViewChange from './ContactDisplay/ViewChange.vue';
  import Filtering from './Filtering/Filtering.vue'
  import Paging from './Paging/Paging.vue';
  import FormButton from '../Form/FormButton.vue';
  import {mapGetters,mapActions} from 'vuex'
  export default {
    components: { Search, ViewChange, Filtering, Paging, ContactCards, Table, ContactsPerPage,ItemsFound, FormButton },
    data()
    {
      return{
        Contacts:undefined,
        ViewComponent:ContactCards,
      }
    },
    methods:{
      ...mapActions({
        set_item_count:'Paging/set_item_count',
      }),
      async GetData()
      {
        this.Contacts = await this.$GetCollection(
          {
            Collection:"employees",
            Page:this.Page,
            ItemsPerPage:this.ItemsPerPage,
            query:{
              expand:"office_id,company_id,department_id,division_id,group_id",
              filter:this.FilterString,
            }
          })
          this.set_item_count(this.Contacts?.totalItems)
          this.Contacts = this.Contacts?.items
      },
      ChangeView()
      {
       
        if(this.ViewComponent === ContactCards)
        {
          this.ViewComponent = Table
          return
        }
        this.ViewComponent = ContactCards 
      },
      SetData()
      {
        let arr =[]
        for(const contact of this.Contacts)
        {
            const obj = {
              collectionId:contact.collectionId,
              collection:'employees',
              id:contact.id,
              "Vardas ir pavardė":`${contact.name} ${contact.surname}`,
              "Pozicija":contact.position,
              "Telefono numeris":contact.phone_number,
              "Elektroninis paštas":contact.email,
              "Adresas":contact.expand.office_id.name,
              photo:contact.photo
            }
            arr.push(obj)
        }
        return arr
      },
      SetFields()
      {
        return ["Vardas ir pavardė","Pozicija","Telefono numeris","Elektroninis paštas","Adresas"]
      },
      SetPermissions()
      {
        let obj = {
            edit:this.user_data?.expand.permissions_id?.edit_employees,
            delete:this.user_data?.expand.permissions_id?.delete_employees
        }
        return obj
      },
    },
    computed:{
      ...mapGetters({
        Page:'Paging/Page',
        ItemsPerPage:'Paging/ItemsPerPage',
        FilterString:'Paging/FilterString',
        ItemCount:'Paging/ItemCount',
        user_data:'User/Data',
        refreshID:"Refresh/refresh"
        })
    },
    watch:{
      Page()
      {
        this.GetData()
      },
      ItemsPerPage()
      {
        this.GetData()
      },
      FilterString()
      {
        this.GetData()
      },
      refreshID()
      {
        this.GetData()
      }
    },

    created()
    {
      this.GetData()
    }
  };
  </script>
  
  <style>
  
  </style>
  
<template>
  <div class="h-full w-full p-10">
    <div class="flex justify-end">
      <button
        @click="Close()"
        class="bg-blue-700 text-white right-14 top-0 rounded-full p-4 flex"
      >
        <iconify-icon
          icon="material-symbols:close"
          style="color: white"
          width="32"
        ></iconify-icon>
      </button>
    </div>

    <template v-if="Ready">
      <div class="grid grid-cols-2 gap-x-32 m-12 mx-24 text-base">
        <div class="p-6">
          <div class="space-y-6">
            <Input
              class="mt-6"
              ref="NameInput"
              v-model="Data.username"
              :label="'Vardas:'"
              :placeholder="'Įveskite vardą...'"
            />
            <Input
              ref="EmailInput"
              v-model="Data.email"
              :label="'Elektroninis paštas:'"
              :placeholder="'Įveskite el. paštą...'"
              :icon="{ type: 'material-symbols:mail', size: 24 }"
            />
            <div v-if="Data.password">Password is : {{ Data.password }}</div>
            <UploadPhoto v-model="Data.avatar" />
          </div>
        </div>

        <div class="p-6">
          <div class="mb-6 text-center text-2xl">Administracinės teisės:</div>
          <div class="space-y-4">
            <vue-tags-input
              v-model="tag"
              :tags="tags"
              :autocomplete-items="filteredItems"
              :add-only-from-autocomplete="true"
              @tags-changed="(newTags) => (tags = newTags)"
            />
          </div>
        </div>
      </div>
      <div class="mt-20 mx-6">
        <div class="flex justify-end">
          <button
            @click="HandleForm()"
            class="p-3 px-28 rounded-md text-center text-white text-xl bg-blue-700"
          >
            Sukurti
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import VueTagsInput from "@johmun/vue-tags-input";
import Input from "../../../InputField/InputField.vue";
import UploadPhoto from "../../../InputField/UploadField.vue";
import { mapActions } from "vuex";
export default {
  components: { Input,UploadPhoto, VueTagsInput },
  data() {
    return {
      tag: "",
      tags: [],
      autocomplete: [
        {
          text: "edit_employees",
        },
        {
          text: "delete_employees",
        },
        {
          text: "edit_offices",
        },
        {
          text: "delete_offices",
        },
        {
          text: "edit_structure",
        },
        {
          text: "delete_structure",
        },
        {
          text: "edit_permissions",
        },
        {
          text: "delete_permissions",
        },
        {
          text: "delete_companies",
        },
        {
            text:"edit_companies"
        },
        {
            text:"read_permissions"
        }
      ],
      Ready: true,
      Data: {
        username: "",
        email: "",
        avatar: "",
        password: "",
        passwordConfirm: "",
        emailVisibility: true,
      },
      permissions: {
        edit_employees: false,
        delete_employees: false,
        edit_offices: false,
        delete_offices: false,
        edit_structure: false,
        delete_structure: false,
        edit_permissions: false,
        delete_permissions: false,
        edit_companies: false,
        delete_companies: false,
        read_permissions:false
      },
    };
  },
  methods: {
    ...mapActions({
      Close: "Modal/close",
      set_message: "Notification/set_data",
      refresh: "Refresh/refresh",
    }),
    async HandleForm() {
   
      this.ResetErrors();
      if (!this.ValidateForm()) {
        return;
      }
    for(const object in this.tags)
    {
    this.permissions[this.tags[object].text] = true
    }
      let response = await this.$CreateRecord({
        Collection: "user_permissions",
        data: this.permissions,
      });
      if (response !== null) {
        response = response.id;
        this.Data.passwordConfirm = this.Data.password;
        response = await this.$CreateRecord({
          Collection: "users",
          data: { ...this.Data, permissions_id: response },
        });
      }

      if (response !== null) {
        this.set_message({
          message: `Paskyra sėkmingai sukurta`,
          type: "success",
        });
        this.refresh();
        this.Close();
      } else {
        this.set_message({
          message: "Nepavyko sukurti paskyros",
          type: "error",
        });
      }
    },
    ValidateForm() {
      let valid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (/\s/g.test(this.$refs.NameInput.value)) {
        this.$refs.NameInput.error = "Vardas negali turėti tarpų";
        valid = false;
      } else if (!(this.$refs.NameInput.value.length > 0)) {
        this.$refs.NameInput.error = "Vardas yra reikalingas";
        valid = false;
      }
      if (!(this.$refs.EmailInput.value.length > 0)) {
        this.$refs.EmailInput.error = "Elektroninio pašto laukas yra būtinas";
        valid = false;
      } else if (!emailRegex.test(this.$refs.EmailInput.value)) {
        this.$refs.EmailInput.error = "Neteisingas elektroninis paštas";
        valid = false;
      }

      return valid;
    },
    ResetErrors() {
      for (let ref in this.$refs) {
        this.$refs[ref].error = false;
      }
    },
    
  },
  computed: {
    filteredItems() {
      return this.autocomplete.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
  },
  created() {
    this.Data.password = Math.random().toString(36).slice(-8);
  },
};
</script>

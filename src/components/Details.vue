<template>
  <div v-if="details">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="mb-10 py-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Your Details
      </h3>
      <div class="mt-3 sm:mt-0 sm:ml-4">
        <button 
          type="button" 
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-button hover:bg-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button"
          v-if="!editMode"
          @click="toggleEdit"
        >
          Edit
        </button>
        <button 
          type="button" 
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-button hover:bg-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button"
          v-if="editMode"
          @click="save"
        >
          Save
        </button>
      </div>
    </div>
    <div class="bg-white shadow-md overflow-hidden sm:rounded-lg">
      <!-- <div class="flex sm:justify-between px-4 py-5 sm:px-6">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Your Details
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Personal information and application.
          </p>
        </div>
        <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          Edit
        </button>
      </div> -->
      <div class="border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              First Name
            </dt>
            <dd v-if="!editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ firstName }}
            </dd>
            <dd v-if="editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input v-if="editMode" style="width:100%" class="text-left py-4 border" type="text" name="firstName" id="firstName" v-model="firstName">
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Last Name
            </dt>
            <dd v-if="!editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ lastName }}
            </dd>
            <dd v-if="editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input v-if="editMode" style="width:100%" class="text-left py-4 border" type="text" name="lastName" id="lastName" v-model="lastName">
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Phone Number
            </dt>
            <dd v-if="!editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ phoneNo }}
            </dd>
            <dd v-if="editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input v-if="editMode" style="width:100%" class="text-left py-4 border" type="tel" name="phoneNo" id="phoneNo" v-model="phoneNo">
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Address Line 1
            </dt>
            <dd v-if="!editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ address.address_line_1 }}
            </dd>
            <dd v-if="editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input v-if="editMode" style="width:100%" class="text-left py-4 border" type="text" name="address_line_1" id="address_line_1" v-model="address.address_line_1">
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Address Line 2
            </dt>
            <dd v-if="!editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ address.address_line_2 }}
            </dd>
            <dd v-if="editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input v-if="editMode" style="width:100%" class="text-left py-4 border" type="text" name="address_line_2" id="address_line_2" v-model="address.address_line_2">
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Building Name
            </dt>
            <dd v-if="!editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ address.building_name }}
            </dd>
            <dd v-if="editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input v-if="editMode" style="width:100%" class="text-left py-4 border" type="text" name="building_name" id="building_name" v-model="address.building_name">
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              House Number
            </dt>
            <dd v-if="!editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ address.house_number }}
            </dd>
            <dd v-if="editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input v-if="editMode" style="width:100%" class="text-left py-4 border" type="text" name="house_number" id="house_number" v-model="address.house_number">
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Locality
            </dt>
            <dd v-if="!editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ address.locality }}
            </dd>
            <dd v-if="editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <select
                  id="locality"
                  name="locality"
                  v-model="address.locality"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option disabled value="">Please select one</option>
                  <option>BTM</option>
                  <option>JP Nagar</option>
                  <option>Koramangala</option>
              </select>
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Zip Code
            </dt>
            <dd v-if="!editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ address.zipcode }}
            </dd>
            <dd v-if="editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input v-if="editMode" style="width:100%" class="text-left py-4 border" type="text" name="zipcode" id="zipcode" v-model="address.zipcode">
            </dd>
          </div>


          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Role
            </dt>
            <dd v-if="!editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ role }}
            </dd>
            <dd v-if="editMode" class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <select
                  id="role"
                  name="role"
                  v-model="role"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option disabled value="">Please select one</option>
                  <option>Volunteer Cook</option>
                  <option>Recipient</option>
              </select>
            </dd>
          </div>

        </dl>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      editMode: false,
      firstName: '',
      lastName: '',
      phoneNo: '',
      role: '',
      address: {
        address_line_1: '',
        address_line_2: '',
        city: 'Bangalore',
        state: 'Karnataka',
        building_name: '',
        house_number: '',
        zipcode: '',
        locality: ''
      }
    }
  },
  props: ['fName', 'lName', 'details', 'userType', 'userId'],
  watch: {
    fName() {
      this.firstName = this.fName;
    },
    lName() {
      this.lastName = this.lName;
    },
    details() {
      this.address.address_line_1 = this.details.first_line;
      this.address.address_line_2 = this.details.second_line;
      this.address.building_name = this.details.building_name;
      this.address.house_number = this.details.house_number;
      this.address.zipcode = this.details.zipcode;
      this.address.locality = this.details.locality;
    },
    userType() {
      this.role = this.userType
    }
  },
  methods: {
    toggleEdit() {
      this.editMode = !this.editMode;
    },
    async save() {
      this.toggleEdit();
      try {
        const body = {
          first_name: this.firstName,
          last_name: this.lastName,
          phone_number: this.phoneNo,
          address: {
            locality: this.address.locality,
            first_line: this.address.address_line_1,
            second_line: this.address.address_line_2,
            building_name: this.address.building_name,
            house_number: this.address.house_number,
            zipcode: this.address.zipcode,
            state: this.address.state,
            city: this.address.city
          }
        }
        const { data } = await this.$store.dispatch(
          'user/UPDATE_USER_INFO',{
            id: this.userId,
            body
          });
        console.log(data)
      } catch(e) {
        console.log('Failed to update user details')
      }
    }
  }
}
</script>
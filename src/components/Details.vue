<template>
  <div v-if="details">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <SectionHeading
      v-if="!editMode"
      headingTxt="Your Details"
      buttonTxt="Edit"
      :buttonClick="toggleEdit"
    ></SectionHeading>
    <SectionHeading
      v-if="editMode"
      headingTxt="Your Details"
      buttonTxt="Save"
      :buttonClick="save"
    ></SectionHeading>
    <div class="bg-white shadow-md overflow-hidden sm:rounded-lg">
      <div class="border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              First Name
            </dt>
            <dd
              v-if="!editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ firstName }}
            </dd>
            <dd
              v-if="editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              <input
                v-if="editMode"
                style="width:100%"
                class="text-left py-4 border"
                type="text"
                name="firstName"
                id="firstName"
                :maxlength="50"
                v-model="firstName"
              />
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Last Name
            </dt>
            <dd
              v-if="!editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ lastName }}
            </dd>
            <dd
              v-if="editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              <input
                v-if="editMode"
                style="width:100%"
                class="text-left py-4 border"
                type="text"
                name="lastName"
                id="lastName"
                :maxlength="50"
                v-model="lastName"
              />
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Phone Number
            </dt>
            <dd
              v-if="!editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ phoneNumber }}
            </dd>
            <dd
              v-if="editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              <input
                v-if="editMode"
                style="width:100%"
                class="text-left py-4 border"
                type="tel"
                name="phoneNo"
                id="phoneNo"
                :maxlength="10"
                @keypress="isNumber($event)"
                v-model="phoneNumber"
              />
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Address Line 1
            </dt>
            <dd
              v-if="!editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ address.address_line_1 }}
            </dd>
            <dd
              v-if="editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              <input
                v-if="editMode"
                style="width:100%"
                class="text-left py-4 border"
                type="text"
                name="address_line_1"
                id="address_line_1"
                :maxlength="255"
                v-model="address.address_line_1"
              />
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Address Line 2
            </dt>
            <dd
              v-if="!editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ address.address_line_2 }}
            </dd>
            <dd
              v-if="editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              <input
                v-if="editMode"
                style="width:100%"
                class="text-left py-4 border"
                type="text"
                name="address_line_2"
                id="address_line_2"
                :maxlength="255"
                v-model="address.address_line_2"
              />
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Building Name
            </dt>
            <dd
              v-if="!editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ address.building_name }}
            </dd>
            <dd
              v-if="editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              <input
                v-if="editMode"
                style="width:100%"
                class="text-left py-4 border"
                type="text"
                name="building_name"
                id="building_name"
                :maxlength="50"
                v-model="address.building_name"
              />
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              House Number
            </dt>
            <dd
              v-if="!editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ address.house_number }}
            </dd>
            <dd
              v-if="editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              <input
                v-if="editMode"
                style="width:100%"
                class="text-left py-4 border"
                type="text"
                name="house_number"
                id="house_number"
                :maxlength="10"
                v-model="address.house_number"
              />
            </dd>
          </div>

          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Locality
            </dt>
            <dd
              v-if="!editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ address.locality }}
            </dd>
            <dd
              v-if="editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
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
            <dd
              v-if="!editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ address.zipcode }}
            </dd>
            <dd
              v-if="editMode"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              <input
                v-if="editMode"
                style="width:100%"
                class="text-left py-4 border"
                type="text"
                name="zipcode"
                id="zipcode"
                @keypress="isNumber($event)"
                :maxlength="6"
                v-model="address.zipcode"
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <SuccessErrorModal
      v-show="showModal"
      @CloseModal="closeModal()"
      v-bind:error="error"
      :title="title"
      :message="message"
    />
  </div>
</template>
<script>
  import SuccessErrorModal from '@/components/SuccessErrorModal.vue';
  import SectionHeading from '@/components/SectionHeading.vue';

  export default {
    data() {
      return {
        editMode: false,
        error: false,
        showModal: false,
        title: '',
        message: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: {
          address_line_1: '',
          address_line_2: '',
          city: 'Bangalore',
          state: 'Karnataka',
          building_name: '',
          house_number: '',
          zipcode: '',
          locality: '',
        },
      };
    },
    props: ['fName', 'lName', 'details', 'userId', 'phoneNo'],
    watch: {
      fName() {
        this.firstName = this.fName;
      },
      lName() {
        this.lastName = this.lName;
      },
      phoneNo() {
        this.phoneNumber = this.phoneNo;
      },
      details() {
        this.address.address_line_1 = this.details.first_line;
        this.address.address_line_2 = this.details.second_line;
        this.address.building_name = this.details.building_name;
        this.address.house_number = this.details.house_number;
        this.address.zipcode = this.details.zipcode;
        this.address.locality = this.details.locality;
      },
    },
    methods: {
      toggleEdit() {
        this.editMode = !this.editMode;
      },
      async save() {
        this.toggleEdit();
        if (!this.firstName) {
          this.showErrorModal('First name cannot be blank.');
          return;
        }
        if (!this.lastName) {
          this.showErrorModal('Last name cannot be blank.');
          return;
        }
        if (!this.phoneNo) {
          this.showErrorModal('Phone number cannot be blank.');
          return;
        }
        if (!this.address.address_line_1) {
          this.showErrorModal('Address Line 1 cannot be blank.');
          return;
        }
        if (!this.address.zipcode) {
          this.showErrorModal('Zipcode cannot be blank.');
          return;
        }
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
              city: this.address.city,
            },
          };
          const res = await this.$store.dispatch('user/UPDATE_USER_INFO', {
            id: this.userId,
            body,
          });
          if (res.status === 200) {
            this.showModal = true;
            this.title = 'Successfully updated user';
            this.toggleEdit();
          } else {
            this.title = 'Error';
            this.error = true;
            this.message = res.data?.message;
          }
        } catch (e) {
          console.log('Failed to update user details');
        }
      },
      isNumber(event) {
        if (!/\d/.test(event.key)) return event.preventDefault();
      },
      closeModal() {
        this.error = false;
        this.showModal = false;
        this.title = '';
        this.message = '';
        this.toggleEdit();
      },
      showErrorModal(message) {
        this.showModal = true;
        this.title = 'Error';
        this.error = true;
        this.message = message;
      },
    },
    components: {
      SuccessErrorModal,
      SectionHeading,
    },
  };
</script>

<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
      <div
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
      >
        <div>
          <div class="mt-3 text-left sm:mt-5">
            <h3
              class="text-xl text-center leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Sign-up
            </h3>
            <div class="mt-2">
              <Field label="Full Name" type="text" :value="fullname"></Field>
              <Field
                label="Phone Number"
                type="tel"
                :value="phoneNumber"
              ></Field>
              <Field label="Username" type="text"></Field>
              <Field label="Password" type="password"></Field>
              <Field label="Address Line 1" type="text"></Field>
              <Field label="Address Line 2" type="text"></Field>
              <div class="relative mb-4">
                <label for="location" class="leading-7 text-sm text-primary"
                  >Select Locality</label
                >
                <select
                  id="location"
                  name="location"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option>BTM</option>
                  <option selected>JP Nagar</option>
                  <option>Koramangala</option>
                </select>
              </div>
              <div class="relative mb-4">
                <label for="usertype" class="leading-7 text-sm text-primary"
                  >Sign Up As</label
                >
                <select
                  id="usertype"
                  name="location"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option>Volunteer Cook</option>
                  <option selected>Recipient</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="flex mt-10 sm:mt-10 justify-between">
          <button
            type="button"
            class="inline-flex justify-center w-2/5 rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            @click="closeModal()"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex justify-center w-2/5 rounded-md border border-transparent shadow-sm px-4 py-2 bg-button text-base font-medium text-white hover:bg-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            @click="signUp"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Field from "@/components/Field.vue";
import axios from "axios";

export default {
  props: ["fullname", "phoneNumber"],
  components: {
    Field
  },
  methods: {
    closeModal() {
      this.$emit("CloseModal", true);
    },
    async signUp() {
      try {
        const response = await axios.post("http://localhost:3000/user", {
          first_name: "Tarun",
          last_name: "Pai",
          username: "tpai4",
          approved: false,
          password: "password",
          phone_number: "9876543210",
          user_type: "Cook",
          address: {
            first_line: "101, AB Residency",
            second_line: "12th Cross, 13th A Main",
            locality: "Jayanagar",
            zipcode: '560076',
            state: 'Karnataka',
            city: 'Bengaluru'
          }
        });
        this.$router.push('/cook');
        console.log({ response })
      } catch (error) {
        console.log({ error })
      }
    }
  }
};
</script>
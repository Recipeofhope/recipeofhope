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
              <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors" :key="error" class="text-red-500">* {{ error }}</li>
                </ul>
              </p>
            </div>
            
            <div class="mt-2">
              <!-- <Field label="Full Name" type="text" :value="firstName"></Field> -->
               <div class="relative mb-4">
                <label class="leading-7 text-sm text-primary"> First Name </label>
                <input id="firstName" type="text" v-model="firstName" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>

              <div class="relative mb-4">
                <label class="leading-7 text-sm text-primary"> Last Name </label>
                <input id="lastName" type="text" v-model="lastName" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            
              <!-- <Field
                label="Phone Number"
                type="tel"
                :value="phoneNumber"
              ></Field> -->
               <div class="relative mb-4">
                <label class="leading-7 text-sm text-primary"> Phone Number </label>
                <input id="phoneNumber" type="tel" v-model="phoneNumber" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            
              <!-- <Field label="Username" type="text"></Field> -->
              <div class="relative mb-4">
                <label class="leading-7 text-sm text-primary"> Username </label>
                <input id="username" type="email" v-model="username" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            
              <!-- <Field label="Password" type="password" v-model="password"></Field> -->
              <div class="relative mb-4">
                <label class="leading-7 text-sm text-primary"> Password </label>
                <input id="password" type="password" v-model="password" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            
              <!-- <Field label="Address Line 1" type="text"></Field> -->
              <!-- <Field label="Address Line 2" type="text"></Field> -->
               <div class="relative mb-4">
                <label class="leading-7 text-sm text-primary"> Address 1 </label>
                <input id="address1" type="text" v-model="address1" placeholder="line 1" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                <input id="address2" type="text" v-model="address2" placeholder="line 2" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                <input id="zipcode" type="number" v-model="zipcode" placeholder="zipcode" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                <select id="state" name="state" v-model="state">
                  <option v-for="s in stateList" v-bind:value="s.code" :key="s.code">
                    {{ s.name }}
                  </option>
                </select>
                <input id="city" type="text" v-model="city" placeholder="city" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            
               <div class="relative mb-4">
                <label for="location" class="leading-7 text-sm text-primary"
                  >Select Locality</label
                >
                <select
                  id="location"
                  name="location"
                  v-model="location"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option v-for="loc in locationArray" v-bind:value="loc" :key="loc">
                    {{ loc }}
                  </option>
                </select>
              </div>
              
              <div class="relative mb-4">
                <label for="usertype" class="leading-7 text-sm text-primary"
                  >Sign Up As</label
                >
                <select
                  id="usertype"
                  name="usertype"
                  v-model="userType"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                 <option v-for="type in userTypeArray" v-bind:value="type" :key="type">
                    {{ type }}
                  </option>
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
// import Field from "@/components/Field.vue";
import axios from "axios";

export default {
  props: ["name", "phone"],
  // components: {
  //   Field
  // },
  data() {
    return {
      errors: [],
      firstName: null,
      lastName: null,
      phoneNumber: null,
      password: null,
      username: null,
      address1: null,
      address2: null,
      location: null,
      userType: null,
      zipcode: null,
      state: null,
      city: null,
       // Does this need to be fetched dynamically? Right now irrespective of state, only these locations show up
      locationArray: ["BTM", "JP Nagar", "Koramangala"],
      userTypeArray: ["Volunteer Cook", "Recipient"],
      // Not displaying the full list of states since the locationArray has hard coded values anyway
      stateList: [{"code": "KA","name": "Karnataka"}]
      // stateList: [{"code": "AN","name": "Andaman and Nicobar Islands"},
      //             {"code": "AP","name": "Andhra Pradesh"},
      //             {"code": "AR","name": "Arunachal Pradesh"},
      //             {"code": "AS","name": "Assam"},
      //             {"code": "BR","name": "Bihar"},
      //             {"code": "CG","name": "Chandigarh"},
      //             {"code": "CH","name": "Chhattisgarh"},
      //             {"code": "DH","name": "Dadra and Nagar Haveli"},
      //             {"code": "DD","name": "Daman and Diu"},
      //             {"code": "DL","name": "Delhi"},
      //             {"code": "GA","name": "Goa"},
      //             {"code": "GJ","name": "Gujarat"},
      //             {"code": "HR","name": "Haryana"},
      //             {"code": "HP","name": "Himachal Pradesh"},
      //             {"code": "JK","name": "Jammu and Kashmir"},
      //             {"code": "JH","name": "Jharkhand"},
      //             {"code": "KA","name": "Karnataka"},
      //             {"code": "KL","name": "Kerala"},
      //             {"code": "LD","name": "Lakshadweep"},
      //             {"code": "MP","name": "Madhya Pradesh"},
      //             {"code": "MH","name": "Maharashtra"},
      //             {"code": "MN","name": "Manipur"},
      //             {"code": "ML","name": "Meghalaya"},
      //             {"code": "MZ","name": "Mizoram"},
      //             {"code": "NL","name": "Nagaland"},
      //             {"code": "OR","name": "Odisha"},
      //             {"code": "PY","name": "Puducherry"},
      //             {"code": "PB","name": "Punjab"},
      //             {"code": "RJ","name": "Rajasthan"},
      //             {"code": "SK","name": "Sikkim"},
      //             {"code": "TN","name": "Tamil Nadu"},
      //             {"code": "TS","name": "Telangana"},
      //             {"code": "TR","name": "Tripura"},
      //             {"code": "UK","name": "Uttarakhand"},
      //             {"code": "UP","name": "Uttar Pradesh"},
      //             {"code": "WB","name": "West Bengal"}]
    }
  },
  methods: {
    closeModal() {
      this.$emit("CloseModal", true);
    },
    async signUp() {
      this.validateFormDetails()
      if(this.errors.length == 0){
        try {
          const response = await axios.post("http://localhost:3000/user", {
            first_name: this.firstName,
            last_name: this.lastName,
            username: this.username,
            approved: false,
            password: this.password,
            phone_number: this.phoneNumber,
            user_type: this.userType,
            address: {
              first_line: this.address1,
              second_line: this.address2,
              locality: this.location,
              zipcode: this.zipcode,
              state: this.state,
              city: this.city
            }
          });
          this.$router.push('/cook');
          console.log({ response })
        } catch (error) {
          console.log({ error })
        }
      }
    },
    validateFormDetails: function() {
      this.errors = []
      console.log(this.state)
      const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const phoneRegEx = /(\+\d{2}|\d{2}-\\d{2}|\d{1})?\d{10}/;
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
      const zipcodeRegEx = /^[1-9][0-9]{5}$/
      const stateCodeArray = this.stateList.map(function (st) {return st.code})
      
      if (!this.firstName) {
        this.errors.push("Please enter your first name");
      }
      if (!this.lastName) {
        this.errors.push("Please enter your last name");
      }
      if(!this.phoneNumber || !phoneRegEx.test(this.phoneNumber)) {
        this.errors.push("Please enter a valid phone number")
      }
      if (!this.username || !emailRegEx.test(this.username)) {
        this.errors.push('Username must be a valid email');
      }
      if(!this.password || !passwordRegex.test(this.password)){
        this.errors.push("Password must be at least 8 characters and should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character")
      }
      if(!this.address1 || !this.address2){
        this.errors.push("Please enter your full address")
      }
      if(!this.location || !this.locationArray.includes(this.location)){
        this.errors.push("Please select a valid location")
      }
      if(!this.zipcode || !zipcodeRegEx.test(this.zipcode)){
        this.errors.push("Please enter a valid zipcode")
      }
      if(!this.state || !stateCodeArray.includes(this.state)){
        this.errors.push("Please select a valid state")
      }
      if(!this.city){
        this.errors.push("Please enter a valid city")
      }
      if(!this.userType || !this.userTypeArray.includes(this.userType)){
        this.errors.push("Please select a valid user type")
      }

      if (!this.errors.length) {
        return true;
      }
    },
  }
};
</script>
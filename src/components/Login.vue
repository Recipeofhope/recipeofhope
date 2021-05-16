<template>
  <section class="text-gray-600 body-font bg-primary">
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
      <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 class="title-font font-medium text-3xl text-secondary">Healthy and Hearty Lunches Delivered to Your Doorstep.</h1>
      <p class="leading-relaxed mt-4 text-secondary">Spreading Hope, One Meal at a Time.</p>
      </div>
      <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-md">
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
        <Field label="Username" name="username" type="text" v-model="username"></Field>
        <Field label="Password" name="password" type="password" v-model="password"></Field>
        <button class="text-white bg-button border-0 py-2 px-8 focus:outline-none hover:bg-button rounded text-lg mt-10" @click="continueLogin()">Login</button>
      </div>
    </div>
    <span></span>
    <!-- <Modal v-show="signup" @CloseModal="closeModal()" :fullname="fullname" :phoneNumber="phoneNumber" /> -->
  </section>
</template>
<script>
import Field from '@/components/Field.vue';
import Toast from '@/components/Toast'
// eslint-disable-next-line no-unused-vars
import {  mapActions, mapGetters, mapState } from 'vuex';

export default {
  data() {
    return {
      signup: false,
      username: '',
      password: ''
    }
  },
  components: {
    // Modal,
    Field
  },
  computed: mapGetters(['tokens']),
  
  watch: {
    tokens(newTokens, oldTokens) {
      console.log('newToken ', newTokens.access_token);
      if(newTokens.access_token) {
        Toast.success('Login successful!');
        // this.$router.push('/cook');
      }
      console.log('oldTokens', oldTokens);
    },
    // Method 2. 
    /*     
    '$store.state.user.tokens': function() {
    console.log(this.$store.state.user.tokens);
    }
    */
  },
  methods: {
    ...mapActions(["loginUser"]),

     handleLogin(response) {
      console.log('response ', response);
    },

    continueLogin() {
      const payload = {username: this.username, password: this.password};
      console.log('payload ', payload);
      this.loginUser(payload, this.handleLogin);
    },
  },
  updated() {
    console.log('called');
  }
}
</script>
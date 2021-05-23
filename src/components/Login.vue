<template>
  <section class="text-gray-600 body-font bg-primary">
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
      <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 class="title-font font-medium text-3xl text-secondary">Healthy and Hearty Lunches Delivered to Your Doorstep.</h1>
      <p class="leading-relaxed mt-4 text-secondary">Spreading Hope, One Meal at a Time.</p>
      </div>
      <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-md">
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
        <div class="relative mb-4">
          <label class="leading-7 text-sm text-primary"> Username </label>
          <input id="username" type="email" v-model="username" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <div class="relative mb-4">
          <label class="leading-7 text-sm text-primary"> Password </label>
          <input id="password" type="password" v-model="password" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <button class="text-white bg-button border-0 py-2 px-8 focus:outline-none hover:bg-button rounded text-lg mt-10"  @click="loginClicked()">Login</button>
      </div>
    </div>
  </section>
</template>
<script>

import axios from "axios";
import store from "../store/index"

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async loginClicked() {
      console.log("login button clicked", this.username, this.password)
      try{
        const response = await axios.post("https://recipeofhope.herokuapp.com/user/login", {
          username: this.username,
          password:this.password
      });
      console.log("response: ", response)
      store.commit("saveTokenData", response.data);
    } catch(error) {
      // TODO: display error message
      console.log("error: ", error)
    }
  },
}
}

</script>
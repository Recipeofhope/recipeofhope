<template>
  <section class="text-gray-600 body-font bg-primary">
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
      <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 class="title-font font-medium text-3xl text-secondary">Healthy and Hearty Lunches Delivered to Your Doorstep.</h1>
        <p class="leading-relaxed mt-4 text-secondary">Spreading Hope, One Meal at a Time.</p>
      </div>
      <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-md">
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Login Here</h2>
        <form ref="form" class="pt-3 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password">
          </div>
          <div class="flex items-center justify-between">
            <button @click="login()" class="rounded bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="button">
              Sign In
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
        <div v-if="failure">
          {{message}}
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      failure: false,
      message: ''
    }
  },
  methods: {
    async login() {
      let formData = {}
      formData.username = this.username
      formData.password = this.password
      try {
        let res = await this.$store.dispatch('auth/USER_LOGIN', formData).then(res => {
          if (res && res.auth === true) {
            if (res.user.user_type === 'Admin') {
              window.location.href = '/admin'
            } else if (res.user.user_type === 'Patient') {
              window.location.href = '/recipient'
            } else if (res.user.user_type === 'Cook') {
              window.location.href = '/cook'
            }
          } else if (res === null) {
            this.failure = true
            this.message = res.message
          }
        }).catch(err => {
          console.log(err)
        });
      } catch (e) {
        console.log(e.status)
        console.log(e)
      }
    },
  }
}
</script>
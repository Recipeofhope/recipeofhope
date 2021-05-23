<template>
  <div>
    <header class="text-gray-600 body-font border-b border-gray-300">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <router-link to="/" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-secondary rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg> -->
          <img class="logo" src="@/assets/Logo.png" alt="Recipe Of Hope" srcset="" />
          <span class="ml-3 text-xl text-primary">Recipe of Hope</span>
        </router-link>
        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4  md:border-gray-400 flex flex-wrap items-center text-base justify-center" :class="user ? 'md:border-l' : ''">
          <template v-if="user">
            <router-link class="mr-5 hover:text-gray-900" v-if="user.user_type === 'Cook'" to="/cook">Cooks</router-link>
            <router-link class="mr-5 hover:text-gray-900" v-if="user.user_type === 'Patient'" to="/recipient">Recipients</router-link>
            <router-link class="mr-5 hover:text-gray-900" v-if="user.user_type === 'Admin'" to="/admin">Admin</router-link>
          </template>
        </nav>
        <button v-if="user" @click="logout()" class="inline-flex items-center text-white bg-button border-0 py-1 px-3 focus:outline-none hover:bg-button rounded mt-4 md:mt-0">
          Logout
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
        <button v-else @click="signUp()" class="inline-flex items-center text-white bg-button border-0 py-1 px-3 focus:outline-none hover:bg-button rounded mt-4 md:mt-0">
          Sign Up
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
    <Modal v-show="signup" @CloseModal="closeModal()" :fullname="fullname" :phoneNumber="phoneNumber" />
  </div>
</template>
<script>
import Modal from '@/components/Modal.vue';

export default {
  data() {
    return {
      signup: false,
      fullname: '',
      phoneNumber: '',
      user: JSON.parse(localStorage.getItem('user')),
    }
  },
  components: {
    Modal
  },
  methods: {
    signUp() {
      this.signup = true
    },
    closeModal() {
      this.signup = false
    },
    async logout() {
      try {
        await this.$store.dispatch('auth/LOGOUT').then(res => {
          if (res.result === true) {
            window.location.href = '/'
          } else if (res.result === false) {
            res.type = 'error'
            this.$store.dispatch('snackbar/SHOW', res)
          }
        }).catch(err => {
          err.type = 'error'
          this.$store.dispatch('snackbar/SHOW', err)
        });
      } catch (e) {
        e.type = 'error'
        this.$store.dispatch('snackbar/SHOW', e)
      }
    }
  }
}
</script>
<style scoped>
.logo {
  width: 60px;
  height: 60px;
}
</style>
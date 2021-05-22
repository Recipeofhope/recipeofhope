<template>
  <section class="text-gray-600 body-font bg-primary">
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
      <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 class="title-font font-medium text-3xl text-secondary">Healthy and Hearty Lunches Delivered to Your Doorstep.</h1>
      <p class="leading-relaxed mt-4 text-secondary">Spreading Hope, One Meal at a Time.</p>
      </div>
      <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-md">
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
        <Field label="Full Name" name="fullname" type="text" :value.sync="fullname"></Field>
        <Field label="Phone Number" name="phoneNumber" type="tel" :value.sync="phoneNumber"></Field>
        <button class="text-white bg-button border-0 py-2 px-8 focus:outline-none hover:bg-button rounded text-lg mt-10" @click="continueSignup()">Sign Up</button>
      </div>
    </div>
    <Modal v-show="signup" @CloseModal="closeModal()" :name="fullname" :phone="phoneNumber" />
  </section>
</template>
<script>
import Field from '@/components/Field.vue';
import Modal from '@/components/Modal.vue';

export default {
  data() {
    return {
      signup: false,
      fullname: '',
      phoneNumber: ''
    }
  },
  components: {
    Modal,
    Field
  },
  methods: {
    continueSignup() {
      this.signup = true
    },
    closeModal() {
      this.signup = false
    }
  }
}
</script>
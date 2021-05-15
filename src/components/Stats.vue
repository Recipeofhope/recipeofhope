<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="bg-primary" v-if="type">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          {{ user.title }}
        </h2>
        <p class="mt-3 text-xl text-secondary sm:mt-4">
          {{ user.subTitle }}
        </p>
      </div>
      <dl class="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-2 sm:gap-8" v-if="type === 'cook'">
        <div class="flex flex-col">
          <dt class="order-2 mt-2 text-lg leading-6 font-medium text-secondary">
            Meals Delivered
          </dt>
          <dd class="order-1 text-5xl font-extrabold text-white">
            35
          </dd>
        </div>
        <div class="flex flex-col mt-10 sm:mt-0">
          <dt class="order-2 mt-2 text-lg leading-6 font-medium text-secondary">
            People helped
          </dt>
          <dd class="order-1 text-5xl font-extrabold text-white">
            70
          </dd>
        </div>
      </dl>
      <div class="mt-10 text-secondary flex justify-around" v-else-if="type === 'patient'">
        <ul class="list-disc">
          <li><a class="hover:underline" target="_blank" rel="noopener" href="https://covid.army">Covid Army</a></li>
          <li><a class="hover:underline" target="_blank" rel="noopener" href="https://covid.army">Covid Army</a></li>
          <li><a class="hover:underline" target="_blank" rel="noopener" href="https://covid.army">Covid Army</a></li>
        </ul>
        <ul class="list-disc">
          <li><a class="hover:underline" target="_blank" rel="noopener" href="https://covid.army">Covid Army</a></li>
          <li><a class="hover:underline" target="_blank" rel="noopener" href="https://covid.army">Covid Army</a></li>
          <li><a class="hover:underline" target="_blank" rel="noopener" href="https://covid.army">Covid Army</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['type'],
  data() {
    return {
      cook: {
        title: 'Thank you for volunteering as a cook',
        subTitle: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus repellat laudantium.',
      },
      patient: {
        title: 'Get well soon!',
        subTitle: 'Here are some more resources to help you out.',
      }
    }
  },
  computed: {
    user() {
      return this.type === 'cook' ? this.cook : this.patient
    }
  }
}
</script>
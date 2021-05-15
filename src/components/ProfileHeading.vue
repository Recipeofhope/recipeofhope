<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div>
    <div>
      <div class="md:flex md:items-center min-w-0">
        <span class="inline-block h-14 w-14 rounded-full overflow-hidden bg-gray-100">
          <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
        <h2 class="text-2xl leading-7 text-gray-900 sm:text-3xl sm:truncate px-5">
          <p class="font-bold">Hi, {{name}}</p>
          <p class="text-sm text-gray-500 italic">{{ type === 'cook' ? cookTxt : recipientTxt }}</p>
        </h2>
      </div>
      <!-- <div class="mt-4 flex md:mt-0 md:ml-4">
        <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-button hover:bg-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button">
          Contact Volunteer
        </button>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  props: ['name', 'type'],
  data() {
    return {
      cookTxt: 'Thank you for volunteeing as a cook.',
      recipientTxt: 'Get well soon!'
    }
  }
}
</script>
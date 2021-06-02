<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div>
    <div>
      <div class="md:flex md:items-center min-w-0">
        <h2
          class="text-2xl leading-7 text-gray-900 sm:text-3xl sm:truncate px-5"
        >
          <p class="font-bold">Hi, {{ name }}</p>
          <p class="text-sm text-gray-500 italic">
            {{ type && type.toLowerCase() === 'cook' ? cookTxt : recipientTxt }}
          </p>
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
        recipientTxt: 'Get well soon!',
      };
    },
  };
</script>

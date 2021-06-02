<template>
  <div
    class="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between "
    style="display: flex;
justify-content: space-between;"
  >
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      {{ headingTxt }}
    </h3>
    <div class="sm:mt-0 sm:ml-4 float-right">
      <button
        type="button"
        v-if="buttonTxt"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-button hover:bg-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button"
        @click="handleClick"
      >
        {{ buttonTxt }}
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['headingTxt', 'buttonTxt', 'buttonClick'],
    methods: {
      handleClick() {
        this.buttonClick && this.buttonClick();
      },
    },
  };
</script>

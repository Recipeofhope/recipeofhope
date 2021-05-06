<template>
  <div class="relative mt-4 mb-24">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-300"></div>
    </div>
    <div v-if="text" class="relative flex justify-center">
      <span class="px-2 bg-white text-sm text-gray-500">
        {{text}}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['text']
}
</script>
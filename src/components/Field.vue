<template>
  <div class="relative mb-4">
    <label for="full-name" class="leading-7 text-sm text-primary">{{label}}</label>
    <input @input="alertParent($event.target.value)" :type="type" id="full-name" :name="name" :value="value" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
  </div>
</template>
<script>
export default {
  props: ['label', 'type', 'value', 'name'],
  methods: {
    alertParent(val) {
      this.$emit(`input`, val)
      // this.$emit(`update:value`, val)
      // this.$emit('onChange', val);
    }
  }

}
</script>
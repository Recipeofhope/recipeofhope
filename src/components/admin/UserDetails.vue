<template>
  <fragment>
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {{ user.first_name }} {{ user.last_name }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ user.username }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ user.phone_number }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ user.building_name }}
      <br v-if="user.building_name" />
      {{ user.locality_name }}
      <br v-if="user.locality_name" />
      {{ user.first_line }}
      <br v-if="user.first_line" />
      {{ user.second_line }}
      <br v-if="user.second_line" />
      {{ user.city }} -
      {{ user.zipcode }}
      <br v-if="user.city || user.zipcode" />
      {{ user.state }}
      <br v-if="user.state" />
    </td>
  </fragment>
</template>
<script>
  export default {
    props: ['user'],
  };
</script>

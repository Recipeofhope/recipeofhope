<template>
  <div>
    <ApproveCooks />
    <Waitlist />
  </div>
</template>
<script>
  import ApproveCooks from '@/components/admin/ApproveCooks.vue';
  import Waitlist from '@/components/admin/Waitlist.vue';

  export default {
    components: {
      ApproveCooks,
      Waitlist,
    },
  };
</script>

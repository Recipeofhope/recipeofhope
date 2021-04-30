<template>
  <div>
    <ProfileHeading />
    <div class="container px-5 py-24 mx-auto">
      <Schedule />
      <OrderList />
    </div>
  </div>
</template>
<script>
import ProfileHeading from '@/components/ProfileHeading.vue'
import OrderList from '@/components/OrderList.vue'
import Schedule from '@/components/Schedule.vue'
export default {
  components: {
    ProfileHeading,
    OrderList,
    Schedule
  }
}
</script>
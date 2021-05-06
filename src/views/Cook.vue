<template>
  <div class="container px-5 py-24 mx-auto">
    <ProfileHeading class="-mt-10 mb-12" />
    <Stats class="my-20" />
    <Schedule />
    <Details />
  </div>
</template>
<script>
import ProfileHeading from '@/components/ProfileHeading.vue'
import Details from '@/components/Details.vue'
import Schedule from '@/components/Schedule.vue'
import Stats from '@/components/Stats.vue'

export default {
  components: {
    ProfileHeading,
    Details,
    Schedule,
    Stats
  }
}
</script>
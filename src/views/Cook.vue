<template>
  <div class="container px-5 py-24 mx-auto">
    <ProfileHeading :name="cookDetails.name" class="-mt-10 mb-12" />
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

import axios from 'axios'

export default {
  data() {
    return {
      cookID: '123',
      cookDetails: {}
    }
  },
  components: {
    ProfileHeading,
    Details,
    Schedule,
    Stats
  },
  async mounted() {
    try {
      const response = await this.getCookData();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async getCookData() {
      try {
        const data = await axios.get(`/cook/${this.cookID}`);
        this.cookDetails = data;

      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
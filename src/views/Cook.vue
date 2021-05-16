<template>
  <div class="container px-5 py-24 mx-auto" v-if="cook">
    <ProfileHeading :name="cook.name" :type="cook.type" class="-mt-10 mb-12" />
    <Stats class="my-20" :type="cook.type" />
    <Schedule :plan="cook.schedule" />
    <Details :name="cook.first_name" :details="address"/>
  </div>
</template>
<script>
import ProfileHeading from '@/components/ProfileHeading.vue'
import Details from '@/components/Details.vue'
import Schedule from '@/components/Schedule.vue'
import Stats from '@/components/Stats.vue'
import {  mapActions, mapGetters } from 'vuex';
import _get from 'lodash/get';

// import axios from 'axios'
// import { isToday, isTomorrow, parseISO } from 'date-fns'

export default {
  components: {
    ProfileHeading,
    Details,
    Schedule,
    Stats
  },
  computed: {
    ...mapGetters(['user']),
    cook: function() {
      return _get(this.user, 'user');
    },
    address: function() {
      return _get(this.user, 'address');
    },
    schedule: function() {
      return {
        today: 1,
        tomorrow: 2
      }
    }
  },
  mounted() {
    this.fetchUserDetails();
  },
  methods: {
    ...mapActions(["fetchUserDetails"]),
    
  }
}
</script>
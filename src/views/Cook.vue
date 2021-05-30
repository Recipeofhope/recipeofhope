<template>
  <div class="container px-5 py-24 mx-auto" v-if="cook">
    <ProfileHeading :name="cook.name" :type="cook.type" class="-mt-10 mb-12" />
    <!-- <Stats class="my-20" :type="cook.type" /> -->
    <Schedule :schedule="cook.schedule" :days="cook.days" :daysArrStartIdx="cook.daysArrStartIdx" />
    <Details :fName="cook.fName" :lName="cook.lName" :details="cook.address" userType="Volunteer Cook" :userId="cook.userId"/>
  </div>
</template>
<script>
import ProfileHeading from '@/components/ProfileHeading.vue'
import Details from '@/components/Details.vue'
import Schedule from '@/components/Schedule.vue'
import Stats from '@/components/Stats.vue'

import axios from 'axios'
import { isBefore, parseISO } from 'date-fns'

export default {
  data() {
    return {
      cook: {
        name: '',
        type: '',
        id: '',
        address: {},
        days: [],
        schedule: {},
        daysArrStartIdx: 0
      }
    }
  },
  components: {
    ProfileHeading,
    Details,
    Schedule,
    Stats
  },
  mounted() {
    this.getCookData();
  },
  methods: {
    async getCookData() {
      try {
        let { data } = await axios.post('http://recipeofhope.herokuapp.com/user/login', {
          "username":"pankajhasija-c1",
          "password":"password"
        });

        let userId = data && data.user ? data.user.id : '';
        let fName = data && data.user ? data.user.first_name : '';
        let lName = data && data.user ? data.user.last_name : '';
        let type = data && data.user ? data.user.user_type : '';
        const address = data && data.address ? data.address : {};
        const schedule = data && data.meals ? data.meals : {};
        const days = Object.keys(schedule);

        days.sort((d1, d2) => isBefore(parseISO(d2), parseISO(d1)) ? 1 : -1);

        this.cook.userId = userId;
        this.cook.fName = fName;
        this.cook.lName = lName;
        this.cook.type = type;
        this.cook.address = { ...address };
        this.cook.schedule = schedule;
        this.cook.days = days;
        this.cook.daysArrStartIdx = days.length === 6 ? -1 : 0;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
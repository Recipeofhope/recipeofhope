<template>
  <div class="container px-5 py-24 mx-auto" v-if="cook">
    <ProfileHeading :name="cook.name" :type="cook.type" class="-mt-10 mb-12" />
    <Stats class="my-20" :type="cook.type" />
    <Schedule :plan="cook.schedule" />
    <Details :name="cook.name" :details="cook.address"/>
  </div>
</template>
<script>
import ProfileHeading from '@/components/ProfileHeading.vue'
import Details from '@/components/Details.vue'
import Schedule from '@/components/Schedule.vue'
import Stats from '@/components/Stats.vue'

import axios from 'axios'
import { isToday, isTomorrow, parseISO } from 'date-fns'

export default {
  data() {
    return {
      cookID: '123',
      cook: {
        name: '',
        type: '',
        address: {
          address_line_1: '',
          address_line_2: '',
          phone_number: '',
          city: '',
          zipcode: ''
        }
      },
      schedule: {
        today: 0,
        tomorrow: 0
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
        let { data } = await axios.get(`https://609e8e8133eed80017958cad.mockapi.io/cook/${(Math.floor(Math.random() * 30) + 1)}`);
        this.cook.name = data.name
        this.cook.type = data.type
        this.cook.address = {
          address_line_1: data.address_line_1,
          address_line_2: data.address_line_2,
          city: data.city,
          zipcode: data.zipcode,
          phone_number: data.phone_number,
        }
        this.cook.schedule = {
          today: data.meals.filter(m => {
            console.log(m.date, parseISO(m.date));
            return isToday(parseISO(m.date))
          }),
          tomorrow: data.meals.filter(m => isTomorrow(parseISO(m.date)))
        }

        console.log(this.cook.schedule);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
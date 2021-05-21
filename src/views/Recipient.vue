<template>
  <div class="container px-5 py-24 mx-auto" v-if="recipient">
    <ProfileHeading :name="recipient.name" :type="recipient.type" class="-mt-10 mb-12" />
    <Stats class="my-20" :type="recipient.type"/>
    <OrderMeal />
  </div>
</template>
<script>
import ProfileHeading from '@/components/ProfileHeading.vue'
import Stats from '@/components/Stats.vue'
import OrderMeal from '@/components/OrderMeal.vue'
import axios from 'axios';

export default {
  data() {
    return {
      recipient: {
        name: '',
        type: '',
        address: {
          address_line_1: '',
          address_line_2: '',
          phone_number: '',
          city: '',
          zipcode: ''
        }
      }
    }
  },
  components: {
    ProfileHeading,
    Stats,
    OrderMeal
  },
  mounted() {
    this.getRecipientInformation();
  },
  methods: {
    async getRecipientInformation() {
      try {
        let { data } = await axios.get(`https://609e8e8133eed80017958cad.mockapi.io/recipient/${(Math.floor(Math.random() * 30) + 1)}`);
        this.recipient.name = data.name
        this.recipient.type = data.type
        this.recipient.address = {
          address_line_1: data.address_line_1,
          address_line_2: data.address_line_2,
          city: data.city,
          zipcode: data.zipcode,
          phone_number: data.phone_number,
        }
        console.log(this.recipient);

      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
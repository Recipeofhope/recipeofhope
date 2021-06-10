<template>
  <div class="container px-5 py-24 mx-auto" v-if="recipient">
    <ProfileHeading
      :name="recipient.first_name"
      :type="recipient.type"
      class="-mt-10 mb-12"
    />
    <!-- <Stats class="my-20" :type="recipient.type"/> -->
    <OrderMeal />
    <Details
      :fName="recipient.first_name"
      :lName="recipient.last_name"
      :details="recipient.address"
      :userId="recipient.user_id"
      :phoneNo="recipient.phone_number"
    />
  </div>
</template>
<script>
  import ProfileHeading from '@/components/ProfileHeading.vue';
  // import Stats from '@/components/Stats.vue';
  import Details from '@/components/Details.vue';
  import OrderMeal from '@/components/OrderMeal.vue';

  export default {
    data() {
      return {
        recipient: {
          first_name: '',
          last_name: '',
          type: '',
          address: {},
          user_id: '',
          phone_number: '',
        },
      };
    },
    components: {
      ProfileHeading,
      // Stats,
      Details,
      OrderMeal,
    },
    mounted() {
      this.getRecipientInformation();
    },
    methods: {
      getRecipientInformation() {
        let data = {};
        data.user = this.$store.getters['auth/currentUser'];
        data.address = this.$store.getters['auth/currentAddress'];
        data.meals = this.$store.getters['auth/currentMeals'];

        this.recipient.first_name = data.user.first_name;
        this.recipient.last_name = data.user.last_name;
        this.recipient.type = 'Patient';
        this.recipient.address = { ...data.address };
        this.recipient.user_id = data.user.id;
        this.recipient.phone_number = data.user.phone_number;
      },
    },
  };
</script>

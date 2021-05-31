<template>
  <div class="container px-5 py-5 mx-auto">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
            <div class="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Waitlisted Recipients
              </h3>
            </div>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone Number
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Meals Requested
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Waitlist Join Time
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  :class="idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'"
                  v-for="(recipient, idx) in waitlistedRecipients"
                  :key="recipient.id"
                >
                  <UserDetails v-bind:user="recipient" />
                  <td
                    class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
                  >
                    {{ recipient.meals_requested }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatJoinTime(recipient.waitlist_join_time) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import UserDetails from '@/components/admin/UserDetails.vue';

  import { DateTime } from 'luxon';

  export default {
    data() {
      return {
        waitlistedRecipients: [],
      };
    },
    mounted() {
      this.getWaitlistedRecipients();
    },
    methods: {
      async getWaitlistedRecipients() {
        try {
          const { data } = await this.$store.dispatch('admin/GET_WAITLIST');
          this.waitlistedRecipients = data.recipients;
        } catch (error) {
          console.log({ error });
        }
      },
      formatJoinTime(joinTime) {
        return DateTime.fromISO(joinTime, {
          zone: 'Asia/Kolkata',
        })
          .setLocale('en-US')
          .toLocaleString(DateTime.DATETIME_MED);
      },
    },
    components: {
      UserDetails,
    },
  };
</script>

<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div>
    <SectionHeading headingTxt="Your Schedule"></SectionHeading>
    <Sch :mealsToday="mealsToday" :mealsTomorrow="mealsTomorrow" />
    <SectionHeading
      class="mt-20"
      headingTxt="Pick your meal slots"
      buttonTxt="Confirm Slots"
      :buttonClick="confirmSlots"
    ></SectionHeading>
    <div class="flex flex-col py-10">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="flex-1 bg-gray-50">
                <tr>
                  <th
                    v-for="index in 5"
                    :key="index"
                    scope="col"
                    class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <p>{{ getFutureDate(index) }}</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white flex-1">
                  <td
                    class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900"
                    v-for="(count, date) in mealDateToCount"
                    :key="date"
                  >
                    <input
                      class="text-center py-4 border"
                      type="number"
                      name="date"
                      :min="0"
                      id="date"
                      v-model="mealDateToCount[date]"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p class="py-5 text-gray-500 italic text-sm">
        Please fill in the number of meals you would like to offer, per day.
      </p>
    </div>
    <SuccessErrorModal
      v-show="showModal"
      @CloseModal="closeModal()"
      v-bind:error="error"
      :title="title"
      :message="message"
    />
  </div>
</template>
<script>
  import SectionHeading from '@/components/SectionHeading.vue';
  import Sch from '@/components/Sch.vue';
  import SuccessErrorModal from '@/components/SuccessErrorModal.vue';
  import { DateTime } from 'luxon';
  export default {
    data() {
      const mealDateToCount = {};
      for (let idx = 0; idx < 5; idx++) {
        const isoDate = DateTime.now()
          .setZone('Asia/Kolkata')
          .plus({ days: 2 + idx })
          .toISODate();
        mealDateToCount[isoDate] = 0;
      }
      const mealsToday = 0;
      const mealsTomorrow = 0;
      return {
        mealDateToCount,
        mealsToday,
        mealsTomorrow,
        showModal: false,
        error: false,
        title: '',
        message: '',
      };
    },
    watch: {
      schedule() {
        for (const date in this.mealDateToCount) {
          if (date in this.schedule) {
            this.mealDateToCount[date] = this.schedule[date].length;
          }
        }
        const date = DateTime.now().setZone('Asia/Kolkata');
        const today = date.toISODate();
        const tomorrow = date.plus({ days: 1 }).toISODate();
        if (today in this.schedule) {
          this.mealsToday = this.schedule[today].length;
        }
        if (tomorrow in this.schedule) {
          this.mealsTomorrow = this.schedule[tomorrow].length;
        }
      },
    },
    props: ['schedule'],
    components: {
      SectionHeading,
      Sch,
      SuccessErrorModal,
    },
    methods: {
      async confirmSlots() {
        // Do validation on meal counts.
        for (const date in this.mealDateToCount) {
          if (isNaN(this.mealDateToCount[date])) {
            this.showModal = true;
            this.title = 'Error';
            this.error = true;
            this.message = 'Please enter only numbers for meal slots.';
            return;
          }
          if (this.mealDateToCount[date] < 0) {
            this.showModal = true;
            this.title = 'Error';
            this.error = true;
            this.message = 'Meal slots cannot be negative.';
          }
        }

        //Transform mealDateTocount to expected request body.
        const payload = [];
        for (let date in this.mealDateToCount) {
          const obj = {};
          obj[date.toString()] = this.mealDateToCount[date];
          payload.push({
            date: date,
            number_of_meals: this.mealDateToCount[date],
          });
        }
        payload.sort((a, b) => {
          const d1 = DateTime.fromISO(a.date);
          const d2 = DateTime.fromISO(b.date);
          if (d1.toMillis() === d2.toMillis()) {
            return 0;
          } else if (d1 < d2) {
            return -1;
          } else {
            return 1;
          }
        });
        const res = await this.$store.dispatch('cook/UPDATE_SCHEDULE', payload);
        this.showModal = true;
        if (res.status === 204) {
          this.showModal = true;
          this.title = 'Slots updated succesfully';
        } else {
          this.title = 'Error';
          this.error = true;
          this.message = res.data?.message;
        }
      },
      getFutureDate(index) {
        return DateTime.now()
          .setZone('Asia/Kolkata')
          .plus({ days: 1 + index })
          .setLocale('en-US')
          .toFormat('ccc, LLL dd');
      },
      closeModal() {
        this.error = false;
        this.showModal = false;
        this.title = '';
        this.message = '';
      },
    },
  };
</script>

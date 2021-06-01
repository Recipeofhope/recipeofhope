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
                      id="date"
                      v-model="mealDateToCount[date]"
                    />
                  </td>
                  <!-- <td
                    class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900"
                  >
                    <input
                      class="text-center py-4 border"
                      type="number"
                      name=""
                      id=""
                      v-model="mealCount[1]"
                    />
                  </td>
                  <td
                    class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900"
                  >
                    <input
                      class="text-center py-4 border"
                      type="number"
                      name=""
                      id=""
                      v-model="mealCount[2]"
                    />
                  </td>
                  <td
                    class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900"
                  >
                    <input
                      class="text-center py-4 border"
                      type="number"
                      name=""
                      id=""
                      v-model="mealCount[3]"
                    />
                  </td>
                  <td
                    class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900"
                  >
                    <input
                      class="text-center py-4 border"
                      type="number"
                      name=""
                      id=""
                      v-model="mealCount[4]"
                    />
                  </td> -->
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
    props: ['schedule'],
    components: {
      SectionHeading,
      Sch,
    },
    methods: {
      async confirmSlots() {
        const res = await this.$store.dispatch(
          'cook/UPDATE_SCHEDULE',
          this.mealDateToCount
        );
        this.showModal = true;
        if (res.status === 200) {
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

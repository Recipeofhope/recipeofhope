<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div>
    <SectionHeading headingTxt="Your Schedule"></SectionHeading>
    <Sch :today="today" :tomorrow="tomorrow" />
    <SectionHeading class="mt-20" headingTxt="Pick your meal slots" buttonTxt="Confirm Slots" :buttonClick="confirmSlots"></SectionHeading>
    <div class="flex flex-col py-10">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="flex-1 bg-gray-50">
                <tr>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>{{ future[0] ? future[0].date : '' }}</p>
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>{{ future[1] ? future[1].date : '' }}</p>
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>{{ future[2] ? future[2].date : '' }}</p>
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>{{ future[3] ? future[3].date : '' }}</p>
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>{{ future[4] ? future[4].date : '' }}</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- Odd row -->
                <tr class="bg-white flex-1">
                  <td class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="number" name="" id="" v-model="mealCount[0]">
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="number" name="" id=""  v-model="mealCount[1]">
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="number" name="" id=""  v-model="mealCount[2]">
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="number" name="" id="" v-model="mealCount[3]">
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="number" name="" id="" v-model="mealCount[4]">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p class="py-5 text-gray-500 italic text-sm">Please fill in the number of meals you would like to offer, per day.</p>
    </div>
  </div>
  <!-- This example requires Tailwind CSS v2.0+ -->
</template>
<script>
import SectionHeading from '@/components/SectionHeading.vue';
import Sch from '@/components/Sch.vue';
import { format, parseISO } from 'date-fns'
export default {
  data() {
    const mealCount = new Array(5).fill(0);
    return {
      mealCount
    }
  },
  props: ['schedule', 'days', 'daysArrStartIdx'],
  components: {
    SectionHeading,
    Sch
  },
  computed: {
    today() {
      const meals = this.schedule?.[this.days[this.daysArrStartIdx]] || [];
      const date = this.days?.[this.daysArrStartIdx] || '';
      return {
        meals,
        date
      }
    },
    tomorrow() {
      const meals = this.schedule?.[this.days[this.daysArrStartIdx + 1]] || [];
      const date = this.days?.[this.daysArrStartIdx + 1] || '';
      return {
        meals,
        date
      }
    },
    future() {
      const remaining = [];
      const days = this.days || [];
      for (let i = this.daysArrStartIdx + 2; i < days.length; i++) {
        const date = days[i] ? format(parseISO(days[i]), 'E, MMM do') : '';
        const meals = this.schedule?.[days[i]] || []
        remaining.push({
          meals: meals,
          date: date,
        });        
      }
      return remaining;
    }
  },
  watch: {
    future() {
      this.mealCount = this.future.map(item => item.meals.length);
    }
  },
  methods: {
    confirmSlots() {
      console.log(this);
    }
  }
}
</script>
<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div>
    <SectionHeading headingTxt="Your Schedule"></SectionHeading>
    <Sch :today="todayCount" :tomorrow="tomorrowCount" />
    <SectionHeading class="mt-20" headingTxt="Pick your meal slots" buttonTxt="Confirm Slots"></SectionHeading>
    <div class="flex flex-col py-10">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="flex-1 bg-gray-50">
                <tr>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>{{ dateArray[0] }}</p>
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>{{ dateArray[1] }}</p>
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>{{ dateArray[2] }}</p>
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>{{ dateArray[3] }}</p>
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>{{ dateArray[4] }}</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <!-- Odd row -->
                <tr class="bg-white flex-1">
                  <td class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="text" name="" id="" value="1">
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="text" name="" id="" value="1">
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="text" name="" id="" value="1">
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="text" name="" id="" value="1">
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="text" name="" id="" value="1">
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

export default {
  props: ['plan'],
  components: {
    SectionHeading,
    Sch
  },
  computed: {
    todayCount() {
      return this?.plan?.today?.length
    },
    tomorrowCount() {
      return this?.plan?.tomorrow?.length
    }
  },
  data() {
    return {
        dateArray: this.getDatesWeekArray()
      }
  },
  methods: {
    getDatesWeekArray() {
      const dateArray = []
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ]; 
      const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]

      var today, day2, day3, day4, day5
      today = new Date()
      day2  = new Date()
      day3 = new Date()
      day4 = new Date()
      day5 = new Date()
      
      day2.setDate(today.getDate() + 1)
      day3.setDate(today.getDate() + 2)
      day4.setDate(today.getDate() + 3)
      day5.setDate(today.getDate() + 4)

      dateArray.push(`${dayNames[today.getDay()]}, ${monthNames[today.getMonth()]} ${today.getDate()}`)
      dateArray.push(`${dayNames[day2.getDay()]}, ${monthNames[day2.getMonth()]} ${day2.getDate()}`)
      dateArray.push(`${dayNames[day3.getDay()]}, ${monthNames[day3.getMonth()]} ${day3.getDate()}`)
      dateArray.push(`${dayNames[day4.getDay()]}, ${monthNames[day4.getMonth()]} ${day4.getDate()}`)
      dateArray.push(`${dayNames[day5.getDay()]}, ${monthNames[day5.getMonth()]} ${day5.getDate()}`)

      return dateArray

    }
  }
}
</script>
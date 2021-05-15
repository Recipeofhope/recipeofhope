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
                    <p>Mon, May 3rd</p>
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>Tue, May 2nd</p>
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>Wed, May 3rd</p>
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>Thu, May 4th</p>
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>Fri, May 5th</p>
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
  }
}
</script>
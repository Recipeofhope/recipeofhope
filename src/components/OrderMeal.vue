<template>
  <div class="container">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <SectionHeading :headingTxt="'Order Your Meal'" />
    <div class="py-10">
      <p>This section will contain details on how to order meal</p>
    </div>
    <SectionHeading :headingTxt="'Cooks nearby'" />
    <div class="flex flex-col py-10">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meals Available
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    Order
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="meal in meals.nearby" :key="meal.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <!-- <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=HMcQGzeISi&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
                      </div> -->
                      <div>
                        <div class="text-sm font-medium text-gray-900">
                          {{ meal.cookName }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ meal.locality }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ meal.address_line_1 }}</div>
                    <div class="text-sm text-gray-900">{{ meal.address_line_2 }}</div>
                    <div class="text-sm text-gray-900">{{ meal.city }}</div>
                    <div class="text-sm text-gray-900">{{ meal.zipcode }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      10
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input class="w-16" type="number" name="" id="" min="1" max="10" />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-button hover:bg-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button">
                      Order
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <SectionHeading :headingTxt="'Cooks further away'" />
    <div class="flex flex-col py-10">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meals Available
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    Order
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="meal in meals.further" :key="meal.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <!-- <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=HMcQGzeISi&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
                      </div> -->
                      <div>
                        <div class="text-sm font-medium text-gray-900">
                          {{ meal.cookName }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ meal.locality }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ meal.address_line_1 }}</div>
                    <div class="text-sm text-gray-900">{{ meal.address_line_2 }}</div>
                    <div class="text-sm text-gray-900">{{ meal.city }}</div>
                    <div class="text-sm text-gray-900">{{ meal.zipcode }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      10
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input class="w-16" type="number" name="" id="" min="1" max="10" />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-button hover:bg-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button">
                      Order
                    </button>
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
import SectionHeading from '@/components/SectionHeading.vue'
import axios from 'axios'

export default {
  data() {
    return {
      meals: {
        nearby: [],
        further: []
      }
    }
  },
  components: {
    SectionHeading
  },
  mounted() {
    this.getMeals();
  },
  methods: {
    async getMeals() {
      try {
        const { data } = await axios.get('https://609e8e8133eed80017958cad.mockapi.io/meals')
        this.meals.nearby = data.slice(0, 4)
        this.meals.further = data
      } catch (error) {
        console.log({ error })
      }
    }
  }
}
</script>
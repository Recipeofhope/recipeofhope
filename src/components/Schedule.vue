<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div>
    <div class="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Pick your meal slots
      </h3>
      <div class="mt-3 sm:mt-0 sm:ml-4">
        <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-button hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button">
          Confirm Slots
        </button>
      </div>
    </div>
    <div class="flex flex-col py-10">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>Sat, May 1st</p>
                    <p class="text-primary text-xs">Today</p>
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    <p>Sun, May 2nd</p>
                    <p class="text-xs text-primary">Tomorrow</p>
                  </th>
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
                <tr class="bg-white">
                  <td class="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="text" name="" id="" value="1">
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="text" name="" id="" value="1">
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="text" name="" id="" value="1">
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="text" name="" id="" value="1">
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="text" name="" id="" value="1">
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="text" name="" id="" value="1">
                  </td>
                  <td class="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <input class="text-center py-4 border" type="text" name="" id="" value="1">
                  </td>
                </tr>

                <!-- Even row -->
                <!-- <tr class="bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Cody Fisher
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Product Directives Officer
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    cody.fisher@example.com
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Owner
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                  </td>
                </tr> -->

                <!-- More people... -->
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
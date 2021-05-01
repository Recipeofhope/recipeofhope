<template>
  <div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="mt-20 mb-10 py-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Your Details
      </h3>
      <div class="mt-3 sm:mt-0 sm:ml-4">
        <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-button hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button">
          Edit
        </button>
      </div>
    </div>
    <div class="bg-white shadow-md overflow-hidden sm:rounded-lg">
      <!-- <div class="flex sm:justify-between px-4 py-5 sm:px-6">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Your Details
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Personal information and application.
          </p>
        </div>
        <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          Edit
        </button>
      </div> -->
      <div class="border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Full name
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Ricardo Cooper
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Role
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Volunteer Cook
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Email address
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              mitidesai@example.com
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Address
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              #1500, Trupti Apartments, <br>
              10th A Main, 12th Cross, <br>
              Jayanagar 7th Block, <br>
              Bangalore, 560076
            </dd>
          </div>
        </dl>
      </div>
    </div>

  </div>
</template>
<style scoped>
div {
  color: #FFCCFF;
  color: #355c7d;
  color: #a1d0a8;
  color: #e94f2d;
}
</style>
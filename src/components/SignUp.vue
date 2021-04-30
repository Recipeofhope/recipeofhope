<template>
  <section class="text-gray-600 body-font bg-secondary">
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
      <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 class="title-font font-medium text-3xl text-primary">Healthy and Hearty Lunches Delivered to Your Doorstep.</h1>
      <p class="leading-relaxed mt-4 text-primary">Spreading Hope, One Meal at a Time.</p>
      </div>
      <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-md">
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
        <div class="relative mb-4">
            <label for="full-name" class="leading-7 text-sm text-primary">Full Name</label>
            <input type="text" id="full-name" name="full-name" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-primary">Phone Number</label>
            <input type="tel" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <div>
          <fieldset>
            <div class="mt-4 space-y-4">
              <div class="relative flex items-start">
                <div class="flex items-center h-5">
                  <input id="ascook" name="ascook" type="checkbox" class="focus:ring-primary h-4 w-4 text-primary border-primary rounded">
                </div>
                <div class="ml-3 text-sm">
                  <label for="ascook" class="font-medium text-primary">I'm a volunteer cook</label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <button class="text-white bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg mt-10">Sign Up</button>
        <!-- <p class="text-xs text-gray-500 mt-3">Sign up as a cook or a patient.</p> -->
      </div>
    </div>
  </section>
</template>
<script>
export default {
  
}
</script>
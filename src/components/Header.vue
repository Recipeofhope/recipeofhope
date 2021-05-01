<template>
  <header class="text-gray-600 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <router-link to="/" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-secondary rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg> -->
          <img class="logo" src="@/assets/Logo.png" alt="Recipe Of Hope" srcset="" />
          <span class="ml-3 text-xl text-primary">Recipe of Hope</span>
        </router-link>
        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <router-link class="mr-5 hover:text-gray-900" to="/cook">Cooks</router-link>
          <router-link class="mr-5 hover:text-gray-900" to="/recipient">Recipients</router-link>
        </nav>
        <button class="inline-flex items-center text-white bg-button border-0 py-1 px-3 focus:outline-none hover:bg-button rounded mt-4 md:mt-0">
          Login
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
  </header>
</template>
<style scoped>
.logo {
  width: 60px;
  height: 60px;
}
</style>
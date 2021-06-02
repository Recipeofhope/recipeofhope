<template>
  <div>
    <ul
      class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      <li class="col-span-1 flex shadow-sm rounded-md" v-if="isBefore8PM">
        <div
          class="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-lg font-medium rounded-l-md"
        >
          {{ mealsToday }}
        </div>
        <div
          class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md"
        >
          <div class="flex-1 px-4 py-2 text-lg truncate">
            <a href="#" class="text-gray-900 font-medium hover:text-gray-600"
              >Meals</a
            >
            <p class="text-gray-500">Today, {{ getDate(0) }}</p>
          </div>
          <div class="flex-shrink-0 pr-2">
            <div class="relative inline-block text-left">
              <button
                class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                @click.prevent="showDropdown = !showDropdown"
              >
                <span class="sr-only">Open options</span>
                <!-- Heroicon name: solid/dots-vertical -->
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                  />
                </svg>
              </button>
              <div
                class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
                v-show="showDropdown"
                style="cursor:pointer"
              >
                <div class="py-1" role="none">
                  <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                  <a
                    class="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                    @click="showConfirmMealsModal"
                    >Mark Meals as Ready</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li class="col-span-1 flex shadow-sm rounded-md">
        <div
          class="flex-shrink-0 flex items-center justify-center w-16 bg-purple-600 text-white text-lg font-medium rounded-l-md"
        >
          {{ mealsTomorrow }}
        </div>
        <div
          class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate"
        >
          <div class="flex-1 px-4 py-2 text-lg truncate">
            <a href="#" class="text-gray-900 font-medium hover:text-gray-600"
              >Meals</a
            >
            <p class="text-gray-500">Tomorrow, {{ getDate(1) }}</p>
          </div>
        </div>
      </li>
    </ul>
    <ConfirmModal
      v-show="showModal"
      @CloseModal="closeModal()"
      @ConfirmListener="markMealsAsReady"
      :title="title"
      :message="message"
    />
    <SuccessErrorModal
      v-show="showSuccessErrorModal"
      @CloseModal="closeModal()"
      v-bind:error="error"
      :title="successErrorTitle"
      :message="successErrorMessage"
    />
  </div>
</template>
<script>
  import { DateTime } from 'luxon';
  import ConfirmModal from '@/components/ConfirmModal.vue';
  import SuccessErrorModal from '@/components/SuccessErrorModal.vue';
  export default {
    data() {
      return {
        showModal: false,
        showDropdown: false,
        showSuccessErrorModal: false,
        successErrorTitle: '',
        successErrorMessage: '',
        error: false,
        title: '',
        message: '',
      };
    },
    props: ['mealsToday', 'mealsTomorrow'],
    computed: {
      getDate() {
        return (plusDays) =>
          DateTime.now()
            .setZone('Asia/Kolkata')
            .plus({ days: plusDays })
            .setLocale('en-US')
            .toFormat('ccc LLL dd');
      },
      isBefore8PM() {
        return DateTime.now().setZone('Asia/Kolkata').hour < 20;
      },
    },
    methods: {
      showConfirmMealsModal() {
        if (this.mealsToday === 0) {
          this.showSuccessErrorModal = true;
          this.successErrorTitle = 'Error';
          this.error = true;
          this.successErrorMessage = 'No Meals due today.';
          this.showDropdown = false;
          return;
        }
        this.showDropdown = false;
        this.showModal = true;
        this.title = "Confirm Today's Meals";
        this.message =
          'Pressing the Confirm button will inform recipients that your meals for today are ready. They will be asked to reach out to you to coordinate deliveries.';
      },
      async markMealsAsReady() {
        this.showModal = false;
        const res = await this.$store.dispatch('cook/MARK_MEALS_AS_READY', {});
        this.showSuccessErrorModal = true;
        if (res.status === 204) {
          this.error = false;
          this.successErrorTitle = 'Confirmed Meals Successfully';
        } else {
          this.successErrorTitle = 'Error';
          this.error = true;
          this.successErrorMessage = res.data?.message;
        }
      },
      close(e) {
        if (!this.$el.contains(e.target)) {
          this.showDropdown = false;
        }
      },
      closeModal() {
        this.error = false;
        this.showModal = false;
        this.showSuccessErrorModal = false;
      },
    },
    mounted() {
      document.addEventListener('click', this.close);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.close);
    },
    components: {
      ConfirmModal,
      SuccessErrorModal,
    },
  };
</script>

<template>
  <div class="container">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <SectionHeading :headingTxt="'Your Meals'" />
    <div class="py-10">
      <div class="flex flex-col pb-10">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Meals Booked
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    ></th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(meal, id) of meals.bookedMeals" :key="id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <!-- <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=HMcQGzeISi&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
                      </div> -->
                        <div>
                          <div class="text-sm font-medium text-gray-900">
                            {{ meal.cook_details.name }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ meal.cook_details.locality }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        {{ meal.count }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">
                        {{ formatDate(meal.date) }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="py-4 flex justify-end">
                        <button
                          type="button"
                          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-button hover:bg-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button"
                          @click="confirmCancelMeal(id)"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <SectionHeading :headingTxt="'Cooks nearby'" />
      <div class="flex flex-col py-10">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Meals Available
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
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
                            {{ meal.cook_name }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ meal.locality_name }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        {{ meal.count }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <input
                        class="w-16"
                        type="number"
                        name=""
                        id=""
                        min="1"
                        :max="meal.count"
                        v-model.number="meal.quantity"
                        @keypress="isNumber($event)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="py-4 flex sm:justify-end justify-start">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-button hover:bg-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button"
                @click="orderFromCooks(meals.nearby)"
                :disabled="shouldDisableOrderButtons"
                :class="{
                  'button-disabled': shouldDisableOrderButtons,
                }"
              >
                Order
              </button>
            </div>
            <div class="py-4 flex sm:justify-end justify-start">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-button hover:bg-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button"
                @click="joinWaitlist"
                v-if="shouldDisableOrderButtons"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </div>
      <SectionHeading :headingTxt="'Cooks further away'" />
      <div class="flex flex-col py-10">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Meals Available
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
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
                            {{ meal.cook_name }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ meal.locality_name }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        {{ meal.count }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <input
                        class="w-16"
                        @keypress="isNumber($event)"
                        type="number"
                        name=""
                        id=""
                        min="1"
                        :max="meal.count"
                        v-model.number="meal.quantity"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="py-4 flex sm:justify-end justify-start">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-button hover:bg-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button"
                @click="orderFromCooks(meals.further)"
                :disabled="shouldDisableOrderButtons"
                :class="{
                  'button-disabled': shouldDisableOrderButtons,
                }"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <SuccessErrorModal
        v-show="showModal"
        @CloseModal="closeModal()"
        v-bind:error="error"
        :title="title"
        :message="message"
      />
      <ConfirmModal
        v-show="showConfirmModal"
        @CloseModal="closeModal()"
        @ConfirmListener="
          shouldShowMealsRequestedInput ? addToWaitlist() : cancelMeal()
        "
        v-bind:showMealsRequestedInput="shouldShowMealsRequestedInput"
        :title="title"
        :message="message"
      />
    </div>
  </div>
</template>
<script>
  import SectionHeading from '@/components/SectionHeading.vue';
  import SuccessErrorModal from '@/components/SuccessErrorModal.vue';
  import ConfirmModal from '@/components/ConfirmModal.vue';
  import { DateTime } from 'luxon';

  export default {
    data() {
      return {
        error: false,
        showModal: false,
        showConfirmModal: false,
        shouldDisableOrderButtons: false,
        mealIdToBeCancelled: '',
        shouldShowMealsRequestedInput: false,
        title: '',
        message: '',
        meals: {
          nearby: [],
          further: [],
          bookedMeals: {},
        },
      };
    },
    components: {
      SectionHeading,
      SuccessErrorModal,
      ConfirmModal,
    },
    mounted() {
      this.getAvailableMeals();
      this.getBookedMeals();
    },
    methods: {
      async getAvailableMeals() {
        try {
          await this.populateAvailableMealsData();
        } catch (error) {
          this.displayErrorModal(error.message);
        }
      },
      async getBookedMeals() {
        try {
          await this.populateBookedMealsData();
        } catch (error) {
          this.displayErrorModal(error.message);
        }
      },
      async populateBookedMealsData() {
        // Reset the booked meals data before populating it with fresh data.
        this.meals.bookedMeals = {};

        const res = await this.$store.dispatch('patient/GET_BOOKED_MEALS');
        const data = res.data;
        if (res.status === 400) {
          this.displayErrorModal(data.message);
          return;
        }
        if (res.status === 200) {
          this.meals.bookedMeals = data;
        }
      },
      async populateAvailableMealsData() {
        this.meals.further = [];
        this.meals.nearby = [];
        const res = await this.$store.dispatch('patient/GET_AVAILABLE_MEALS');
        const data = res.data;
        if (res.status === 400) {
          if (data.message === 'JOIN_WAITLIST') {
            this.shouldDisableOrderButtons = true;
          } else {
            this.displayErrorModal(data.message);
          }
          return;
        }
        if (res.status === 200) {
          this.shouldDisableOrderButtons = false;
          this.meals.nearby = data.filter((cook) => cook.nearby);
          this.meals.further = data.filter((cook) => !cook.nearby);
        }
      },
      async orderFromCooks(meals) {
        const payload = [];
        meals.forEach((meal) => {
          if (meal.quantity) {
            if (isNaN(meal.quantity)) {
              this.displayErrorModal(
                'Please enter only numbers for meal slots.'
              );
              return;
            }
            if (meal.quantity < 0) {
              this.displayErrorModal('Meal slots cannot be negative.');
              return;
            }
            if (meal.quantity > 0) {
              // confirm meals by calling backend API.
              payload.push({
                cook_id: meal.cook_id,
                number_of_meals: meal.quantity,
              });
            }
          }
        });
        if (payload.length === 0) {
          this.displayErrorModal(
            'Please enter the number of meals you wish to book.'
          );
          return;
        }
        try {
          const res = await this.$store.dispatch('patient/BOOK_MEALS', payload);
          this.showModal = true;
          if (res.status === 200) {
            this.title = res.data.message;
            this.error = false;
            await this.rePopulateMealData();
          } else {
            this.displayErrorModal(
              'Error while booking meals. Please refresh the page and try again.'
            );
          }
        } catch (error) {
          this.displayErrorModal(error.message);
        }
      },
      isNumber(event) {
        if (!/\d/.test(event.key)) return event.preventDefault();
      },
      closeModal() {
        this.error = false;
        this.showModal = false;
        this.showConfirmModal = false;
        this.shouldShowMealsRequestedInput = false;
        this.title = '';
        this.message = '';
        this.mealIdToBeCancelled = '';
      },
      async joinWaitlist() {
        this.shouldShowMealsRequestedInput = true;
        this.showConfirmModal = true;
        this.title = 'Confirm Add to Waitlist';
        this.message =
          'Joining the waitlist will allow a volunteer to reach out to you if any meals become available.';
      },
      async addToWaitlist(mealsRequested) {
        if (mealsRequested <= 0) {
          this.displayErrorModal(
            'Number of meals requested must be greater than 0.'
          );
          return;
        }
        const payload = { meals_requested: mealsRequested };
        this.showConfirmModal = false;
        try {
          const res = await this.$store.dispatch(
            'patient/ADD_TO_WAITLIST',
            payload
          );
          this.showModal = true;
          if (res.status === 200) {
            this.title = 'Successfully joined waitlist!';
          } else {
            this.displayErrorModal(res.data?.message);
          }
        } catch (error) {
          this.displayErrorModal(error.message);
        }
      },
      async cancelMeal() {
        const bookedMeal = this.meals.bookedMeals[this.mealIdToBeCancelled];
        const payload = {
          cook_id: bookedMeal.cook_details.id,
          scheduled_for: bookedMeal.date,
        };
        this.showConfirmModal = false;
        try {
          const res = await this.$store.dispatch(
            'patient/CANCEL_MEAL',
            payload
          );
          if (res.status === 200) {
            this.showModal = true;
            this.title = 'Cancelled meal successfully!';
            delete this.meals.bookedMeals[this.mealIdToBeCancelled];
            this.mealIdToBeCancelled = '';
            await this.rePopulateMealData();
          } else {
            this.displayErrorModal(res.data?.message);
          }
        } catch (error) {
          this.displayErrorModal(error.message);
        }
      },
      confirmCancelMeal(id) {
        this.mealIdToBeCancelled = id;
        this.showConfirmModal = true;
        this.title = 'Confirm Cancel Meal';
        this.message =
          'This will cancel all meals from the cook for the given date.';
      },
      async rePopulateMealData() {
        await this.populateAvailableMealsData();
        await this.populateBookedMealsData();
      },
      displayErrorModal(message) {
        this.showModal = true;
        this.title = 'Error';
        this.error = true;
        this.message = message;
      },
      formatDate(isoDate) {
        return DateTime.fromISO(isoDate)
          .setZone('Asia/Kolkata')
          .setLocale('en-US')
          .toFormat('ccc, LLL dd');
      },
    },
  };
</script>
<style scoped>
  .button-disabled {
    opacity: 0.6;
    pointer-events: none;
    background-color: gray;
  }
</style>

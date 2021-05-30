<template>
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
            <div class="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Unapproved Cooks
              </h3>
            </div>
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
                    Username
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone Number
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Address
                  </th>
                  <th scope="col" class="relative px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <!-- Odd row -->
                <tr
                  :class="cook.id % 2 ? 'bg-gray-50' : 'bg-white'"
                  v-for="cook in cooksFilter()"
                  :key="cook.id"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ cook.first_name }} {{ cook.last_name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ cook.username }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ cook.phone_number }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ cook.building_name }}
                    <br v-if="cook.building_name" />
                    {{ cook.first_line }}
                    <br v-if="cook.first_line" />
                    {{ cook.second_line }}
                    <br v-if="cook.second_line" />
                    {{ cook.state }}
                    <br v-if="cook.state" />
                    {{ cook.city }}
                    <br v-if="cook.city" />
                    {{ cook.zipcode }}
                    <br v-if="cook.zipcode" />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="checkbox"
                      id="checkbox"
                      v-model="cook.checked"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="pt-5">
        <div class="flex justify-end">
          <button
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="approveCooks()"
          >
            Approve Cooks
          </button>
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
  </div>
</template>
<script>
  import SuccessErrorModal from '@/components/SuccessErrorModal.vue';

  export default {
    data() {
      return {
        cooks: [],
        showModal: false,
        error: false,
        title: '',
        message: '',
      };
    },
    mounted() {
      this.getCooks();
    },
    methods: {
      async getCooks() {
        try {
          const { data } = await this.$store.dispatch(
            'admin/GET_UNAPPROVED_COOKS'
          );
          this.cooks = data;
        } catch (error) {
          console.log({ error });
        }
      },
      async approveCooks() {
        let payload = [];
        for (const cook of this.cooks) {
          if (cook.checked) {
            payload.push(cook);
          }
        }
        if (payload.length !== 0) {
          const res = await this.$store.dispatch(
            'admin/APPROVE_COOKS',
            payload
          );
          this.showModal = true;
          if (!res || res.status === 200) {
            this.title = 'Approved Cooks Successfully';
            this.cooks.forEach((cook) => {
              if (cook.checked) {
                cook.approved = true;
                cook.checked = false;
              }
            });
          } else {
            this.title = 'Error';
            this.error = true;
            this.message = res.data ? res.data.message : 'Server Error.';
          }
        } else {
          this.showModal = true;
          this.error = true;
          this.title = 'Error';
          this.message = 'Please select cooks to approve.';
        }
        payload = [];
      },
      closeModal() {
        this.showModal = false;
        this.error = false;
        this.title = '';
        this.message = '';
      },
      cooksFilter() {
        return this.cooks.length === 0
          ? this.cooks
          : this.cooks.filter((cook) => !cook.approved);
      },
    },
    components: {
      SuccessErrorModal,
    },
  };
</script>

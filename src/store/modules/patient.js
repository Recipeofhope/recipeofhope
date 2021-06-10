import patient from '../../api/collections/patient';
import asyncMiddleware from '../../utils/action-handler';

export default {
  namespaced: true,
  actions: {
    async GET_AVAILABLE_MEALS({ commit, dispatch }) {
      const data = await asyncMiddleware(
        async function() {
          return await patient.getAvailableMeals();
        },
        commit,
        dispatch,
        'GET_AVAILABLE_MEALS',
        true
      );
      return data;
    },
    async BOOK_MEALS({ commit, dispatch }, payload) {
      const data = await asyncMiddleware(
        async function() {
          return await patient.bookMeals(payload);
        },
        commit,
        dispatch,
        'BOOK_MEALS',
        true
      );
      return data;
    },
  },
};

import cook from '../../api/collections/cook';
import asyncMiddleware from '../../utils/action-handler';

export default {
  namespaced: true,
  actions: {
    async UPDATE_SCHEDULE({ commit, dispatch }, payload) {
      const data = await asyncMiddleware(
        async function() {
          return await cook.updateCookSchedule(payload);
        },
        commit,
        dispatch,
        'UPDATE_SCHEDULE',
        true
      );
      return data;
    },
    async MARK_MEALS_AS_READY({ commit, dispatch }, payload) {
      const data = await asyncMiddleware(
        async function() {
          return await cook.markMealsAsReady(payload);
        },
        commit,
        dispatch,
        'MARK_MEALS_AS_READY',
        true
      );
      return data;
    },
    async GET_MEALS({ commit, dispatch }) {
      const data = await asyncMiddleware(
        async function() {
          return await cook.getMeals();
        },
        commit,
        dispatch,
        'GET_MEALS',
        true
      );
      return data;
    },
  },
};

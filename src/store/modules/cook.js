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
  },
};

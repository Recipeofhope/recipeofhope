import user from '../../api/collections/user';
import asyncMiddleware from '../../utils/action-handler';

export default {
  namespaced: true,
  actions: {
    async UPDATE_USER_INFO({ commit, dispatch }, payload) {
      const data = await asyncMiddleware(
        async function() {
          return await user.updateUserInfo(payload.id, payload.body);
        },
        commit,
        dispatch,
        'UPDATE_USER_INFO',
        true
      );
      return data;
    },
  },
};

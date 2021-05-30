import admin from '../../api/collections/admin';
import asyncMiddleware from '../../utils/action-handler';

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async GET_UNAPPROVED_COOKS({ commit, dispatch }) {
      const data = await asyncMiddleware(
        async function() {
          const data = await admin.getUnapprovedCooks();
          return data;
        },
        commit,
        dispatch,
        'GET_UNAPPROVED_COOKS',
        true
      );
      return data;
    },
    async APPROVE_COOKS({ commit, dispatch }, payload) {
      const data = await asyncMiddleware(
        async function() {
          return await admin.approveCooks(payload);
        },
        commit,
        dispatch,
        'APPROVE_COOKS',
        true
      );
      return data;
    },
  },
};

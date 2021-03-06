import auth from '../../api/collections/auth';
import asyncMiddleware from '../../utils/action-handler';

export default {
  namespaced: true,
  state: {
    currentUser:
      localStorage.getItem('user') != null
        ? JSON.parse(localStorage.getItem('user'))
        : null,
    currentAddress:
      localStorage.getItem('address') != null
        ? JSON.parse(localStorage.getItem('address'))
        : null,
    currentMeals:
      localStorage.getItem('meals') != null
        ? JSON.parse(localStorage.getItem('meals'))
        : null,
    recentMeals:
      localStorage.getItem('recent_meals') != null
        ? JSON.parse(localStorage.getItem('recent_meals'))
        : null,
    token: '',
    userRole: '',
  },
  getters: {
    currentUser: (state) => state.currentUser,
    currentAddress: (state) => state.currentAddress,
    currentMeals: (state) => state.currentMeals,
    recentMeals: (state) => state.recentMeals,
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload;
    },
    setCurrentMeals(state, payload) {
      state.currentMeals = payload;
    },
    setRecentMeals(state, payload) {
      state.recentMeals = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setUserRole(state, payload) {
      state.userRole = payload;
    },
  },
  actions: {
    async USER_LOGIN({ commit, dispatch }, payload) {
      const data = await asyncMiddleware(
        async function() {
          localStorage.removeItem('token');
          const { data } = await auth.login(payload);
          if (data.auth === true) {
            localStorage.setItem('user', JSON.stringify(data.user));
            if (data.address) {
              localStorage.setItem('address', JSON.stringify(data.address));
            }
            if (data.meals) {
              localStorage.setItem('meals', JSON.stringify(data.meals));
            }
            if (data.recent_meals) {
              localStorage.setItem(
                'recent_meals',
                JSON.stringify(data.recent_meals)
              );
            }
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('role', data.user.user_type);
            commit('setUser', JSON.stringify(data.user));
            commit('setToken', data.access_token);
            commit('setCurrentMeals', data.meals);
            commit('setRecentMeals', data.recent_meals);
          }
          return data;
        },
        commit,
        dispatch,
        'USER_LOGIN',
        true
      );

      return data;
    },
    async LOGOUT({ commit, dispatch }, payload) {
      const data = await asyncMiddleware(
        async function() {
          const { data } = await auth.logout(payload);
          localStorage.removeItem('user');
          localStorage.removeItem('address');
          localStorage.removeItem('meals');
          localStorage.removeItem('recent_meals');
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          return data;
        },
        commit,
        dispatch,
        'LOGOUT',
        true
      );

      return data;
    },
  },
};

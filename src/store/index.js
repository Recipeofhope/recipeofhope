import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    wait: {},
  },
  getters: {
    is(state) {
      return (payload) => {
        return state.wait[payload] || false;
      };
    },
    any(state) {
      for (const key in state.wait) {
        if (state.wait[key]) return true;
      }
    },
  },
  mutations: {
    START_LOADING(state, payload) {
      var obj = {};
      obj[payload] = true;
      state.wait = Object.assign({}, obj);
    },
    STOP_LOADING(state, payload) {
      var obj = {};
      obj[payload] = false;
      state.wait = Object.assign({}, obj);
    },
    NOTIFY_SUCCESS() {},
    NOTIFY_ERROR() {},
  },
  actions: {
    handleError({ dispatch, commit }, errorObj) {
      const response = errorObj.error.response;
      const options = {
        title: '',
        type: '',
        message: '',
      };
      if (response) {
        const status = response.status;
        if (status === 401) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('screen');
        } else if (status === 413) {
          options.title = '';
          options.type = 'error';
          options.message = 'Request Entity Too Large';
        } else {
          options.title = 'Unable to validate!';
          options.type = 'error';
          options.message = response.data.message;
        }
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('screen');
      }
      // dispatch('snackbar/SHOW', options)
    },

    handleSuccess({ dispatch, commit }, obj) {
      const options = {
        title: '',
        type: '',
        message: '',
      };

      if (obj.toaster) {
        const res = obj.res;
        if (res.result) {
          options.title = 'Success!';
          options.type = 'success';
          options.message = res.message;
        } else if (res.status_code === 401) {
          options.title = 'Whoops!';
          options.type = 'error';
          options.message = res.message;
        } else if (res.status_code === 422 || res.status_code === 403) {
          options.title = 'Unable to validate!';
          options.type = 'error';
          options.message = res.display_message;
          options.details = res.error.details;
        } else {
          options.title = 'Whoops!';
          options.type = 'error';
          options.message = 'Something went wrong, Please try again later';
        }
        // dispatch('snackbar/SHOW', options)
      }
    },

    clearUserData() {},

    start({ commit }, payload) {
      commit('START_LOADING', payload);
    },
    end({ commit }, payload) {
      commit('STOP_LOADING', payload);
    },
  },
  modules: {
    auth,
  },
});

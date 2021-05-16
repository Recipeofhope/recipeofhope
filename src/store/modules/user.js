import axios from 'axios';
import _get from 'lodash/get';
import Toast from '@/components/Toast';

const EMPTY_STRING = '';
// const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

const state = {
  user: EMPTY_OBJECT,
  // address: EMPTY_OBJECT,
  tokens: EMPTY_OBJECT,
};

const getDefaultHeaders = () => {
  return {
    headers: {
      'x-access-token': _get(state, 'tokens.access_token', EMPTY_STRING),
    },
  };
};

const getters = {
  user: (state) => state.user,
  address: (state) => state.address,
  tokens: (state) => state.tokens,
};

const actions = {
  async registerUser({ commit }, payload) {
    try {
      const response = await axios.post('api/user', payload);
      commit('setRegisteredUser', response.data);
    } catch (error) {
      Toast.error(error);
    }
  },

  async loginUser({ commit }, payload) {
    try {
      const response = await axios.post('api/user/login', payload);
      commit('setLoginUser', response?.data);
    } catch (error) {
      Toast.error(error);
    }
  },

  async fetchUserDetails({ commit }, payload) {
    const response = await axios.post(
      'api/user/user-details',
      payload,
      getDefaultHeaders()
    );
    commit('setUser', response.data);
  },
};

const mutations = {
  setRegisteredUser: (state, data) => {
    state.user = {
      ..._get(data, 'user', EMPTY_OBJECT),
      address: _get(data, 'address', EMPTY_OBJECT),
    };
    state.tokens = {
      accessToken: _get(data, 'accessToken', EMPTY_STRING),
      refreshToken: _get(data, 'refreshToken', EMPTY_STRING),
    };
  },
  setLoginUser: (state, tokens) => (state.tokens = tokens),
  setUser: (state, user) => (state.user = user),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

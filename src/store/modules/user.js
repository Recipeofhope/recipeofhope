import axios from 'axios';
import _get from 'lodash/get';

const EMPTY_STRING = '';
// const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

const state = {
  user: EMPTY_OBJECT,
  address: EMPTY_OBJECT,
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
  async registerUser({ commit }, obj) {
    const response = await axios.post('api/user', obj);
    commit('setRegisteredUser', response.data);
  },

  async loginUser({ commit }, obj) {
    const response = await axios.post('api/user/login', obj);
    commit('setLoginUser', response.data);
  },

  async fetchUserDetails({ commit }, obj) {
    const response = await axios.post(
      'api/user/user-details',
      obj,
      getDefaultHeaders()
    );
    commit('setUser', response.data);
  },
};

const mutations = {
  setRegisteredUser: (state, data) => {
    state.user = _get(data, 'user', EMPTY_OBJECT);
    state.address = _get(data, 'address', EMPTY_OBJECT);
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

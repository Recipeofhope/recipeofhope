import axios from 'axios';
import _get from 'lodash/get';
import Toast from '@/components/Toast';
import { ACCESS_TOKEN, USER_KEY, REFRESH_TOKEN } from '../../constants/app.constants';

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
      'x-access-token': _get(state, 'tokens.access_token') || localStorage.getItem(ACCESS_TOKEN),
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
      commit('setLoginAndRegisteredUser', response.data);
    } catch (error) {
      Toast.error(error);
    }
  },

  async loginUser({ commit }, payload) {
    try {
      const response = await axios.post('api/user/login', payload);
      commit('setLoginAndRegisteredUser', response?.data);
    } catch (error) {
      Toast.error(error);
    }
  },

  async fetchUserDetails({ commit }) {
    const response = await axios.get(
      'api/user/user-details',
      getDefaultHeaders()
    );
    commit('setUser', response.data);
  },
};

const mutations = {
  setLoginAndRegisteredUser: (state, data) => {
    state.user = {
      user: _get(data, 'user', EMPTY_OBJECT),
      address: _get(data, 'address', EMPTY_OBJECT),
      meals: _get(data, 'meals', EMPTY_OBJECT),
    };
    state.tokens = {
      accessToken: _get(data, 'access_token', EMPTY_STRING),
      refreshToken: _get(data, 'refresh_token', EMPTY_STRING),
    };
    localStorage.setItem(USER_KEY, JSON.stringify(_get(data, 'user')));
    localStorage.setItem(ACCESS_TOKEN, _get(data, ACCESS_TOKEN))
    localStorage.setItem(REFRESH_TOKEN, _get(data, REFRESH_TOKEN))
  },
  setUser: (state, user) => (state.user = user),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

import auth from '../../api/collections/auth'
import asyncMiddleware from '../../utils/action-handler'

export default {
  namespaced: true,
  state: {
    currentUser: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null,
    token: '',
    userRole: ''
  },
  getters: {
    currentUser: state => state.currentUser
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload
    },
    setToken(state, payload) {
      state.token = payload
    },
    setUserRole(state, payload) {
      state.userRole = payload
    }
  },
  actions: {
    async 'USER_LOGIN'({ commit, dispatch }, payload) {
      const data = await asyncMiddleware(async function() {
        localStorage.removeItem('token')
        const { data } = await auth.login(payload)
        if (data.auth === true) {
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('token', data.access_token)
          localStorage.setItem('role', data.user.user_type)
          commit('setUser', JSON.stringify(data.user))
          commit('setToken', data.access_token)
        }
        return data
      }, commit, dispatch, 'USER_LOGIN', true)

      return data
    },
    async LOGOUT({ commit, dispatch }, payload) {
      const data = await asyncMiddleware(async function() {
        const { data } = await auth.logout(payload)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        return data
      }, commit, dispatch, 'LOGOUT', true)

      return data
    }
  }
}
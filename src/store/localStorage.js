import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
Vue.use(Vuex)
export const localStorage = new Vuex.Store({
  state: {
    wait: {}
  },
  getters: {
    
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
    auth,
  }
})

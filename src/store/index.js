import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authData: {
      accessToken: "",
      refreshToken: "",
    },
    loginStatus:false,
    user:{
      username: "",
      userType:"",
    }
  },
  mutations: {
    saveTokenData(state, data) {
      // TODO: delete this console.log since it contains senstivie info. 
      // I added this only for dev purposes
      console.log("index.js: ", state, "\n", data)
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("userType", data.user.user_type)
  
      state.authData.accessToken = data.access_token
      state.authData.refreshToken = data.refresh_token
      state.user.username = data.user.username
      state.user.userType = data.user.user_type
      state.loginStatus = true
    },
  }
});
 
export default store;
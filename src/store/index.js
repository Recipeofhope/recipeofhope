import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authData: {
      accessToken: "",
      refreshToken: "",
    },
    loginStatus:"",
    user:{
      username: "",
      userType:"",
    }
  },
  mutations: {
    saveTokenData(state, data) {
      // TODO: delete this console.log since it contains senstivie info. 
      // I added this only for dev purposes
      console.log("here: ", state, "\n", data)
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("userType", data.user.user_type)
  
      const newTokenData = {
        authData:{
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        },
        user:{
          username: data.user.username,
          userType: data.user.user_type,
        },
        loginStatus: true,
      };
      state.authData = newTokenData;
    },
  }
});
 
export default store;
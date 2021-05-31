import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import users from './users';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: ""
  },

  modules: {
    auth,
    users
  }
})
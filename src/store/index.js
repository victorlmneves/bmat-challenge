import Vue from 'vue'
import Vuex from 'vuex'

import sounds from './modules/sounds'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    sounds
  }
})

export default store

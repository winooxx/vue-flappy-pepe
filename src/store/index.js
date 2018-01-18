import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    stage: {
      Splash: 0,
      Game: 1,
      Score: 2
    },
    currentState: 0,
    event: 'touchstart',
    score: 0
  }
})

export default store

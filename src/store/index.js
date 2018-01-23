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
    event: 'touchstart'
  },
  mutations: {
    stageChange (state, stage) {
      if (stage === 'Game') {
        state.currentState = state.stage.Game
      } else if (stage === 'Splash') {
        state.currentState = state.stage.Splash
      }
    },
    actionTrigger (state, action) {
      if (action === 'pc') {
        state.event = 'mousedown'
      } else if (action === 'mobile') {
        state.event = 'touchstart'
      }
    }
  }
})

export default store

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
    score: 0,
    best: 0
  },
  mutations: {
    onpress (state) {
      switch (state.currentState) {
        case state.stage.Splash:
          state.currentState = state.stage.Game
          break
        case state.stage.Game:
          break
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

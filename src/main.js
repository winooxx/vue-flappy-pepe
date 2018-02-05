// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import Canvas from './components/Canvas.vue'
import Score from './components/Score.vue'
import AV from 'leancloud-storage'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)
/* eslint-disable no-new */
const APP_ID = 'test'
const APP_KEY = 'test'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

const routes = [
  { path: '/game', component: Canvas },
  { path: '/score', component: Score }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

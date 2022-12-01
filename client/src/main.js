import Vue from 'vue'
import App from './App.vue'
import VueObserveVisibility from 'vue-observe-visibility'

import router from './router'
import store from './vuex.js'

import './axios.js'

Vue.use(VueObserveVisibility)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(Vuesax, {
  // options here
})

var vm = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

window.vm = vm;
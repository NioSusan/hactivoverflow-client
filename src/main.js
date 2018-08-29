import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import GSignInButton from 'vue-google-signin-button'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.get['Accepts'] = 'application/json'

Vue.use(GSignInButton)

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

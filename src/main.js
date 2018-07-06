import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import { store } from './store/store.js'
//en caso de querer agregar o cambiar una ruta, agregarla dentro de este archivo plz
import { routes } from './routes.js'


Vue.use(VueRouter)
Vue.use(Vuetify)

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  store:store,
  router: router,
  el: '#app',
  render: h => h(App)
})

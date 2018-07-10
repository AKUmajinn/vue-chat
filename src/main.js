import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
const fb = require('./firebase/firebase.config.js')
import { store } from './store/store.js'

//en caso de querer agregar o cambiar una ruta, agregarla dentro de este archivo pls
import { routes } from './routes.js'


Vue.use(VueRouter)
Vue.use(Vuetify)

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

// handle page reloads
let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
})

/*
new Vue({
  firebaseApp: firebaseApp,
  store:store,
  router: router,
  el: '#app',
  render: h => h(App),
  mounted(){
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('conectado:', user);
      } else {
        console.log('NO conectado');
      }
    });
  }
})
*/

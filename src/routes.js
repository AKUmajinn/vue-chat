import Login from './components/LoginComponent.vue'
import Chat from './components/ChatComponent.vue'

//no olvidar de descomentar la ruta '*' para redirigir cualquier ruta que no exxista al login
export const routes = [
  {
    path: '*',
    component: Login
  },
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/chat',
    component: Chat,
    name: 'chat',
  },

]

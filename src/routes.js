import Welcome from './components/WelcomeComponent.vue'
import Chat from './components/ChatComponent.vue'


export const routes = [
  {
    path: '/',
    component: Welcome,
    name: 'welcome'
  },
  {
    path: '/chat',
    component: Chat,
    name: 'chat',
  }

]

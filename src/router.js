import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login.vue'
import Chat from './pages/Chat.vue'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'chat',
      component: Chat,
      beforeEnter: (to, from, next) => {
        if(!firebase.auth().currentUser){
          next('/login')
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ]
})

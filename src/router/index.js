import Vue from 'vue'
import Router from 'vue-router'
import Me from '@/components/Me'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Logout from '@/components/Logout'


Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'Me',
        component: Me
    },
    {
      path: '/login',
      name: 'Log in',
      component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/logout',
        name: 'Log out',
        component: Logout
    }
  ]
})

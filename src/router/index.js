import Vue from 'vue'
import Router from 'vue-router'
import Me from '@/components/Me'
import Report from '@/components/Report'
import Login from '@/components/Login'
import AddReport from '@/components/AddReport'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'Me',
        component: Me
    },
    {
        path: '/reports/:kmom',
        name: 'Redovisning',
        component: Report
    },
    {
      path: '/login',
      name: 'Log in',
      component: Login
    },
    {
        path: '/report',
        name: 'Report',
        component: AddReport
    }
  ]
})

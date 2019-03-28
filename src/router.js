import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import LogIn from '@/components/LogIn'
import LogOut from '@/components/LogOut'
import Contact from '@/components/Contact'
import Info from '@/components/Info'
import Blog from '@/components/Blog'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/login',
      component: LogIn
    },
    {
      path: '/logout',
      component: LogOut
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/info',
      component: Info
    },
    {
      path: '/dev',
      component: Blog
    }
  ]
})

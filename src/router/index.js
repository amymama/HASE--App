import Vue from 'vue'
import VueRouter from 'vue-router'
import { UserLayout, BasicLayout } from '@/layouts'
import pmtRoutes from './pmtRoutes'
import shopRoutes from './shopRoutes'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/',
    component: BasicLayout,
    meta: { title: 'Home' },
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: { title: 'Home', module: 'Basic', keepAlive: false }
      },
      {
        path: '/pmt',
        component: () => import('@/views/pmt'),
        meta: { title: 'Pmt', module: 'PMT', keepAlive: false },
        children: pmtRoutes
      },
      {
        path: '/retailSubmit',
        name: 'retailSubmit',
        component: () => import('@/views/pmt/retailSubmit'),
        meta: { title: 'Retail', module: 'PMT', keepAlive: false }
      },
      {
        path: '/shop',
        component: () => import('@/views/shop'),
        meta: { title: 'Shop', module: 'HiShop', keepAlive: false },
        children: shopRoutes
      },
      {
        path: '/me',
        name: 'Me',
        component: () => import('@/views/me'),
        meta: { title: 'Me', module: 'Basic', keepAlive: false }
      }
    ]
  },
  {
    path: '/notice',
    name: 'Notice',
    component: () => import('@/views/notice'),
    meta: { title: 'Notice', keepAlive: false }
  },
  // USER
  {
    path: '/user',
    redirect: '/user/login',
    component: UserLayout,
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/user/Login'),
        meta: { title: 'Login', keepAlive: false }
      },
      // USER REGISTER
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/user/Register'),
        meta: { title: 'Register', keepAlive: false }
      },
      // USER FORGETPASSWORD
      {
        path: 'forgetPassword',
        name: 'ForgetPassword',
        component: () => import('@/views/user/ForgetPassword'),
        meta: { title: 'Forget Password', keepAlive: false }
      }
    ]
  },
  {
    path: '/webview',
    name: 'Webview',
    component: () => import('@/views/webview'),
    meta: { title: 'Webview', keepAlive: false }
  },
]

export default new VueRouter({
  mode: 'hash',
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

import Vue from 'vue'
import VueRouter from 'vue-router'
import { UserLayout, BasicLayout } from '@/layouts'
import shopRoutes from './shopRoutes'
import menuRoutes from './menuRoutes'

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
        path: '/menu',
        // name: 'Menu',
        component: () => import('@/views/menu'),
        meta: { title: 'Menu', module: 'Basic', keepAlive: false },
        children:menuRoutes
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

// SHOP ROUTES
export default [
  {
    path: '',
    name: 'MenuHome',
    component: () => import('@/views/menu/menuHome'),
    meta: { title: 'menu', module: 'Basic', keepAlive: false }
  },
  {
    path: '/zso',
    name: 'Zso',
    component: () => import('@/views/menu/zso'),
    meta: { title: 'ZSO', module: 'Basic', keepAlive: true }
  },
  {
    path: '/zso/cart',
    name: 'Cart',
    component: () => import('@/views/menu/zso/components/cart'),
    meta: { title: 'Cart', module: 'Basic', keepAlive: false }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/menu/order'),
    meta: { title: 'ORDER', module: 'Basic', keepAlive: false }
  },
  {
    path: '/orderConfirm',
    name: 'orderConfirm',
    component: () => import('@/views/menu/zso/components/orderConfirm'),
    meta: { title: '', module: 'Basic', keepAlive: false }
  },
  {
    path: '/zsoDetail',
    name: 'zsoDetail',
    component: () => import('@/views/menu/zso/components/zsoDetail'),
    meta: { title: '', module: 'Basic', keepAlive: true }
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: () => import('@/views/menu/order/components/orderDetail'),
    meta: { title: '', module: 'Basic', keepAlive: false }
  },
]

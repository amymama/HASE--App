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
    meta: { title: 'ZSO', module: 'Basic', keepAlive: false }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/menu/order'),
    meta: { title: 'ORDER', module: 'Basic', keepAlive: false }
  },
]

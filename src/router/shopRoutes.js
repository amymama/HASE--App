// SHOP ROUTES
export default [
  {
    path: '',
    name: 'ShopHome',
    component: () => import('@/views/shop/home'),
    meta: { title: 'HI-SHOP', module: 'HiShop', keepAlive: false }
  },
  {
    path: 'visitPlan',
    name: 'VisitPlan',
    component: () => import('@/views/shop/visitPlan'),
    meta: { title: 'Visit Plan', module: 'HiShop', keepAlive: false }
  },
  {
    path: 'newShop',
    name: 'NewShop',
    component: () => import('@/views/shop/newShop'),
    meta: { title: 'New Shop', module: 'HiShop', keepAlive: false }
  },
  {
    path: 'newShopList',
    name: 'NewShopList',
    component: () => import('@/views/shop/newShop/NewShopList'),
    meta: { title: 'New Shop List', module: 'HiShop', keepAlive: false }
  },
  {
    path: 'approveShop',
    name: 'ApproveShop',
    component: () => import('@/views/shop/approveShop'),
    meta: { title: 'Approve Shop List', module: 'HiShop', keepAlive: false }
  },
  {
    path: 'shopVisit',
    name: 'ShopVisit',
    component: () => import('@/views/shop/shopVisit'),
    meta: { title: 'Shop Visit', module: 'HiShop', keepAlive: false }
  },
  {
    path: 'shopCard',
    name: 'ShopCard',
    component: () => import('@/views/shop/shopCard'),
    meta: { title: 'Shop Card', module: 'HiShop', keepAlive: false }
  },
  {
    path: 'visitHistory',
    name: 'VisitHistory',
    component: () => import('@/views/shop/shopVisit/VisitHistory'),
    meta: { title: 'Visit History', module: 'HiShop', keepAlive: false }
  },
  {
    path: 'myVisitHistory',
    name: 'MyVisitHistory',
    component: () => import('@/views/shop/shopVisit/MyVisitHistory'),
    meta: { title: 'My Visit History', module: 'HiShop', keepAlive: false }
  },
  {
    path: 'shopVisitHistoryDetail',
    name: 'ShopVisitHistoryDetail',
    component: () => import('@/views/shop/shopVisit/ShopVisitHistoryDetail'),
    meta: { title: 'Shop Visit History Detail', module: 'HiShop', keepAlive: false }
  },
  {
    path: 'shopMasterData',
    name: 'ShopMasterData',
    component: () => import('@/views/shop/newShop/ShopMasterData'),
    meta: { title: 'Shop Master Data', module: 'HiShop', keepAlive: false }
  },
  {
    path: 'shopVisitStep1',
    name: 'ShopVisitStep1',
    component: () => import('@/views/shop/shopVisit/Step1'),
    meta: { title: 'Inspect FA', module: 'HiShop', keepAlive: false }
  },
  {
    path: 'shopVisitStep2',
    name: 'ShopVisitStep2',
    component: () => import('@/views/shop/shopVisit/Step2'),
    meta: { title: 'Display Sample', module: 'HiShop', keepAlive: false }
  },
  {
    path: 'shopVisitStep3',
    name: 'ShopVisitStep3',
    component: () => import('@/views/shop/shopVisit/Step3'),
    meta: { title: 'Competitor QTY', module: 'HiShop', keepAlive: false }
  },
  {
    path: 'fa',
    name: 'MyFA',
    component: () => import('@/views/shop/fa/FAList'),
    redirect: '/shop/fa/myNewFa',
    children: [{
      path: 'myNewFa',
      name: 'myNewFa',
      component: () => import('@/views/shop/fa/MyNewFa'),
      meta: { title: 'My New FA', module: 'HiShop', keepAlive: false }
    }, {
      path: 'faLatest',
      name: 'faLatest',
      component: () => import('@/views/shop/fa/FaLatest'),
      meta: { title: 'FA Latest', module: 'HiShop', keepAlive: false }
    }],
    meta: { title: 'New FA', keepAlive: false }
  },
  {
    path: 'newFA',
    name: 'newFA',
    component: () => import('@/views/shop/fa/NewFA'),
    meta: { title: 'New FA', module: 'HiShop', keepAlive: false },
    props: route => ({ facode: route.query.facode, assetFAId: route.query.id, type: route.query.type })
  },
  {
    path: 'posm',
    name: 'posm',
    component: () => import('@/views/shop/posm/inout/index'),
    redirect: '/shop/posm/record',
    children: [
      {
        path: 'record',
        name: 'PosmRecord',
        meta: {
          title: 'POSM IN/OUT History',
          module: 'HiShop'
        },
        component: () => import('@/views/shop/posm/inout/POSMRecord')
      }, {
        path: 'detail',
        name: 'PosmHistoryDetail',
        meta: {
          title: 'POSM IN/OUT History',
          module: 'HiShop'
        },
        props: route => ({ id: route.query.id }),
        component: () => import('@/views/shop/posm/inout/POSMHistoryDetail')
      }, {
        path: 'list',
        name: 'PosmList',
        meta: {
          title: 'POSM List',
          module: 'HiShop'
        },
        component: () => import('@/views/shop/posm/inout/POSMList')
      }, {
        path: 'inOut',
        name: 'PosmInOut',
        meta: {
          title: 'IN/OUT',
          module: 'HiShop'
        },
        props: route => ({ shopItem: route.query }),
        component: () => import('@/views/shop/posm/inout/POSMInOut')
      }
    ]
  },
  {
    path: 'forecast',
    name: 'forecast',
    component: () => import('@/views/shop/posm/forecast/index'),
    redirect: '/shop/forecast/record',
    children: [
      {
        path: 'record',
        name: 'ForecastRecord',
        meta: {
          title: 'POSM Forecast History',
          module: 'HiShop'
        },
        component: () => import('@/views/shop/posm/forecast/POSMRecord')
      }, {
        path: 'detail',
        name: 'ForecastHistoryDetail',
        meta: {
          title: 'POSM Forecast History',
          module: 'HiShop'
        },
        props: route => ({ id: route.query.id }),
        component: () => import('@/views/shop/posm/forecast/POSMHistoryDetail')
      }, {
        path: 'list',
        name: 'ForecastList',
        meta: {
          title: 'POSM List',
          module: 'HiShop'
        },
        component: () => import('@/views/shop/posm/forecast/POSMList')
      }, {
        path: 'inOut',
        name: 'ForecastInOut',
        meta: {
          title: 'Forecast',
          module: 'HiShop'
        },
        props: route => ({ shopItem: route.query }),
        component: () => import('@/views/shop/posm/forecast/POSMInOut')
      }
    ]
  },
  {
    path: 'product',
    name: 'Product',
    component: () => import('@/views/shop/product/index'),
    redirect: '/shop/product/list',
    children: [
      {
        path: 'list',
        name: 'ProductList',
        props: route => ({
          assetposmid: route.query.assetposmid
        }),
        component: () => import('@/views/shop/product/ProductList'),
        meta: {
          title: 'Product',
          module: 'HiShop'
        }
      }, {
        path: 'detail',
        name: 'ProductDetail',
        props: route => ({
          modelId: route.query.id,
          model: route.query.model
        }),
        component: () => import('@/views/shop/product/ProductDetail'),
        meta: {
          title: 'Product Detail',
          module: 'HiShop'
        }
      }
    ]
  },
  {
    path: 'visitPlan',
    name: 'visitPlan',
    component: () => import('@/views/shop/visitPlan'),
    redirect: '/shop/visitPlan/list',
    children: [
      {
        path: 'list',
        name: 'visitPlanList',
        component: () => import('@/views/shop/visitPlan/PlanList'),
        meta: {
          title: 'New Plan',
          module: 'HiShop'
        }
      }, {
        path: 'detail',
        name: 'visitPlanDetail',  // 详情页表格不可编辑
        component: () => import('@/views/shop/visitPlan/PlanDetail'),
        meta: {
          title: 'Visit Plan',
          module: 'HiShop'
        },
        props: (route) => ({
          code: route.query.code,
          createTime: route.query.createTime,
          createname: route.query.createname,
          createRole: route.query.createRole
        })
      }, {
        path: 'update',
        name: 'visitPlanUpdate', // 详情页表格不可编辑
        component: () => import('@/views/shop/visitPlan/PlanDetail'),
        meta: {
          title: 'Visit Plan',
          module: 'HiShop'
        },
        props: (route) => ({
          createTime: route.query.createTime,
        })
      },
      {
        path: 'approvePlan',
        name: 'ApprovePlan',
        component: () => import('@/views/shop/visitPlan/PlanApproval'),
        meta: {
          title: 'Approve Plan',
          module: 'HiShop'
        }
      },
    ]
  },
  {
    path: 'promotion',
    name: 'promotion',
    component: () => import('@/views/shop/promotion'),
    redirect: '/shop/promotion/list',
    children: [
      {
        path: 'list',
        name: 'promotionList',
        component: () => import('@/views/shop/promotion/PromotionList'),
        meta: {
          title: 'Shop Promotion',
          module: 'HiShop'
        }
      },
      {
        path: 'add',
        name: 'newPromotion',
        component: () => import('@/views/shop/promotion/PromotionAdd'),
        meta: {
          title: 'New Promotion',
          module: 'HiShop'
        },
        props: (route) => ({ type: route.query.type, id: route.query.id })
      }
    ]
  }
]

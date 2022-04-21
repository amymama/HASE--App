import router from './router/index'
import store from './store/index'
import getPageTitle from '@/utils/get-page-title'
import getUserMonitor from '@/utils/getUserMonitor'
import appUpdate from '@/utils/updateApp'
import waterMark from '@/utils/watermark'

const whiteList = ['Login', 'Register', 'ForgetPassword', 'Webview']
const loginRoutePath = '/user/login'

// 全局路由拦截器
router.beforeEach(async (to, from, next) => {
  // 设置标题
  document.title = getPageTitle(to.meta.title)
  // 升级APP
  appUpdate();
  // 用户访问记录
  const { token, auths, userInfo } = store.getters
  if (userInfo && userInfo.username) {
    getUserMonitor({
      country: 'HASE',
      terminal: 'App',
      visitnode: to.name || '',
      visitname: userInfo.realname || '',
      visitcode: userInfo.username,
      visitmodule: to.meta.module || ''
    })
  }
  if (token) {
    /* has token*/
    if (to.path === loginRoutePath) {
      next({ path: '/', replace: true })
    } else {
      if (auths.length == 0) {
        store.dispatch('user/GetInfo').then(res => {
          const { success } = res
          if (success) {
            waterMark.set(store.getters.userInfo.username)
            next()
          } else {
            store.dispatch('user/Logout').then(() => {
              next({ path: loginRoutePath })
            })
          }
        }).catch(() => {
          store.dispatch('user/Logout').then(() => {
            next({ path: loginRoutePath })
          })
        })
      } else {
        waterMark.set(userInfo.username)
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.name) !== -1) {
      next()
    } else {
      next({ path: loginRoutePath, replace: true })
    }
  }
})

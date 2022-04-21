// 引入路由 和 静态路由
import router, { constantRoutes } from '../../router/index'
const state = {
  routerType: '',
  meunList: []
}

const mutations = {
  SET_ROUTER_TYPE(state, type) {
    state.routerType = type
  },
  SET_ROUTER_MENULIST(state, list) {
    const array = constantRoutes.concat(list)
    state.meunList = array
    router.options.routes = array
    router.addRoutes(list)
  }
}

const actions = {
  setMenuList({ commit, state }) {
    // 接收返回来的 路由数组
    return new Promise((resolve, reject) => {
      commit('SET_ROUTER_TYPE', '')
      commit('SET_ROUTER_MENULIST', '')
      resolve('')
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
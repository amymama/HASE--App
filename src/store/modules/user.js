import { postLogin, getUserinfoByToken } from '@/api/user'

const state = {
  token: '',
  avatar: '',
  roles: [],
  userInfo: [],
  userShopInfo: [],
  auths: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INFO: (state, info) => {
    state.userInfo = info
  },
  SET_SHOP_INFO: (state, info) => {
    state.userShopInfo = info
  },
  SET_AUTHS: (state, auths) => {
    state.auths = auths
  }
}
const actions = {
  // login
  Login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      postLogin(userInfo).then((res) => {
        const { success, data } = res
        if (success && data.CurrentPage !=2) {
          commit('SET_TOKEN', data.Items.Access_token)
        }
        resolve(res)
      }).catch(() => {
        reject()
      })
    })
  },
  // Get User Info
  GetInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserinfoByToken().then(res => {
        const { success, data } = res
        if (success) {
          const { user_info, user_role, user_auth, user_shopinfo } = data.Items
          commit('SET_AVATAR', user_info.avatar)
          commit('SET_INFO', user_info)
          commit('SET_ROLES', user_role)
          commit('SET_AUTHS', user_auth)
          commit('SET_SHOP_INFO', user_shopinfo)
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // logout
  Logout() {
    return new Promise((resolve) => {
      localStorage.clear()
      // window.location.reload()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

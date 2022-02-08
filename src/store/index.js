import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import user from './modules/user'
import permission from './modules/permission'
import app from './modules/app'
import history from './modules/history'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    position_code: '',
    selectShopId: '',
  },
  modules: {
    user,
    permission,
    app,
    history
  },
  getters,
  plugins: [createPersistedState()]
})

export default store
const state = {
  lang: 'id'
}

const mutations = {
  SET_LANG: (state, lang) => {
    state.lang = lang
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

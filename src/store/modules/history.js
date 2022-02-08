const state = {
  shop: [],
}

const mutations = {
  SET_HISTORY: (state, data) => {
    switch(data.type) {
      case 'shop':
        if(state.shop.indexOf(data.value) === -1) {
          state.shop.push(data.value)
        }
        break;
    }
  },
  CLEAR_HISTORY: (state, data) => {
    switch(data.type) {
      case 'shop':
        state.shop = []
        break;
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

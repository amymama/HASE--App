const state = {
    orderConfirmData: {},
}
const mutations = {
    orderConfirmData: (state, data) => {
        state.orderConfirmData = data
    },
}
export default {
    namespaced: true,
    state,
    mutations
}
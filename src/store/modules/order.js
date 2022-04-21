const state = {
    orderConfirmData: {},
    productDetail:{},
    zsoselectedLocation:{},
    orderDetailData:{}
}
const mutations = {
    orderConfirmData: (state, data) => {
        state.orderConfirmData = data
    },
    productDetail:(state,data)=>{
        state.productDetail=data
    },
    orderDetailData:(state,data)=>{
        state.orderDetailData=data
    },
    zsoselectedLocation:(state,data)=>{
        state.zsoselectedLocation=data
    }
}
export default {
    namespaced: true,
    state,
    mutations
}
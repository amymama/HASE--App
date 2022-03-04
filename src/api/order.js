import http from '@/utils/request'

const api = {
    orderGetDealerList: '/api/OrderProduct/GetDealerList',
    zsoGetProductList: 'api/OrderProduct/GetProductList'
}
export function orderGetDealerList(params) {
    return http.post(api.orderGetDealerList, { params })
}
export function zsoGetProductList(data) {
    return http.post(api.zsoGetProductList, { data })
}

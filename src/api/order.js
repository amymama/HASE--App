import http from '@/utils/request'

const api = {
    orderGetDealerList: '/api/OrderProduct/GetDealerList',
    zsoGetProductList: 'api/OrderProduct/GetProductList',
    GetDealerList:"api/OrderProduct/GetDealerList",//DealerName
    GetPartnerListByDealer:'api/OrderCart/GetPartnerListByDealer',//ShipTo
    GetCategoryList:'api/OrderProduct/GetCategoryList',//图标分类
    GetStorageLocationList:'api/OrderProduct/GetStorageLocationList',
    SaveUserSearch:"api/OrderProduct/SaveUserSearch",
    GetUserSearchList:'api/OrderProduct/GetUserSearchList',
    GetCartCount:'api/OrderCart/GetCartCount',
    OrderCartAddCart:'api/OrderCart/AddCart'
}
export function orderGetDealerList(params) {
    return http.post(api.orderGetDealerList,  params )
}
export function zsoGetProductList(data) {
    return http.post(api.zsoGetProductList,  data )
}
export function GetDealerList(data) {
    return http.post(api.GetDealerList, data )
}
export function GetPartnerListByDealer(data) {
    return http.post(api.GetPartnerListByDealer,  data )
}
export function GetCategoryList(data) {
    return http.post(api.GetCategoryList, data)
}
export function GetStorageLocationList() {
    return http.post(api.GetStorageLocationList)
}
export function SaveUserSearch(data) {
    return http.post(api.SaveUserSearch,data)
}

export function GetUserSearchList(data) {
    return http.post(api.GetUserSearchList,data)
}
export function GetCartCount(data) {
    return http.post(api.GetCartCount,data)
}
export function OrderCartAddCart(data) {
    return http.post(api.OrderCartAddCart,data)
}
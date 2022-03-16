import http from '@/utils/request'

const api = {
    orderGetDealerList: '/api/OrderProduct/GetDealerList',
    zsoGetProductList: 'api/OrderProduct/GetProductList',
    GetDealerList: "api/OrderProduct/GetDealerList",//DealerName
    GetPartnerListByDealer: 'api/OrderCart/GetPartnerListByDealer',//ShipTo
    GetCategoryList: 'api/OrderProduct/GetCategoryList',//图标分类
    GetStorageLocationList: 'api/OrderProduct/GetStorageLocationList',
    SaveUserSearch: "api/OrderProduct/SaveUserSearch",
    GetUserSearchList: 'api/OrderProduct/GetUserSearchList',
    GetCartCount: 'api/OrderCart/GetCartCount',
    OrderCartAddCart: 'api/OrderCart/AddCart',
    GetProductDetail: 'api/OrderProduct/GetProductDetail',
    GetCartListByDealer: 'api/OrderCart/GetCartListByDealer',
    UpdateCartProductCounts: 'api/OrderCart/UpdateCartProductCounts',
    DeleteCart: "api/OrderCart/DeleteCart",
    ReSubmitOrder: ' api/Order/ReSubmitOrder',

    GetDearlerCreditLimitFromSAP: 'api/OrderProduct/GetDearlerCreditLimitFromSAP',
    // GetPartnerListByDealer: 'api/OrderCart/GetPartnerListByDealer',
    GetLogisticsList: 'api/OrderProduct/GetLogisticsList',
    SubmitOrder: 'api/Order/SubmitOrder'
}
export function orderGetDealerList(params) {
    return http.post(api.orderGetDealerList, params)
}
export function zsoGetProductList(data) {
    return http.post(api.zsoGetProductList, data)
}
export function GetDealerList(data) {
    return http.post(api.GetDealerList, data)
}
export function GetPartnerListByDealer(data) {
    return http.post(api.GetPartnerListByDealer, data)
}
export function GetCategoryList(data) {
    return http.post(api.GetCategoryList, data)
}
export function GetStorageLocationList() {
    return http.post(api.GetStorageLocationList)
}
export function SaveUserSearch(data) {
    return http.post(api.SaveUserSearch, data)
}

export function GetUserSearchList(data) {
    return http.post(api.GetUserSearchList, data)
}
export function GetCartCount(data) {
    return http.post(api.GetCartCount, data)
}
export function OrderCartAddCart(data) {
    return http.post(api.OrderCartAddCart, data)
}

export function GetProductDetail(data) {
    return http.post(api.GetProductDetail, data)
}
export function GetCartListByDealer(data) {
    return http.post(api.GetCartListByDealer, data)
}

export function UpdateCartProductCounts(data) {
    return http.post(api.UpdateCartProductCounts, data)
}

export function DeleteCart(data) {
    return http.post(api.DeleteCart, data)
}

export function ReSubmitOrder(data) {
    return http.post(api.ReSubmitOrder, data)
}

export function GetDearlerCreditLimitFrom(data) {
    return http.post(api.GetDearlerCreditLimitFromSAP, data)
}

// export function GetPartnerListByDealer(data) {
//     return http.post(api.GetPartnerListByDealer, data)
// }

export function GetLogisticsList(data) {
    return http.post(api.GetLogisticsList, data)
}

export function SubmitOrder(data) {
    return http.post(api.SubmitOrder, data)
}
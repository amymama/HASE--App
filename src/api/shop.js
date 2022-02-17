/**
 * Shop api
 */
import http from '@/utils/request'
const api = {
  ShopSize: '/api/shop/querylist_size',             // [basic-size]
  ShopLocation: '/api/shop/querylist_location',     // [basic-location]
  CustomerList: '/api/customer/getcustomerlist',    // [basic-customer]
  BranchTree: '/api/saleregion/getregionbranch',    // [basic-branch] 
  ChannelTree: '/api/channel/getchannelbuildings',  // [basic-channel]
  saleregionTreelist: '/api/saleregion/gettreelist',    // [basic-region]
  salenetworkTreelist: '/api/salenetwork/gettreelist',    // [basic-region]
  ShopList: '/api/appshop/querylist',
  ShopListBySelf: '/api/appshop/getshoplistbyself',
  ShopApproveList: '/api/appshop/getappshopapprovelist',
  ShopDetail: '/api/appshop/getshopdetail',
  ShopOperation: '/api/appshop/appshopoperation',
  RoleList: '/api/role/getrolelist',
  ShopProductCategory: '/api/appshop/getproductcategorybuildings',
  approveflow: '/api/homepage/approveflow', // 店铺审批pass
  rejectflow: '/api/homepage/rejectflow', // 店铺审批reject
  closeshop: '/api/shop/closeshop', // 闭店
  approvenodehistory: '/api/homepage/getapprovenodehistory', // 店铺审批流
  ShopCardOfAquaClass: '/api/appshop/getshopcardofaquaclass', // SHOP CARD-AQUA CLASS
  ShopCardOfAquaRank: '/api/appshop/getshopcardofaquarank', // SHOP CARD-AQUA RANK
  gettodolistcount: 'api/visitplan/gettodolistcount',
}

// [获取SHOP SIZE|GET]
export function getShopSize(params) {
  return http.get(api.ShopSize, { params })
}
// [获取SHOP LOCATION|GET]
export function getShopLocation(params) {
  return http.get(api.ShopLocation, { params })
}
// [获取CUSTOMER|GET]
export function getCustomerList(data) {
  return http.post(api.CustomerList, data)
}
// Sale region tree list
export function getSaleregionTreelist(params) {
  return http.get(api.saleregionTreelist, { params })
}
// Sale network tree list
export function getSaleNetworkTreelist(params) {
  return http.get(api.salenetworkTreelist, { params })
}
// [获取店铺列表|GET]
export function getShopList(params) {
  return http.get(api.ShopList, { params })
}
// [根据状态获取店|GET]
export function getShopListBySelf(params) {
  return http.get(api.ShopListBySelf, { params })
}
// [获取店铺审批列表|GET]
export function getShopApproveList(params) {
  return http.get(api.ShopApproveList, { params })
}
// [获取店铺详情|GET]
export function getShopDetail(params) {
  return http.get(api.ShopDetail, { params })
}
// [注册和暂存店铺|POST]
export function postShopOperation(data) {
  return http.post(api.ShopOperation, data)
}
// [获取店铺产品分类|GET]
export function getShopProductCategory(data) {
  return http.get(api.ShopProductCategory, data)
}
// [Region branch 联动|GET]
export function getBranchTree(data) {
  return http.get(api.BranchTree, data)
}
// [Region branch 联动|GET]
export function getChannelTree(data) {
  return http.get(api.ChannelTree, data)
}
export function getRoleList(params) {
  return http.get(api.RoleList, { params })
}
// 获取店铺审批流
export function getApproveNodeHistory(data, params) {
  return http.post(api.approvenodehistory, data, { params })
}
// [店铺审批pass|POST]
export function postApproveFlow(data, params) {
  return http.post(api.approveflow, data, { params })
}
// [店铺审批reject|POST]
export function postRejectFlow(data, params) {
  return http.post(api.rejectflow, data, { params })
}
// [闭店|POST]
export function postCloseShop(data, params) {
  return http.post(api.closeshop, data, { params })
}
// SHOP CLASS -AQUA CLASS
export function getShopCardOfAquaClass(params) {
  return http.get(api.ShopCardOfAquaClass, { params })
}
// SHOP CLASS -AQUA CLASS
export function getShopCardOfAquaRank(params) {
  return http.get(api.ShopCardOfAquaRank, { params })
}
// 跑店审批待办
export function getTodoListCount(params) {
  return http.get(api.gettodolistcount, { params })
}
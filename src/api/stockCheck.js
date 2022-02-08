import http from '@/utils/request'
const api = {
    getstoragelocationlistbyproduct: '/api/pmt/mobile/stockcheck/getstoragelocationlistbyproduct',
    getstoragelocationlistbygift: '/api/pmt/mobile/stockcheck/getstoragelocationlistbygift',
    stockcheckaddmodelbyproduct: '/api/pmt/mobile/stockcheck/stockcheckaddmodelbyproduct',
    getstockchecklistbyproduct: '/api/pmt/mobile/stockcheck/getstockchecklistbyproduct',
    getentityconditions: '/api/pmtcommondata/getentityconditions',
    stockcheckaddmodelbygift: '/api/pmt/mobile/stockcheck/stockcheckaddmodelbygift',
    editstockcheckquantity: '/api/pmt/mobile/stockcheck/editstockcheckquantity',
    deletestockcheck: '/api/pmt/mobile/stockcheck/deletestockcheck',
    getStockchecklistbygift: '/api/pmt/mobile/stockcheck/getStockchecklistbygift',
    addvisitstatistics:'/api/pmt/mobile/visitstatistics/addvisitstatistics',
    getuseridentityshop:'/api/pmt/mobile/visitstatistics/getuseridentityshop',
    getsalesforecastinfo:'/api/pmt/mobile/salseforecast/getsalesforecastinfo',
    salseforecastCreate:'/api/pmt/mobile/salseforecast/create',
    stockchecksubmitproduct:'/api/pmt/mobile/stockcheck/stockchecksubmitproduct',
    stockchecksubmitgift:'/api/pmt/mobile/stockcheck/stockchecksubmitgift',
    //修改
    salseforecastGetaddsource: '/api/pmt/mobile/stockcheck/getcategorymodel',
    stockchecksubmit:'/api/pmt/mobile/stockcheck/stockchecksubmit',
    //competitorsales
    // competitorsalesAddvisitstatistics:"/api/pmt/mobile/competitorsales/addvisitstatistics",
    // 提交
    competitorsalesAddvisitstatistics:"/api/pmt/mobile/competitorsales/addsalescategory",
    getsalescategorybrandlist:'/api/pmt/mobile/competitorsales/getsalescategorybrandlist',
    getusershopinfo:"/api/pmt/mobile/competitorsales/getusershopinfo",
    getdefaultperiodfromdate:"api/pmt/mobile/competitorsales/getdefaultperiodfromdate",

    getuseridentityshoplist:'api/pmt/mobile/visitstatistics/getuseridentityshoplist'
}

export function getdefaultperiodfromdate(params) {
    return http.get(api.getdefaultperiodfromdate,{},{params}  )
}
// Storage Location(Model)下拉框
export function getstoragelocationlistbyproduct(params) {
    return http.get(api.getstoragelocationlistbyproduct,{ params })
}
// Storage Location(Gift)下拉框
export function getstoragelocationlistbygift(params) {
    return http.get(api.getstoragelocationlistbygift,{ params })
}
// Add Model  category和Model下拉框  获取店铺基本信息 返回值是数组
export function salseforecastGetaddsource(params) {
    return http.get(api.salseforecastGetaddsource,{ params })
}
//Gift下拉框
export function getentityconditions(params) {
    return http.post(api.getentityconditions,{}, {params})
}
//Add model 
export function stockcheckaddmodelbyproduct(data) {
    return http.post(api.stockcheckaddmodelbyproduct, data )
}
//Add Gift 
export function stockcheckaddmodelbygift(data) {
    return http.post(api.stockcheckaddmodelbygift, data )
}

//model List
export function getstockchecklistbyproduct(params) {
    return http.get(api.getstockchecklistbyproduct,{params} )
}
//gift List
export function getStockchecklistbygift(params) {
    return http.get(api.getStockchecklistbygift, {params} )
}
// 批量提交
export function stockchecksubmitproduct(data) {
    return http.post(api.stockchecksubmitproduct, data )
}

export function stockchecksubmitgift(data) {
    return http.post(api.stockchecksubmitgift, data )
}
//修改数量
// export function editstockcheckquantity(data) {
//     return http.post(api.editstockcheckquantity, data )
// }
//删除
export function deletestockcheck(params) {
    return http.delete(api.deletestockcheck, {},{params} )
}
//visit Statistics   api
// 添加Visit Statistics
export function addvisitstatistics(data) {
    return http.post(api.addvisitstatistics, data )
}
//获取当前app登录用户对应的门店信息
export function getuseridentityshop(params) {
    return http.get(api.getuseridentityshop, {params} )
}

//sales Forecast
//获取店铺基本信息 返回值是数组
export function getsalesforecastinfo(params) {
    return http.get(api.getsalesforecastinfo, {params} )
}
//增加 forecast model
export function salseforecastCreate(data) {
    return http.post(api.salseforecastCreate, data )
}
//competitorsales
//添加 竞品销售数据
export function competitorsalesAddvisitstatistics(data) {
    return http.post(api.competitorsalesAddvisitstatistics, data )
}
//对应品牌
export function getsalescategorybrandlist(params) {
    return http.get(api.getsalescategorybrandlist, {params} )
}
//根据获取当前用户在门店信息下拉框数据
export function getusershopinfo(params) {
    return http.get(api.getusershopinfo, {params} )
}

export function getuseridentityshoplist() {
    return http.get(api.getuseridentityshoplist)
}
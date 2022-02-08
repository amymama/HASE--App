// 用户接口
import http from '@/utils/request'
const api = {
    getLastCheckInfo:'/api/pmt/mobile/attendant/getlastcheckinfo',
    getApplyAbsence:'/api/pmt/mobile/attendant/applyabsence',
    check:'/api/pmt/mobile/attendant/check',
    getUserShopInfo:'/api/pmt/mobile/pmthomepage/getusershopinfo',
    getShopInfo:'/api/pmt/mobile/attendant/getshopinfo',
    getTableListAbsence:'/api/pmt/mobile/attendant/getabsencelist',
    getovertimelist:'/api/pmt/mobile/attendant/getovertimelist',
    applyovertime:'/api/pmt/mobile/attendant/applyovertime',
    getworkingplansettinglist:'/api/pmt/mobile/attendant/getworkingplansettinglist'

}

// 获取最后登陆信息
export function getLastCheckInfo(params) {
    return http.get(api.getLastCheckInfo,{params:params})
}

// 提交ApplyAbsence
export function postApplyAbsence(data) {
    return http.post(api.getApplyAbsence,data)
}

// check
export function postCheck(data) {
    return http.post(api.check,data)
}

// check
export function getShopInfo(params) {
    return http.get(api.getShopInfo,{params:params})
}

// get table
export function getTableListAbsence() {
    return http.get(api.getTableListAbsence)
}

// get table
export function getovertimelist() {
    return http.get(api.getovertimelist)
}

export function applyovertime(data) {
    return http.post(api.applyovertime,data)
}

export function getworkingplansettinglist() {
    return http.get(api.getworkingplansettinglist)
}






  














import http from '@/utils/request'
const api = {
    getpagelist: '/api/pmt/mobile/workingplan/getpagelist',
    getworkingplansettinglist:'/api/pmt/mobile/workingplan/getworkingplansettinglist',
    getuseridentityshop:'/api/pmt/mobile/visitstatistics/getuseridentityshop',
    insert:'/api/pmt/mobile/workingplan/insert',
    getworkingplandetail:'/api/pmt/mobile/workingplan/getworkingplandetail'
}

// 
export function getpagelist(data) {
    return http.post(api.getpagelist, data)
}

export function getworkingplansettinglist(params) {
    return http.get(api.getworkingplansettinglist,  { params })
}

export function getuseridentityshop() {
    return http.get(api.getuseridentityshop)
}

export function insert(data) {
    return http.post(api.insert,data)
}

export function getworkingplandetail(params) {
    return http.get(api.getworkingplandetail,  { params })
}


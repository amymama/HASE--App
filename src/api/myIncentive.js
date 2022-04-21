

import http from '@/utils/request'
const api = {
    getpmt: '/api/pmt/mobile/myincentive/getpmt',
    getTl:'/api/pmt/mobile/myincentive/gettl',
    getMD:'/api/pmt/mobile/myincentive/getmd',
    getMhModellist:'/api/pmt/mobile/myincentive/getmhmodellist',
    getps:'api/pmt/mobile/myincentive/getps',
    getpstl:'api/pmt/mobile/myincentive/getpstl',
    getme:'/api/pmt/mobile/myincentive/getme',
    getmetl:'/api/pmt/mobile/myincentive/getmetl'

}

// 获取PMT
export function getPmt(params) {
    return http.get(api.getpmt,{params:params})
}

// 获取TL
export function getTl(params) {
    return http.get(api.getTl,{params:params})
}

// 获取MD
export function getMd(params) {
    return http.get(api.getMD,{params:params})
}

// 获取Mh model
export function getMhModellist(data) {
    return http.post(api.getMhModellist,data)
}

// 获取Mh getps
export function getps(params) {
    return http.get(api.getps,{params:params})
}

// 获取Mh getpstl
export function getpstl(params) {
    return http.get(api.getpstl,{params:params})
}

// 获取Mh getme
export function getme(params) {
    return http.get(api.getme,{params:params})
}

export function getmetl(params) {
    return http.get(api.getmetl,{params:params})
}






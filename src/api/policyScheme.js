// 用户接口
import http from '@/utils/request'
const api = {
    getpmt:'/api/pmt/mobile/policyscheme/getpmt',
    getmd: '/api/pmt/mobile/policyscheme/getmd',
    gettl:'/api/pmt/mobile/policyscheme/gettl',
    getmhincentivelist:'/api/pmt/mobile/policyscheme/getmhincentivelist',
    getmhmodellist:'/api/pmt/mobile/policyscheme/getmhmodellist',
    getps:'/api/pmt/mobile/policyscheme/getps',
    gethotmodellist:'/api/pmt/mobile/policyscheme/gethotmodellist',
    getpstl:'/api/pmt/mobile/policyscheme/getpstl',
    getme:'/api/pmt/mobile/policyscheme/getme',
    getmetl:'/api/pmt/mobile/policyscheme/getmetl',
    getshoppic:'/api/pmt/mobile/policyscheme/getshoppic',
    getspmodellist:'/api/pmt/mobile/policyscheme/getspmodellist'

}

// 获取 pmt 
export function postGetPmt() {
    return http.post(api.getpmt)
}

// 获取 md 
export function postGetMd() {
    return http.post(api.getmd)
}

// 获取 tl 
export function postGetTl() {
    return http.post(api.gettl)
}

// 获取 getmhincentivelist 
export function postGetMhIncentiveList() {
    return http.post(api.getmhincentivelist)
}

// 获取 getmhincentivelist 
export function postGetMhModelList(data) {
    return http.post(api.getmhmodellist,data)
}

// PS
export function getPS(params) {
    return http.get(api.getps,{params:params})
}

// 获取 getmhincentivelist 
export function postGethotmodellist(data) {
    return http.post(api.gethotmodellist,data)
}

// 获取 getpstl 
export function postGetpstl(params) {
    return http.get(api.getpstl,{params:params})
}

// 获取 postGetme 
export function postGetme(params) {
    return http.get(api.getme,{params:params})
}

// 获取 postGetme 
export function postGetmetl(params) {
    return http.get(api.getmetl,{params:params})
}

export function postGetshoppic(params) {
    return http.get(api.getshoppic,{params:params})
}

export function getspmodellist(data) {
    return http.post(api.getspmodellist,data)
}






import http from '@/utils/request'
const api = {
    getapprovelist:'/api/pmt/mobile/pmthomepage/getapprovelist',
    getapprovedetail:'/api/pmt/mobile/pmthomepage/getapprovedetail',
    batchapproveflow:'/api/homepage/batchapproveflow',
    batchrejectflow:'/api/homepage/batchrejectflow'
}

// 获取List
export function getapprovelist(data) {
    return http.post(api.getapprovelist,data)
}

export function getapprovedetail(params) {
    return http.post(api.getapprovedetail,{},{params:params})
}

export function batchapproveflow(params,data) {
    return http.post(api.batchapproveflow,data,{params:params})
}

export function batchrejectflow(params,data) {
    return http.post(api.batchrejectflow,data,{params:params})
}
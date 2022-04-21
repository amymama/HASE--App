
// 用户接口
import http from '@/utils/request'
const api = {
    getPmtSellOut: '/api/pmt/mobile/pmthomepage/getsellout',
}

// 
export function getPmtSellOut(params) {
    return http.post(api.getPmtSellOut, {},{params:params})
}

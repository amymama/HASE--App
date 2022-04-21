// 用户接口
import http from '@/utils/request'
const api = {
    getShopSelectData: '/api/userpermission/getuserpermission',
    submitGitRegister:'/api/pmt/mobile/giftregister/giftregister',
    getcauses:'api/pmtcommondata/getcauses',
    getgifts:'api/pmtcommondata/getgifts'
}

// 
export function getShopSelectData(params) {
    return http.post(api.getShopSelectData, params)
}

// giftRegister提交
export function postSubmitGitRegister(data) {
    return http.post(api.submitGitRegister, data)
}

export function getcauses() {
    return http.post(api.getcauses)
}

export function getgifts() {
    return http.post(api.getgifts)
}


  













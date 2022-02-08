
import http from '@/utils/request'
const api = {
    getshoppicwalletincentivemodelandwithdrawalsettings:'api/pmt/mobile/wallet/getshoppicwalletincentivemodelandwithdrawalsettings',
    incentivewithdrawaldetailpage:'/api/pmt/mobile/wallet/incentivewithdrawaldetailpage',
    getshoppicwalletbalancedetail:'/api/pmt/mobile/wallet/getshoppicwalletbalancedetail',
    shoppicwithdrawal:'/api/pmt/mobile/wallet/shoppicwithdrawal',
    getshoppicwithdrawalrecommendedamount:'/api/pmt/mobile/wallet/getshoppicwithdrawalrecommendedamount',
    // getshoppicwalletbalancedetail: '/api/pmt/mobile/wallet/getshoppicwalletbalancedetail'
}

// 
export function getshoppicwalletincentivemodelandwithdrawalsettings() {
    return http.post(api.getshoppicwalletincentivemodelandwithdrawalsettings)
}

export function incentivewithdrawaldetailpage(data) {
    return http.post(api.incentivewithdrawaldetailpage,data)
}

export function getshoppicwalletbalancedetail() {
    return http.post(api.getshoppicwalletbalancedetail)
}

export function shoppicwithdrawal(data) {
    return http.post(api.shoppicwithdrawal,data)
}

export function getshoppicwithdrawalrecommendedamount(data) {
    return http.post(api.getshoppicwithdrawalrecommendedamount,data)
}


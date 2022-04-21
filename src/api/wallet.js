
import http from '@/utils/request'
const api = {
    getpsandspwalletincentivemodelandwithdrawalsettings:'/api/pmt/mobile/wallet/getpsandspwalletincentivemodelandwithdrawalsettings',
    withdrawallogin:'/api/login/withdrawallogin',
    getpsandspwithdrawalrecommendedamount:'/api/pmt/mobile/wallet/getpsandspwithdrawalrecommendedamount',
    psandspwithdrawal:'/api/pmt/mobile/wallet/psandspwithdrawal',
    getpsandspwalletbalancedetail:'/api/pmt/mobile/wallet/getpsandspwalletbalancedetail',
    incentivewithdrawaldetailpage:'/api/pmt/mobile/wallet/incentivewithdrawaldetailpage'
}

// 
export function getpsandspwalletincentivemodelandwithdrawalsettings() {
    return http.post(api.getpsandspwalletincentivemodelandwithdrawalsettings)
}

export function withdrawallogin(data) {
    return http.post(api.withdrawallogin,data)
}

export function getpsandspwithdrawalrecommendedamount() {
    return http.post(api.getpsandspwithdrawalrecommendedamount)
}

export function psandspwithdrawal(data) {
    return http.post(api.psandspwithdrawal,data)
}

export function getpsandspwalletbalancedetail() {
    return http.post(api.getpsandspwalletbalancedetail)
}

export function incentivewithdrawaldetailpage(data) {
    return http.post(api.incentivewithdrawaldetailpage,data)
}


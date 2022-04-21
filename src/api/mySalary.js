
import http from '@/utils/request'
const api = {
    mysalary:'/api/pmt/mobile/salary/mysalary',
}


export function mysalary(data) {
    return http.post(api.mysalary,data)
}


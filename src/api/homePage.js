import http from '@/utils/request'
const api = {
    gettodo: '/api/pmt/mobile/pmthomepage/gettodo',
}

// 获取to do task
export function postGetToDo() {
    return http.post(api.gettodo)
}
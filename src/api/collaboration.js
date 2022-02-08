// 用户接口
import http from '@/utils/request'
const api = {
    gettodolistpage: '/api/pmt/mobile/collaborationmobile/gettodolistpage',
    getcollaborationp: '/api/pmt/mobile/collaborationmobile/getcollaborationp',
    insertorupdate: '/api/pmt/mobile/collaborationmobile/insertorupdate',
    // updateclose: '/pmt/mobile/collaboration/updateclose',
    getusershopinfo: '/api/pmt/mobile/collaborationmobile/getreceiveruseList',
    getreceiveruseList: '/api/pmt/mobile/collaborationmobile/getreceiveruseList',
    getccuseList: '/api/pmt/mobile/collaborationmobile/getccuseList',
    // getusershopinfo:'/pmt/mobile/collaboration/getusershopinfo'
    getcollaborationpage:'/api/pmt/mobile/collaborationmobile/getcollaborationpage',
    updateclose:'/api/pmt/mobile/collaborationmobile/updateclose'
}

//
export function postGettodolistpage(data) {
    return http.post(api.gettodolistpage, data)
}

export function postGetcollaborationpage(data) {
    return http.post(api.getcollaborationpage, data)
}

export function getGetcollaborationp(params) {
    return http.get(api.getcollaborationp, { params: params })
}

export function postInsertorupdate(data) {
    return http.post(api.insertorupdate, data)
}

export function postUpdateclose(data) {
    return http.post(api.updateclose, data)
}

export function getGetusershopinfo(params) {
    return http.get(api.getusershopinfo, { params: params })
}

export function getGetreceiveruseList(params) {
    return http.get(api.getreceiveruseList, { params: params })
}

export function getGetccuseList(params) {
    return http.get(api.getccuseList, { params: params })
}

export function getvincentivemodelpage(data) {
    return http.post(api.getvincentivemodelpage, data)
}





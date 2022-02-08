import http from '@/utils/request'
const api = {
    //门店信息shop下拉框
    getusershopinfo: '/api/pmt/mobile/pmthomepage/getusershopinfo',
    //扫描零售条码获取型号信息
    retailmobileScanbarcode: '/api/pmt/mobile/retailmobile/scanbarcode',
    //扫码零售提报
    getuserinfobytoken: 'api/user/getuserinfobytoken',
    //提交零售提报确认
    submitretailconfirm: '/api/pmt/mobile/retailmobile/submitretailconfirm',
    submitretailscanbarcode: '/api/pmt/mobile/retailmobile/submitretailscanbarcode',
    saveretailscanbarcode: '/api/pmt/mobile/retailmobile/saveretailscanbarcode',
    submitretailmanualbarcode: '/api/pmt/mobile/retailmobile/submitretailmanualbarcode',
    //保存零售提报
    saveretailmanualbarcode: '/api/pmt/mobile/retailmobile/saveretailmanualbarcode',
    //获取保存的零售提报
    getretailscanbarcode: '/api/pmt/mobile/retailmobile/getretailscanbarcode',
    // 提交手工发票零售提报
    submitretailinvoicemodel: '/api/pmt/mobile/retailmobile/submitretailinvoicemodel',
    //选择照片
    uploadimage: '/api/pmtcommondata/uploadimage',
    //保存手工发票零售提报
    saveretailinvoicemodel: '/api/pmt/mobile/retailmobile/saveretailinvoicemodel',
    //获取保存的手工发票零售提报
    getretailinvoicemodel: '/api/pmt/mobile/retailmobile/getretailinvoicemodel',
    //根据型号名称获取型号(品牌)
    getmodelbrandbymodel: '/api/pmt/mobile/retailmobile/getmodelbrandbymodel',
    //获取零售条码提报记录
    getretaillistpage: '/api/pmt/mobile/retailmobile/getretaillistpage',
    getentityconditions: '/api/pmtcommondata/getentityconditions',
    deleteretailbyid: '/api/pmt/mobile/retailmobile/deleteretailbyid',

    getdropdownoptions: '/api/pmtcommondata/getdropdownoptions'
}
export function getusershopinfo(params) {
    return http.post(api.getusershopinfo, {}, { params })
}
//
export function retailmobileScanbarcode(params) {
    return http.post(api.retailmobileScanbarcode, {}, { params })
}
export function getuserinfobytoken(data) {
    return http.get(api.getuserinfobytoken, data)
}
//提交
export function submitretailconfirm(data) {
    return http.post(api.submitretailconfirm, data)
}
export function submitretailscanbarcode(data) {
    return http.post(api.submitretailscanbarcode, data)
}
export function saveretailscanbarcode(data) {
    return http.post(api.saveretailscanbarcode, data)
}
export function submitretailmanualbarcode(data) {
    return http.post(api.submitretailmanualbarcode, data)
}
export function saveretailmanualbarcode(data) {
    return http.post(api.saveretailmanualbarcode, data)
}
export function getretailscanbarcode(params) {
    return http.post(api.getretailscanbarcode, {}, { params })
}
export function submitretailinvoicemodel(data) {
    return http.post(api.submitretailinvoicemodel, data)
}
export function saveretailinvoicemodel(data) {
    return http.post(api.saveretailinvoicemodel, data)
}
export function getretailinvoicemodel(params) {
    return http.post(api.getretailinvoicemodel, {}, { params })
}
export function getmodelbrandbymodel(params) {
    return http.post(api.getmodelbrandbymodel, {}, { params })
}
export function getretaillistpage(data) {
    return http.post(api.getretaillistpage, data)
}
export function getentityconditions(params) {
    return http.post(api.getentityconditions, {}, { params })
}
// 相机拍照或选择照片
export function uploadimage(data) {
    return http.post(api.uploadimage, data)
}
export function deleteretailbyid(params) {
    return http.post(api.deleteretailbyid, {}, { params })
}

export function getdropdownoptions(params) {
    return http.post(api.getdropdownoptions, {}, { params })
}
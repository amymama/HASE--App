import http from '@/utils/request'
const api = {
    getassetfamine: '/api/assetmanage/getassetfamine',
    getBranchAndRegion: '/api/saleregion/getregionbranch',
    addFa: '/api/assetmanage/addassetfa',
    upFa: '/api/assetmanage/upassetfa',
    faDetail: '/api/assetmanage/editassetfa',
    faInspection: '/api/assetmanage/getassetfainspecion',
    channel: '/api/channel/getchannelbuildings',
}

export const postMineFA = (data) => http.post(api.getassetfamine, data)

export const getBranchAndRegion = (params) => http.get(api.getBranchAndRegion, { params })

export const postAddFA = (data) => http.post(api.addFa, data)

export const postUpdateFA = (data) => http.post(api.upFa, data)

export const getFADetail = (params) => http.get(api.faDetail, { params })

export const postInspectionFA = (data) => http.post(api.faInspection, data)

export const getChannel = (params) => http.get(api.channel, { params })

const posm_api = {
    posmRecord: '/api/assetmanage/getposminoutrecord',
    getassetposmlistforapp: '/api/assetmanage/getassetposmlistforapp',
    posmIn: '/api/assetmanage/optionposmin',
    inoutCount: '/api/assetmanage/getinoutamount',
    getdraftposmlistofuser: '/api/assetmanage/getdraftposmlistofuser',
    getposminoutrecordbyid: '/api/assetmanage/getposminoutrecordbyid',
    submit: '/api/assetmanage/posmtypesubmit',
    delete: '/api/assetmanage/posmtypedraftdelete',
    checkForecast: '/api/assetmanage/isforcast'
}
export const postPosmList = (data) => http.post(posm_api.getassetposmlistforapp, data)

export const postPosmIn = (data) => http.post(posm_api.posmIn, data)

export const getInoutCount = (params) => http.get(posm_api.inoutCount, { params })

export const getInoutDraft = (params) => http.get(posm_api.getdraftposmlistofuser, { params })
// 获取POSM History
export const postPosmRecord = (data) => http.post(posm_api.posmRecord, data)

export const getRecordDetail = (params) => http.get(posm_api.getposminoutrecordbyid, { params })

export const postSubmitPosm = (data) => http.post(posm_api.submit, data)

export const postDeletePosm = data => http.post(posm_api.delete, data)

export const postCheckForecast = data => http.post(posm_api.checkForecast, data)
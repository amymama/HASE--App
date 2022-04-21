import http from '@/utils/request'
const api = {
    VPshopList: '/api/visitplan/getshoplist',
    VPplanList: '/api/visitplan/getvisitplan',
    VProleList: '/api/role/getrolelist',
    savePlan: '/api/visitplan/savevisitplan',
    submitPlan: '/api/visitplan/submitvisitplan',
    cancelPlan: '/api/visitplan/canclevisitplan',
    approveList: '/api/visitplan/waitfllowlist',
    approveStatus: '/api/visitplan/passfllowlist',
    approveHistory: '/api/homepage/getapprovenodehistory',
}

export const postShopList = data => http.post(api.VPshopList, data)

export const postPlanList = data => http.post(api.VPplanList, data)

export const getRoleList = params => http.get(api.VProleList, { params })

export const SavePlan = data => http.post(api.savePlan, data)

export const SubmitPlan = data => http.post(api.submitPlan, data)

export const cancelPlan = params => http.get(api.cancelPlan, { params })

export const postApproveList = data => http.post(api.approveList, data)

export const postApproveStatus = data => http.post(api.approveStatus, data)

export const postApprovalHistory = (params, data) => http.post(api.approveHistory, data, { params })
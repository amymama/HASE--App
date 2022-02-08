/**
 * Shop visit api
 */
import http from '@/utils/request'
const api = {
  VisitStepBySelf: '/api/appshopvisit/getvisitstepbyself',
  VisitTotalBySelf: '/api/appshopvisit/findshopvisittotal',
  StartShopVisitTotal: '/api/appshopvisit/startshopvisittotal', // create visit total record
  CopyVistStep: '/api/appshopvisit/copyvisitstep', // copay visit record
  FainspectList: '/api/appvisitfainspect/getfainspectlist', // step1
  FainspectDetail: '/api/appvisitfainspect/getfainspectDetail', // step1
  SaveFainspect: '/api/appvisitfainspect/savefainspect', // step1
  TargetClassAndQty: '/api/appvisitdisplaysample/gettargetclassandqty', // [step2] get shop class and qty traget
  DisplayModels: '/api/appvisitdisplaysample/getmodels', // [step2] get modals
  DisplayBooths: '/api/appvisitdisplaysample/getfabooths', // [step2] get booths
  DisplaySampleDetail: '/api/appvisitdisplaysample/getdisplaysampledetail', // [step2] get display sample detail
  CalcDisplaySampleTargetClass: '/api/appvisitdisplaysample/calcdisplaysampletargetclass', // [step2] calc display target class
  DisplaySampleModeloperation: '/api/appvisitdisplaysample/modeloperation', // [step2-1] SAVE AND SUBMIT
  DisplaySampleBoothoperation: '/api/appvisitdisplaysample/boothoperation', // [step2-2] SAVE AND SUBMIT
  VisitCompetitorList: '/api/appvisitcompetitor/getappvisitcompetitorlist', // [step3] get competitor list
  VisitCompetitorAquaQty: '/api/appvisitcompetitor/getappvisitcompetitoraquaqty', // [step3] get AQUA QTY
  VisitCompetitorDetail: '/api/appvisitcompetitor/getappvisitcompetitordetail', // [step3] get competitor detail
  SaveVisitCompetitor: '/api/appvisitcompetitor/saveappvisitcompetitor', // [step3] post competitor
  CopyVisitStep: '/api/appshopvisit/copyvisitstep', // [copy] copy shop visit
  SubmitShopVisitTotal: '/api/appshopvisit/submitshopvisittotal', // [submit] submit shop visit
  VisitTotalListBySelf: '/api/appshopvisit/getshopvisittotallistbyself', // [visit history] get visit history by self
  VisitTotalList: '/api/appshopvisit/getshopvisittotalhistory', // [visit history] get visit history 
  VisitStepidByTotalid: '/api/appshopvisit/getvisitstepidbytotalid', // [visit history] get visit record id
  DeleteShopVisitTotal: '/api/appshopvisit/deleteshopvisittotal' // [delete record for draft]
}

// [获取当前用户拜店历史记录数量|Get]
export function getVisitTotalBySelf(params) {
  return http.get(api.VisitTotalBySelf, { params })
}
// [获取用户拜店步骤和最新提交数据|Get]
export function getVisitStepBySelf(params) {
  return http.get(api.VisitStepBySelf, { params })
}
// [开始拜店，获取TOTAL ID|Get]
export function postStartShopVisitTotal(data) {
  return http.post(api.StartShopVisitTotal, data)
}
// [获取COPAY RECORD|Get]
export function postCopyVistStep(params) {
  return http.get(api.CopyVistStep, { params })
}
// [拜店步骤1-获取列表|Get]
export function getFainspectList(params) {
  return http.get(api.FainspectList, { params })
}
// [拜店步骤1-获取资产详情|Get]
export function getFainspectDetail(params) {
  return http.get(api.FainspectDetail, { params })
}
// [拜店步骤1-提交数据|Post]
export function postSaveFainspect(data) {
  return http.post(api.SaveFainspect, data)
}
// [拜店步骤2-获取CLASS QTY TARGET|Get]
export function getTargetClassAndQty(params) {
  return http.get(api.TargetClassAndQty, { params })
}
// [拜店步骤2-获取display models|Get]
export function getDisplayModels(params) {
  return http.get(api.DisplayModels, { params })
}
// [拜店步骤2-获取display booths|Get]
export function getDisplayBooths(params) {
  return http.get(api.DisplayBooths, { params })
}
// [拜店步骤2-获取详情|Get]
export function getDisplaySampleDetail(params) {
  return http.get(api.DisplaySampleDetail, {params})
}
// [拜店步骤2-计算店铺target class|post]
export function postCalcDisplaySampleTargetClass(data) {
  return http.post(api.CalcDisplaySampleTargetClass, data)
}
// [拜店步骤2-1-提交|post]
export function postDisplaySampleModeloperation(data) {
  return http.post(api.DisplaySampleModeloperation, data)
}
// [拜店步骤2-2-提交|post]
export function postDisplaySampleBoothoperation(data) {
  return http.post(api.DisplaySampleBoothoperation, data)
}
// [拜店步骤3-获取竞品|Get]
export function getVisitCompetitorList(params) {
  return http.get(api.VisitCompetitorList, { params })
}
// [拜店步骤3-海尔数量|Get]
export function getVisitCompetitorAquaQty(params) {
  return http.get(api.VisitCompetitorAquaQty, { params })
}
// [拜店步骤3-获取竞品详情|Get]
export function getVisitCompetitorDetail(params) {
  return http.get(api.VisitCompetitorDetail, { params })
}
// [拜店步骤3-提交竞品信息|Post]
export function postSaveVisitCompetitor(data) {
  return http.post(api.SaveVisitCompetitor, data)
}
// [拜店历史-获取拜店历史_MY|Get]]
export function getVisitTotalListBySelf(params) {
  return http.get(api.VisitTotalListBySelf, { params })
}
// [拜店历史-获取拜店历史[Get]]
export function getVisitTotalList(params) {
  return http.get(api.VisitTotalList, { params })
}
// [拜店历史-获取拜店ID[Get]]
export function getVisitStepidByTotalid(params) {
  return http.get(api.VisitStepidByTotalid, { params })
}
// [拜店步骤-提交|POST]
export function postSubmitShopVisitTotal(data) {
  return http.post(api.SubmitShopVisitTotal, data)
}
// [拜店步骤-COPY|POST]
export function postCopyVisitStep(data) {
  return http.post(api.CopyVisitStep, data)
}
// [删除拜店纪录-draft|POST]
export function postDeleteShopVisitTotal(data) {
  return http.post(api.DeleteShopVisitTotal, data)
}

// 公共接口
import http from '@/utils/request'
const api = {
  uploadwatermark: '/api/file/uploadwatermark',
  salenetworkgettreelist: '/api/salenetwork/gettreelist',
  getentityconditions: '/api/commondata/getentityconditions',
  getdict: '/api/dict/getdict',
  getselectData: '/api/pmtcommondata/getentityconditions',
  allShopList: '/api/pmtcommondata/getshop',
  getPageSelectData: '/api/pmtcommondata/getdropdownoptions',
  getCategory: '/api/pmtcommondata/getproductcategory',
  getSubCategory: '/api/pmtcommondata/getproductsubcategory',
  uploadimage: '/api/pmtcommondata/uploadimage'
}
// [上传图片-带水印|POST]
export function postUplodWaterImg(data) {
  return http.post(api.uploadwatermark, data)
}

// [上传图片-带水印|POST]
export function postUploadimage(data) {
  return http.post(api.uploadimage, data)
}

// [GET NETWORK TREELIST|GET]
export function getNetWorkTreeList(params) {
  return http.get(api.salenetworkgettreelist, { params })
}

// [获取实体数据|POST]
export function getEntityConditions(data) {
  return http.post(api.getentityconditions, data)
}

// [获取实体数据|POST]
export function getPmtSelectData(data) {
  return http.post(api.getselectData, {}, { params: data })
}

export function getDict(params) {
  return http.get(api.getdict, { params })
}

export function updateData(tableName, id, data) {
  return http.put(`/api/commondata/update/${tableName}(${id})`, data)
}

export function getAllShopList(data) {
  return http({
    url: api.allShopList,
    method: 'post',
    params: data,
    data,
  })
  // return http.post(api.allShopList, data)
}

//
export function getGetPageSelectData(data) {
  return http.post(api.getPageSelectData, {}, { params: data })
}

export function postGetCategory(data) {
  return http.post(api.getCategory, {}, { params: data })
}

export function postGetSubCategory(data) {
  return http.post(api.getSubCategory, {}, { params: data })
}

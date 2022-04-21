// 用户接口
import http from '@/utils/request'
const api = {
  AnnounceList: '/api/announce/getannouncelist',
  UpInsertRecord: '/api/announce/upinsertrecord',
  AnnounceContentById: '/api/announce/getcontentbyid',
  AnnounceReadList: '/api/announce/getannouncereadlist',
}

// [获取用户未读信息列表|GET]
export function getAnnounceList(params) {
  return http.get(api.AnnounceList,{ params })
}

// [获取通知详情|GET]
export function getAnnounceContentById(params) {
  return http.get(api.AnnounceContentById,{ params })
}

// [获取所有信息]
export function getAnnounceReadList(params) {
  return http.get(api.AnnounceReadList, { params })
}

// [更新通知状态|GET]
export function postUpInsertRecord(data) {
  return http.post(api.UpInsertRecord, data)
}

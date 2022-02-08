// APP接口
import http from '@/utils/request'

const api = {
  AppVersion: '/api/commondata/getappversion',
  WriteMonitor: process.env.VUE_APP_HIL_API + '/api/PageReqMonitor/WriteMonitor'
}
// [APP升级|GET]
export function getAppVersion() {
  return http.get(api.AppVersion )
}
// [APP访问记录|GET]
export function getWriteMonitor(params) {
  return http.get(api.WriteMonitor, { params } )
}
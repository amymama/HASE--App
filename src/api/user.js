// 用户接口
import http from '@/utils/request'
const api = {
  Login: '/api/login/applogin',
  UserinfoByToken: '/api/user/getappuserinfobytoken',
  UploadAvatar: '/api/user/changeavatar',
  ChangePwdByOld: '/api/user/changepwdbyold',
  RoleQueryList: '/api/role/querylist',
  userSendVerifyCode: '/api/login/SendVerifyCode',
  userChangePasswordConfirm: '/api/login/ChangePsw',
  userPermission: '/api/userpermission/getuserpermission',
  Register: '/api/login/Register',
  Piclist: '/api/user/getpiclist'
}

// [登录|POST]
export function postLogin(data) {
  return http.post(api.Login, data)
}

// [获取用户信息|GET]
export function getUserinfoByToken(params) {
  return http.get(api.UserinfoByToken, { params })
}

// [获取用户角色|GET]
export function getRoleQueryList(params) {
  return http.get(api.RoleQueryList, { params })
}

// [更新用户头像|POST]
export function postUploadAvatar(data) {
  return http.post(api.UploadAvatar, data)
}

// [修改密码|POST]
export function postChangePwdByOld(data, headers) {
  return http.post(api.ChangePwdByOld, data, { headers })
}

// [发送验证码|POST]
export function postUserSendVerifyCode(data) {
  return http.post(api.userSendVerifyCode, data)
}

// [修改密码|POST]
export function postUserChangePasswordConfirm(data) {
  return http.post(api.userChangePasswordConfirm, data)
}

//获取用户权限
export function postUserPermission(data) {
  return http.post(api.userPermission, data)
}

//注册
export function postRegister(data) {
  return http.post(api.Register, data)
}

//注册
export function getPiclist(params) {
  return http.get(api.Piclist, { params })
}

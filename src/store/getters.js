const getters = {
  token: state => state.user.token,
  userName: state => state.user.userName,
  avatar: status => status.user.avatar,
  auths: state => state.user.auths,
  userInfo: state => state.user.userInfo,
  userShopInfo: state => state.user.userShopInfo,
  roles: state => state.user.roles,
  lang: status => status.app.lang
}
export default getters

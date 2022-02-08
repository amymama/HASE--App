import axios from 'axios'
import store from '../store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 180000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// interceptors request
service.interceptors.request.use(
  config => {
    const { token, lang } = store.getters
    // TOKEN
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    // LANG
    if (lang) {
      var local = ''
      switch (lang) {
        case 'id':
          local = 'id-ID'
          break;
        case 'en':
          local = 'en-us'
          break;
        default:
          local = 'id-ID'
      }
      config.headers['Accept-Language'] = local
    }
    config.headers['IsApp'] = '1'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// interceptors response
service.interceptors.response.use(
  response => {
    if (response.data.code) {
      switch (response.data.code) {
        case 'E0003':
          store.dispatch('user/Logout').then(() => {
            next({ path: loginRoutePath })
          })
          break
        case 'E0004':
          store.commit('user/SET_TOKEN', response.data.data)
          return service.request(response.config)
          break
      }
    }
    return Promise.resolve(response.data)
  },
  error => {
    return Promise.reject((error))
  }
)

export default service

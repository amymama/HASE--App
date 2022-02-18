// 导入语言模块
import user from './id-ID/user'
import shop from './id-ID/shop'
import pmt from './id-ID/pmt'

// 导出本地语言包
export default {
  lang: "AR",
  ...user,
  ...shop,
  ...pmt
}

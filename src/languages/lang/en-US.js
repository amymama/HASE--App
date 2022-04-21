// 导入语言模块
import user from './en-US/user'
import pmt from './en-US/pmt'
import shop from './en-US/shop'

// 导出本地语言包
export default {
  lang: "en-US",
  ...user,
  ...shop,
  ...pmt
}

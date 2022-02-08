import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Locale } from 'vant'
// 英文
import enUS from 'vant/lib/locale/lang/en-US'
import enLocale from './lang/en-US'
// 当地语
import idID from 'vant/lib/locale/lang/en-US' // 临时用英文
import idLocale from './lang/id-ID'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enUS,
    ...enLocale
  },
  id: {
    ...idID,
    ...idLocale
  }
}
var localStore = JSON.parse(localStorage.getItem('vuex'))
const i18n = new VueI18n({
  locale: localStore && localStore.app.lang || 'id',
  messages,
  silentTranslationWarn: true
})

function vantLocales(lang) {
  switch (lang) {
    case 'en':
      Locale.use(lang, enUS)
      break;
    case 'id':
      Locale.use(lang, idID)
      break;
    default:
      Locale.use(lang, idID)
  }
}
export { i18n, vantLocales }

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vant/lib/index.css'
import './assets/css/reset.css'
import 'amfe-flexible'
import './vant.config'
import './permission'
import './directives/clickout'
import './assets/iconfont/iconfont'
import './assets/iconfont/iconfont.css'
import { i18n, vantLocales } from './languages'
import action from './directives/action'
import Mixin from './mixins'
import NumDialog from './views/shop/posm/plugins'
import TextDialog from './views/shop/promotion/plugins'
import PlanInfo from './views/shop/visitPlan/plugins'
import QRModel from './plugins/qrcode/index'
import Scan from './plugins/scan/index'
import './utils/native'

import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);
import debounce from '@/utils/debounce'
import throttle from '@/utils/throttle'

import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$debounce = debounce
Vue.prototype.$throttle = throttle

Vue.prototype.$video = Video
// import vConsole from './assets/js/vconsole.js'


// Vue.prototype.vConsole = vConsole
Vue.mixin(Mixin)
Vue.use(action)
Vue.use(NumDialog)
Vue.use(TextDialog)
Vue.use(PlanInfo)
Vue.use(QRModel)
Vue.use(Scan)

Vue.config.productionTip = false
vantLocales(i18n.locale)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

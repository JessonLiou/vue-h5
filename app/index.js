import Vue from 'vue'
import App from '@/modules/app/App'
import router from './router'
import i18n from './i18n'
import { init as initEngine } from '@/engine'
import '../venders/flexable'
import Vant from 'vant'

import '@/styles/vant.less'
import '@/styles/common.less'
import 'normalize.css'

Vue.use(Vant)
Vue.config.productionTip = false

initEngine()

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

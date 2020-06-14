import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vant from 'vant'
Vue.prototype.$axios = axios; //this.$axios使用

import {
  Lazyload
} from 'vant'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'vant/lib/index.css'
import animated from 'animate.css'
Vue.use(animated)

Vue.use(Lazyload, {
  lazyComponent: true,
  loading: './image/loading.gif'
});
Vue.prototype.$axios = axios
Vue.config.productionTip = false
//将axios 挂载到Vue上
Vue.use(Vant);

Vue.use(MintUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
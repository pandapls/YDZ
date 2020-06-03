import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  axios from 'axios'
import  Vant from 'vant'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'vant/lib/index.css'
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

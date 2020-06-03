import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  axios from 'axios'
import  {Search} from 'vant'
import 'vant/lib/index.css'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
//将axios 挂载到Vue上
Vue.use(Search);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

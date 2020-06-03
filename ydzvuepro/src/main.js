import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  axios from 'axios'
import  Vant from 'vant'
<<<<<<< HEAD
=======
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
>>>>>>> f1a0c0a352425295f074d177b9bf9d333b15b699
import 'vant/lib/index.css'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
//将axios 挂载到Vue上
Vue.use(Vant);
<<<<<<< HEAD
=======
Vue.use(MintUI)
>>>>>>> f1a0c0a352425295f074d177b9bf9d333b15b699
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

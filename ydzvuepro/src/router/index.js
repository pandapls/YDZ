import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Mine from '../views/Mine/Mine.vue'
import Category from '../views/Classification/category.vue'
import Goodsdetail from '../views/Classification/Goodsdetail.vue'
import Shopping from '../views/Shopping/Shopping.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
   {
    path: '/mine',
    name: 'Mine',
    component: Mine
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/goodsdetail',
    name: 'Goodsdetail',
    component: Goodsdetail
  },
  {
    path: '/shopping',
    name: 'Shopping',
    component: Shopping
  }
]

const router = new VueRouter({
  routes
})
router.push('/home')
export default router

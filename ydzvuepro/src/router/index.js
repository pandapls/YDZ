import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Mine from '../views/Mine/Mine.vue'
import Category from '../views/Classification/category.vue'
import Shopping from '../views/Shopping/Shopping.vue'
import Goodslist from '../views/Classification/Goodslist.vue'
import Address from '../components/myaddress.vue'
import AddMyress from '../components/addmyress.vue'
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
    component: Category,

  },
  {
    path: '/shopping',
    name: 'Shopping',
    component: Shopping
  },
 {
			path: '/goodslist',
			 name: 'goodslist',
			 component: Goodslist
	},
	{
			path: '/address',
			 name: 'address',
			 component: Address
	},
	{
			path: '/addmyress',
			 name: 'addmyress',
			 component: AddMyress
	}
]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err)
};

router.push('/home')
export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Mine from '../views/Mine/Mine.vue'
import Category from '../views/Classification/category.vue'
import Goodsdetail from '../views/Classification/Goodsdetail.vue'
import Shopping from '../views/Shopping/Shopping.vue'
import Goodslist from '../views/Classification/Goodslist.vue'
import Havedata from '../views/Shopping/havedata.vue'
import Address from '../components/myaddress.vue'
import AddMyress from '../components/addmyress.vue'
import Comfirm from '../views/Shopping/comfirm.vue'
import Login from '../views/Login/login.vue'
import Register from '../views/Login/register.vue'
import store from '../store/index.js'
import GetAddress from '../views/Mine/getaddress.vue'
import Order from '../views/Mine/order.vue'
Vue.use(VueRouter)

const routes = [{
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
		component: Mine,
		meta: {
			reqireAuth: true
		},
	},
	{
		path: '/category',
		name: 'Category',
		component: Category,

	},
	{
		path: '/goodsdetail',
		name: 'Goodsdetail',
		component: Goodsdetail
	},
	{
		path: '/shopping',
		name: 'Shopping',
		component: Shopping,
		meta: {
			reqireAuth: true
		}

	},
	{
		path: '/goodslist',
		name: 'goodslist',
		component: Goodslist
	},

	{
		path: '/havedata',
		name: 'havedata',
		component: Havedata,
		meta: {
			reqireAuth: true
		}
	},

	{
		path: '/login',
		name: 'login',
		component: Login
	},

	{
		path: '/register',
		name: 'register',
		component: Register
	},
	{
		path: '/getaddress',
		name: 'getaddress',
		component: GetAddress
	},
	{
		path: '/order',
		name: 'order',
		component: Order
	},
	{
		path: '/comfirm',
		name: 'comfirm',
		component: Comfirm,
		meta: {
			reqireAuth: true
		},
		children: [{
				path: 'address',
				name: 'address',
				component: Address,
				children: [{
					path: 'addmyress',
					name: 'addmyress',
					component: AddMyress

				}, ]
			}

		]
	}
]

const router = new VueRouter({
	routes
})
//不能删
router.beforeEach((to,from,next)=>{

	if(to.meta.reqireAuth){
		if(JSON.parse(sessionStorage.getItem('username'))||JSON.parse(localStorage.getItem('username'))){
			next()
		}else{
			store.state.histroyPath = to.fullPath
			next({path:'/login'})
		}
	}else{
		next()
	}
	if(to.fullPath == "/login"){	
		if(JSON.parse(sessionStorage.getItem('username'))||JSON.parse(localStorage.getItem('username'))){
			next({
				path:from.fullPath
			})
		}else{
			next()
		}
	}
})
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
};

router.push('/home')
export default router
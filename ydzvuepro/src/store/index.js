import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		listpath: '',
		indexpath: '124713',
		goodsData: [],
		data: {},
		num:1
	},
	getters: {

	},
	mutations: {
		setData(state, data) {
			//		console.log(data)
			// 注释部分就是最基础的vueX的存储方法

			state.goodsData.push(data)
			state.num = data.num 
			// 改进方法是把token值储存在sessionStorage（会话信息）中，特点是当浏览器关闭时，会话信息会清除掉，增强token的保密性；
			sessionStorage.setItem("data", state.goodsData);

		},
		add(state) {
			state.num++;
		},
		reduce(state) {
			state.num--;
		}
	},
	actions: {},
	modules: {}
})
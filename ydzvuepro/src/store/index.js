import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		listpath: '',
		indexpath: '124713',
		goodsData: [],
		data: {},
		address:[],
		loginstatus:false,
		loginphone:'',
		histroyPath:'',
		goodsDatalist:[]
		
	},
	getters: {

	},
	mutations: {
		setData(state, data) {
			 let result = state.goodsData.some((item)=>{
						if(item.id==data.id){
							item.num = item.num +1;
							return true
						}else{
							
							return false
						}
					})
//			console.log(data)
console.log(result)
			if(!result){
				console.log(1)
				state.goodsData.push(data)
			}
			console.log(state.goodsData)
//			state.goodsData = state.goodsData.

			// 改进方法是把token值储存在sessionStorage（会话信息）中，特点是当浏览器关闭时，会话信息会清除掉，增强保密性；
			sessionStorage.setItem("data", state.goodsDatalist);
			sessionStorage.setItem("address", state.address);
			
		},
		login(state,userid){
			state.loginphone =userid
//			localStorage.setItem("loginphone", userid);
				sessionStorage.setItem("loginphone", userid);
		}
	},
	actions: {},
	modules: {}
})
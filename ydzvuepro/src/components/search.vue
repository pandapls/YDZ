<template>
	<div class="search">
		<form action="/">
			<van-search shape="round" show-action :background="bgcolor" placeholder="免押金租电脑" @search="onSearch"  @focus="onfocus" >
				  <template #action>
				    <div @click="onSearch" class="login" v-show="true">{{login}}</div>
				  </template>
			</van-search> 
		</form>
		<div class="bigsearch" v-show="jug">
			<van-search v-model="value" shape="round" show-action background="#ffffff"  @cancel="oncancel" @input="oninput" >
			</van-search>
			<ul v-for="item,index in msg" class="searchList">
				<li>{{item.title}}</li>
			</ul>
		</div>
		
	</div>
</template>
<script>
	export default {
		name: "search",
		props: ['bgcolor','login'],
		data() {
			return {
				value: '',
				lg:this.login,
				jug:false,
				msg:''
			};
		},
		methods: {
			onSearch(val) {
				console.log("login")
			},
			onfocus(){
				this.jug = true
			},
			oncancel(){
				this.jug = false
			},
			oninput(value){
				this.getHoneData(value)
			},
			getHoneData(value) {
				console.log('https://so.edianzu.com/sug?time=1591193658488&code=92364863cd67fa7cba7daa8b7570c5dd&plat=2&q='+value)
					 fetch('https://so.edianzu.com/sug?time=1591454223802&code=1c3891debdc1d332bb0b8f4464090969&plat=2&q='+value)
					.then(res => res.json())
					.then(data => {
						console.log(data.data);
						this.msg = data.data;
					})
					.catch(function(e) {
						console.log("oops! error:", e.message);
					});
			}
		},
	}
</script>
<style lang="less" scoped="">
	.login{
		color: white;
	}
	.bigsearch{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 110100;
		width: 100%;
		height: 100%;
		background: white;
		.searchList{
			list-style: none;
			li{
				padding: 20/100rem  40/100rem;
				border-bottom:1px solid #f4f4f4 ;
				font-size: 12px;
			}
		}
	}
</style>
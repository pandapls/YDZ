<template>
	<div class="tabbar">
		<Tbchild mark="home" :currname="curr" @change="getVal">
			<span slot="normalImg" class="iconfont icon-shouye"></span>
			<span slot="normalFont">首页</span>
		</Tbchild>
		
		<Tbchild mark="shopping" :currname="curr" @change="getVal">
			<span slot="normalImg" class="iconfont icon-gouwuche"></span>
			<span slot="normalFont">购物车</span>
			<span slot="zero" class="zero">0</span>
		</Tbchild>
		<div class="shoppcat">加入购物车</div>
		<div class="jilixiadan">立即下单</div>
	</div>
</template>
<script>
	import Tbchild from './detailtabbartbchild'
	export default {
		name: "tabbar",
		data:function(){
			return{
				curr:'home'
			}
		},
		methods:{
			getVal(val){
				this.curr=val;
				this.$router.push('/'+this.curr)
			}
		},
		components: {
			Tbchild
		}
	}
</script>

<style lang="less" scoped>
	.tabbar {
		.shoppcat{
			background: #48aeff;
			text-align: center;
			font-size: 28/100rem;
			line-height: 70/100rem;
			width: 25%;
			color: #fff;
		}
		.jilixiadan{
			background: #f5615a;
			color: #fff;
			font-size: 28/100rem;
			line-height: 70/100rem;
			text-align: center;
			width: 25%;
		}
		
		width: 100%;
		display: flex;
		border-top:1px solid #efefef;
		padding: 20/100rem 0;
		position: fixed;
		bottom: 0;
		left: 0;
		font-size: 10px;
		background: white;
		z-index: 1005;
		.zero{
			display: inline-block;
			width: 30/100rem;
			height: 30/100rem;
			line-height: 30/100rem;
			color: white;
			background-color: #e45050;
			border-radius: 50%;
			position: absolute;
			top: -10/100rem;
			right: 40/100rem;
		}
	}
</style>
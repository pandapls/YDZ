<template>
	<div class="tabbar">
		<Tbchild mark="home" :currname="curr" @change="getVal">
			<span slot="normalImg" class="iconfont icon-shouye"></span>
			<span slot="normalFont">首页</span>
		</Tbchild>
		<Tbchild mark="category" :currname="curr" @change="getVal">
			<span slot="normalImg" class="iconfont icon-fenlei"></span>
			<span slot="normalFont">分类</span>
		</Tbchild>
		<Tbchild mark="shopping" :currname="curr" @change="getVal">
			<span slot="normalImg" class="iconfont icon-gouwuche"></span>
			<span slot="normalFont">购物车</span>
			<span slot="zero" class="zero">0</span>
		</Tbchild>
		<Tbchild mark="mine" :currname="curr" @change="getVal">
			<span slot="normalImg" class="iconfont icon-wode"></span>
			<span slot="normalFont">我的</span>
		</Tbchild>
	</div>
</template>
<script>
	import Tbchild from './tbchild'
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

<style lang="less">
	.tabbar {
		width: 100%;
		display: flex;
		border-top:1px solid #efefef;
		padding: 20/100rem 0;
		position: fixed;
		bottom: 0;
		left: 0;
		font-size: 10px;
		background: white;
		z-index: 10000;
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
<template>
	<div class="order">
		<div class="nav">
				<span @click="back"><van-icon name="arrow-left" /></span> 我的订单
		</div>
		<div class="orderbox">
			<div class="title">
				<span><i class="iconfont icon-dingdan"></i>订单详情</span>
				<span class="all">总金额: <span>￥{{oredrdata.allprice}}</span></span>
			</div>
			<div class="orderItem" v-for="item,index in oredrdata">
				<div class="leftbox">
					<img :src="item.imgSrc"/>
				</div>
				<div class="rightbox">
					<p class="datatitle">{{item.title}}</p>
					<p class="yajin"><span>押金：￥{{item.yajin}}</span><span class="red">租金：￥{{item.price}}</span><span>数量：{{item.num}}</span></p>

					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'order',
		data(){
			return {
				oredrdata:[]
			}
		},
		mounted(){
			this.oredrdata= this.$store.state.order
			
		},
		methods:{
			back(){
    			this.$router.go(-1)
    		}
    		
		}
	}
</script>

<style lang="less" scoped>
	.order {
		font-family: "微软雅黑";
		background-color: #ffffff;
	}
	
	.nav {
		text-align: center;
		height: .7rem;
		line-height: .7rem;
		font-size: 14px;
		font-weight: bold;
		border-bottom: 1px solid gainsboro;
		span {
			float: left;
			margin-left: .2rem;
			color: #929292;
		}
	}
	.orderbox{
		padding: 20/100rem;
		.title{
			display: flex;
			height: 50/100rem;
			justify-content: space-between;
			width: 100%;
			font-size:12px;
			span{
				i{
					margin: 0 10/100rem;
					color: #51b3ea;
				}
			}
			.all{
				display: inline-block;
				margin: 5/100rem 0 ;
				span{
					color: red;
				}
			}
		}
		.orderItem{
			width: 100%;
			display: flex;
			height:200/100rem;
			padding: 50/100rem 0 30/100rem 0;
			border-top:1px dashed #d9d9d9 ;
			margin: 10/100rem 0;
			.leftbox{
				width: 30%;
				img{
					width: 90%;
				}
			}
			.rightbox{
				width: 70%;
				font-size: 9px;
				line-height: 35/100rem;
				.datatitle{
					margin: 20/100rem 0;
				}
				.yajin{
					display: flex;
					justify-content: space-between;
					
				}
				.red{
					color: red;
				}
			}
		}
	}
</style>
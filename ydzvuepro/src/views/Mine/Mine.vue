<template>
	<div class="mine">
		<div class="nav">
			<span @click="back"><van-icon name="arrow-left" /></span> 个人中心
		</div>
		<div class="methods">
			{{this.$store.state.loginphone}}
			<span><van-icon name="arrow" /></span>
		</div>
		<div class="order">
			<p class="myorder">我的订单</p>
			<ul>
				<li>
					<span class="iconfont icon-dingdan dingdan"></span>
					<p>全部订单</p>
				</li>
				<li>
					<span class="iconfont icon-zhifudan zhifudan"></span>
					<p>待支付</p>
				</li>
				<li>
					<span class="iconfont icon-daishouhuo daishouhuo"></span>
					<p>待收货</p>
				</li>
			</ul>
		</div>
		<div class="numMoney">
			<p class="noMoney">您尚未申请免押金额度</p>
			<p>可用于下单时抵扣设备押金<span>开通</span></p>
		</div>
		<div class="count">
			<div class="mycount">
				<p class="mysc">我的账户</p>
				<p class="zhanghu"><span class="iconfont icon-zhanghuzichan"></span>账户余额(元)</p>
				<p class="c-zero">0.00<span class="rechange">充值</span></p>
			</div>
			<div class="saveMoney">
				<p>
					<span class="iconfont icon-9"></span>优惠券(张)
				</p>
				<p class="s-num">0</p>
			</div>
		</div>
		<div class="server">
			<p class="sev-tit">其他服务</p>
			<ul>
				<li @click="onAddress">
					<span class="iconfont icon-shouhuodizhi"></span>
					<p>收货地址</p>
						
				</li>
				<li>
					<span class="iconfont icon-rengongfuwu"></span>
					<p>人工服务</p>						
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
    export default{
    	name:"mine",
    	methods:{
    		back(){
    			this.$router.go(-1)
    		},
    		onAddress(){
    			this.$router.push('/address')
    		}
    	},
    	beforeMount(){
		if(this.$store.state.loginstatus){
			return
		}else{
			this.$router.push("/login")
		}
	}
    }
</script>

<style lang="less" scoped>
	@import url("../../assets/mine-icon/iconfont.css");
	.mine {
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
	
	.methods {
		text-align: left;
		height: 1.2rem;
		line-height: 1.2rem;
		color: #717274;
		padding-left: .2rem;
		font-weight: bold;
		font-size: 14px;
		span {
			float: right;
			margin-right: .2rem;
			color: #929292;
		}
	}
	
	.order {
		height: 2.5rem;
		border-top: 10px solid #f4f4f4;
		.myorder {
			line-height: .9rem;
			margin-left: .2rem;
			font-size: 13px;
			color: #363636;
			font-weight: bold;
		}
		ul {
			list-style: none;
			display: flex;
			margin-left: .2rem;
			li {
				flex: 1;
				text-align: center;
				p {
					font-size: 12px;
				}
				span {
					font-size: 25px;
					padding: .2rem;
					border-radius: 50%;
					line-height: 1rem;
					color: white;
				}
				.dingdan {
					background-color: #2f8df1;
				}
				.zhifudan {
					background-color: #f9b000;
				}
				.daishouhuo {
					background-color: #6ddfbb;
				}
			}
		}
	}
	
	.numMoney {
		height: 1.7rem;
		border-top: 10px solid #f4f5f7;
		p {
			margin-left: .2rem;
			font-size: 12px;
			color: #9f9f9f;
			line-height: .5rem;
			span {
				border: 1px solid #1991fe;
				padding: .05rem .3rem;
				border-radius: 1rem;
				color: #1991fe;
				margin-left: 1.9rem;
			}
		}
		.noMoney {
			font-weight: bold;
			font-size: 14px;
			color: #3f3f3f;
			line-height: 1rem;
		}
	}
	
	.count {
		border-top: 10px solid #f6f6f6;
		.mycount {
			border-bottom: 1px solid #f4f4f4;
			height: 1.8rem;
			margin-left: .2rem;
			.mysc {
				font-weight: bold;
				font-size: 14px;
				line-height: .8rem;
			}
			.zhanghu {
				font-size: 12px;
				color: #a4a4a4;
				span {
					color: #379fe2;
					font-size: 12px;
					margin-right: .1rem;
				}
			}
			.c-zero {
				margin-left: .5rem;
				line-height: .65rem;
				span {
					border: 1px solid #1991fe;
					padding: .05rem .25rem;
					border-radius: 1rem;
					color: #1991fe;
					margin-left: 3.7rem;
					font-size: 10px;
				}
			}
		}
		.saveMoney {
			height: 1.1rem;
			font-size: 12px;
			color: #a4a4a4;
			p {
				margin-left: .2rem;
				line-height: .8rem;
				span {
					color: #379fe2;
					font-size: 14px;
					margin-right: .1rem;
				}
			}
			.s-num{
				line-height: .1rem;
				font-size: 14px;
				font-weight: bold;
				color: #2c3e50;
				margin-left: .7rem;
			}
		}
	}
	.server{
		height: 4rem;
		border-top: 10px solid #f4f5f7;
		.sev-tit{
			text-indent: .2rem;
			height: .8rem;
			line-height: .8rem;
			border-bottom: 1px solid #f4f5f7;
			font-size: 14px;
			font-weight: bold;
		}
		ul{
			list-style: none;
			display: flex;
			margin-top: .2rem;
			li{
				flex: 1;
				text-align: center;
				span{
					font-size: 25px;
					padding: .2rem;
					border-radius: 50%;
					line-height: 1rem;
					color: white;
					background-color: #3a9efc;
				}
				p{
					font-size: 12px;
				}
			}
		}
	}
</style>
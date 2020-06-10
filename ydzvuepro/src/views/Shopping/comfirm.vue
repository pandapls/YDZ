<template>
	<div>
		<router-view></router-view>
		<div class="confirm">
			<div class="nav">
				<span><van-icon name="arrow-left"  @click="back"/></span> 确认订单
			</div>
			<div class="address" @click="goaddress">
				<p v-show="isshow">请选择收获地址</p>
				<p v-show="!isshow" v-for="item in address">
					{{item.username}}&nbsp;{{item.phone}}
					<span>{{item.xiangxidizhi}}</span>
				</p>
				<i class="icon"><van-icon name="arrow" /></i>
			</div>

			<div class="goodshow">
				<p class="tlt">
					租凭商品
				</p>
				<div class="item clearfloat">
					<div class="content" v-for="item,index in goods">
						<div class="img">
							<img :src="item.imgSrc" />
						</div>
						<div class="dec">
							<p class="title"><span>随租随还</span> {{item.title}}</p>
							<p class="scr">本商品租期为<span>36</span>个月，租期结束后设备归还易点租</p>
						</div>
						<div class="bottom">
							<p class="yajin">押金：<span>￥{{item.yajin}}</span><span class="num">×{{item.num}}</span></p>
							<p class="check">
								<i class="radio-box select-all" @click="check2 = !check2">
								<van-icon name="circle" class="radio" v-show="check2"/>
								<van-icon name="passed"  class="radio radio-check" v-show="!check2"/>	
							</i>
								<span>租金从押金扣</span>
								<i><van-icon name="question-o" /></i>
							</p>
							<p class="zujin">租金：<span>￥{{item.price}}/月</span> (首付期数：1/36)</p>
							<p class="time">起始日期：2020-06-09</p>
						</div>
					</div>
				</div>
			</div>
			<div class="beizhu">
				<p>订单备注</p>
				<textarea placeholder="选填，此处填写您对订单的其他要求"></textarea>
			</div>
			<div class="platmethod">
				<p>支付方式：</p>
				<div>
					<span>
					<i class="radio-box select-all" @click="check=!check">
								<van-icon name="circle" class="radio" v-show="check"/>
								<van-icon name="passed"  class="radio radio-check" v-show="!check"/>	
							</i>
					在线支付
				</span>
					<span>
					<i class="radio-box select-all"  @click="check=!check">
								<van-icon name="circle" class="radio" v-show="!check"/>
								<van-icon name="passed"  class="radio radio-check" v-show="check"/>	
							</i>
					货到付款
				</span>
				</div>
			</div>
			<div class="pricebox">
				<p>应付押金<span>￥{{allyajin}}</span></p>
				<p>应付租金<span>￥{{allzujin}}</span></p>
				<p>免押金抵扣<span class="red">-￥0</span></p>
				<p>增值保障<span>￥0</span></p>
				<p class="all">应付总计<span>￥{{allprice}}</span></p>
				<p>当前需付<span class="red big">￥{{allprice}}</span></p>
			</div>
			<div class="xieyi">
				<p>我已经阅读并同意
					<a href="/">《易点租租凭服务协议》</a>

					<i class="radio-box select-all" @click="change">
					<van-icon name="circle" class="radio" v-show="!isCheck"/>
					<van-icon name="passed"  class="radio radio-check" v-show="isCheck"/>	
				</i>
				</p>
			</div>
			<button class="btn" @click="submit">提交订单</button>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'comfirm',
		data: function() {
			return {
				goods: [],
				isCheck: true,
				check: true,
				check2: true,
				yajin: [],
				zujin: [],
				allyajin: 0,
				allzujin: 0,
				allprice: 0,
				address: [],
				isshow: true,
				val:''
			}
		},
		mounted() {
			this.goods = this.$store.state.goodsData
			for(let i = 0; i < this.goods.length; i++) {
				this.yajin.push(this.goods[i].yajin)
				this.zujin.push(this.goods[i].price)
			}
			this.Allprice()
			
			
		},
		beforeUpdate(){
			this.getaddress()
		},
		computed: {

		},
		methods: {
			change() {
				this.isCheck = !this.isCheck
			},
			goaddress() {
				this.$router.push('/comfirm/address')
				//				this.isShow = true
			},
			back() {
				this.$router.go(-1)

			},
			Allprice() {
				let y = 0;
				let z = 0;
				if(this.goods.length == 1) {
					y = this.yajin[0];
					z = this.zujin[0];
					this.allyajin = y
					this.allzujin = z
					this.allprice = (parseInt(y) + parseInt(z)) * this.$store.state.num
				} else {
					for(let i = 0; i < this.yajin.length; i++) {
						y += parseInt(this.yajin[i])
						this.allyajin = y
					}
					for(let i = 0; i < this.zujin.length; i++) {
						z += parseInt(this.zujin[i])
						this.allzujin = z

					}
					this.allprice = parseInt(y) + parseInt(z)
				}

			},
			submit() {
				this.$toast('提交成功');
			},
			getaddress() {
				if(this.$store.state.address.length > 0) {
					this.address = this.$store.state.address.filter((item) => {
						return item.nowCheck == true
					})
					this.isshow = false
				}
			}
		}

	}
</script>

<style lang="less" scoped>
	.confirm {
		background: #f5f7f9;
		margin-bottom: 150/100rem;
		overflow: auto;
		.nav {
			text-align: center;
			height: .7rem;
			line-height: .7rem;
			font-size: 14px;
			font-weight: bold;
			border-bottom: 3px solid #fafafa;
			background: white;
			span {
				float: left;
				margin-left: .2rem;
				color: #929292;
			}
		}
		.address {
			background: white;
			padding: 0 20/100rem;
			font-size: 12px;
			height: 100/100rem;
			line-height: 100/100rem;
			position: relative;
			p{
				span {
				position: absolute;
				bottom: -30/100rem;
				left: 20/100rem;
			}
			}
			.icon {
				font-size: 18px;
				position: absolute;
				right: 20/100rem;
				top: 10/100rem;
			}
		}
		.goodshow {
			margin: 10/100rem 0;
			padding: 0 20/100rem;
			background: white;
			.tlt {
				line-height: 100/100rem;
				font-size: 12px;
				color: #a1a6a8;
			}
			.item {
				.time {
					font-size: 12px;
				}
				.content {
					height: 250/100rem;
					/*padding:5/100rem 0;*/
					width: 100%;
					position: relative;
					>div {
						float: left;
					}
					.img {
						width: 50px;
						height: 50px;
						margin: 10/100rem 0;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.dec {
						width: 80%;
						line-height: 40/100rem;
						font-size: 11px;
						margin-left: 20/100rem;
						color: #82888c;
						.title {
							width: 450/100rem;
							overflow: hidden;
							white-space: normal;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							span {
								display: inline-block;
								padding: 1px;
								border: 1px solid red;
								color: red;
							}
						}
						.scr {
							font-size: 10px;
							span {
								color: red;
								margin: 0 5/100rem;
							}
						}
					}
					.bottom {
						width: 100%;
						margin-bottom: 50/100rem;
						.yajin {
							font-size: 12px;
							color: #777e82;
							width: 100%;
							position: relative;
							.num {
								position: absolute;
								right: 0;
								top: 5/100rem;
							}
						}
						.check {
							font-size: 12px;
							line-height: 60/100rem;
							height: 60/100rem;
							position: relative;
							border-bottom: 1px dashed #e7e7e7;
							span {
								display: inline-block;
								margin: 0 10/100rem;
								text-indent: 60/100rem;
							}
							i {
								display: inline-block;
								margin: 10/100rem;
								font-size: 16px;
								position: absolute;
								bottom: -2/100rem;
								color: #37a3ff;
							}
						}
						.zujin {
							font-size: 10px;
							padding: 20/100rem 0;
							span {
								color: red;
							}
						}
					}
				}
			}
		}
		.beizhu {
			margin: 10/100rem 0;
			background: white;
			height: 240/100rem;
			padding: 15/100rem;
			p {
				font-size: 12px;
			}
			textarea {
				margin: 10/100rem 0;
				font-size: 10px;
				padding: 20/100rem 10/100rem;
				background: #f5f4f2;
				width: 95%;
				height: 150/100rem;
				border: none;
			}
		}
		.platmethod {
			height: 100/100rem;
			background: white;
			width: 100%;
			padding: 10/100rem;
			p {
				font-size: 12px;
			}
			div {
				width: 100%;
				height: 50/100rem;
				display: flex;
				justify-content: space-around;
				text-align: center;
				span {
					margin-top: 10/100rem;
					font-size: 12px;
					display: inline-block;
					flex: 1;
					position: relative;
					i {
						position: absolute;
						top: 0/100rem;
						left: 35/100rem;
						font-size: 18px;
						color: #37a3ff;
					}
				}
			}
		}
		.pricebox {
			padding: 10/100rem 20/100rem;
			background: white;
			line-height: 60/100rem;
			font-size: 12px;
			color: #9f9f9f;
			.all {
				border-top: 1px dashed #e4e4e4;
			}
			span {
				float: right;
				color: #505050;
			}
			.red {
				color: red;
			}
			.big {
				font-size: 14px;
			}
		}
		.xieyi {
			margin: 10/100rem 0;
			background: white;
			line-height: 70/100rem;
			padding: 0 20/100rem;
			font-size: 10px;
			a {
				color: #37a3ff;
				margin: 0 10/100rem;
			}
			i {
				font-size: 16px;
				float: right;
				margin-top: 10/100rem;
				color: #37a3ff;
			}
		}
		.btn {
			background: #37a3ff;
			width: 80%;
			height: 60/100rem;
			margin: 10/100rem 60/100rem;
			border: none;
			border-radius: 115px;
			color: white;
			font-size: 12px;
		}
	}
	/*清除浮动*/
	
	.clearfloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}
</style>
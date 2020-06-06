<template>
	<div class="shop">
		<div class="nav">
			<span @click="back"><van-icon name="arrow-left" /></span> 购物车
		</div>
		<div class="free">
			<p>您当前可用金额免押额度为：<span>￥0</span></p>
		</div>
		<div class="Goods">
			<div class="title">
				<i class="radio-box select-all">
					<van-icon name="circle" class="radio" v-show="false"/>
					<van-icon name="passed"  class="radio radio-check"/>
					
				</i> 租凭商品
			</div>
			<div class="item" v-for="(item,index) in goodsData">
				<mt-cell-swipe :right="[
			    {
			      content: '删除',
			      style: { background: 'red', color: '#fff' },
			      handler: () => this.$messagebox('delete')
			    }
			  ]">
					<template #title>
						<div class="itemSlide">
							<i class="radio-box">
						<van-icon name="circle" class="radio" v-show="false"/>
						<van-icon name="passed"  class="radio radio-check"/>
					</i>
							<div class="content">
								<div class="img">
									<img :src="item.imgSrc" />
								</div>
								<div class="dec">
									<span>随租随还</span> {{item.title}}
								</div>
								<div class="bottom">
									<p>押金：<span class="yajing">￥{{item.yajin}}</span></p>
									<p>租金：<span class="price">￥{{item.price}}/月</span>首付期款：1/36</p>
									<div class="btn">
										<span class="reduce" @click="reduce">-</span>
										<span class="num">{{$store.state.num}}</span>
										<span class="add" @click="add">+</span>
									</div>
								</div>
							</div>
						</div>
					</template>
				</mt-cell-swipe>
				<div class="time">
					<van-cell title="起始日期：" :value="date" @click="show = true" className="time" />
					<van-calendar v-model="show" @confirm="onConfirm" color="#95c6e7" />
				</div>
			</div>

		</div>

		<div class="bottombox">
			<div class="check">
				应付总计：￥<span class="allprice">{{allprice}}</span>
				<span class="checkdetail">查看明细></span>
			</div>
			<div class="box">
				<span class="checkall">
					<i class="radio-box select-all">
						<van-icon name="circle" class="radio" v-show="false"/>
						<van-icon name="passed"  class="radio radio-check"/>	
					</i>
					全选
				</span>
				<span class="real">实付款:<span>￥{{allprice}}</span></span>
				<button class="play">去结算</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "havedata",
		data() {
			return {
				date: '',
				show: false,
				goodsData: [],
				yajin: [],
				zujin: [],
				allprice: 0
			};
		},
		mounted() {
			let data = new Date()
			this.date = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`
			
			this.goodsData = this.$store.state.goodsData
			for(let i = 0; i < this.goodsData.length; i++) {
				this.yajin.push(this.goodsData[i].yajin)
				this.zujin.push(this.goodsData[i].price)
			}

			console.log(this.goodsData)
			this.Allprice()

		},
		methods: {
			back() {
				this.$router.go(-1)
			},
			formatDate(date) {
				let data = new Date()
				return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			},
			onConfirm(date) {
				this.show = false;
				//				console.log(this.formatDate(date))
				this.date = this.formatDate(date);
			},
			add() {
				this.$store.commit('add')
				this.Allprice()
			},
			reduce() {
				this.$store.commit('reduce')
				this.Allprice()
			},
			Allprice() {
				console.log(this.yajin, this.zujin)
				let y=0;
				let z=0;
				if(this.goodsData.length == 1) {
					
					y = this.yajin[0];
					z =  this.zujin[0];
					
					this.allprice = (parseInt(y) + parseInt(z))*this.$store.state.num 
					console.log(1)
				} else {
					
					console.log(2)
					for(let i = 0; i < this.yajin.length; i++) {
						y += parseInt(this.yajin[i])
						console.log(parseInt(this.yajin[i]) )
					}
					for(let i = 0; i < this.zujin.length; i++) {
						z += parseInt(this.yajin[i])
					}
					console.log(y,z)
					this.allprice = parseInt(y) + parseInt(z)
				}

			},
			
		}
	}
</script>

<style scoped lang="less">
	.mint-cell-swipe-button {
		line-height: 258/100rem!important;
	}
	
	.van-cell__title {
		font-size: 10px;
		margin-left: 50/100rem;
	}
	
	.van-cell__value {
		position: absolute;
		left: 180/100rem;
		font-size: 12px;
		border: 1px solid #d8d8d8;
		border-radius: 10px;
		color: #7b7b7b;
		padding: 0 10/100rem;
	}
	
	.shop {
		height: 100%;
		width: 100%;
		background: white;
		z-index: 211111;
		position: fixed;
		top: 0;
		left: 0;
		overflow: auto;
		
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
		.free {
			font-size: 10px;
			background: #fff7ec;
			text-align: center;
			line-height: 50/100rem;
			color: #666d71;
			span {
				color: #e45171;
			}
		}
		.Goods {
			padding: 10/100rem;
			margin-bottom: 200/100rem;
			.title {
				font-size: 10px;
				position: relative;
				line-height: 50/100rem;
				text-indent: 60/100rem;
				.radio-box {
					font-size: 16px;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					left: -27%;
				}
			}
			.item {
				height: 400/100rem;
				.time {
					font-size: 12px;
				}
				.itemSlide {
					position: relative;
					height: 300/100rem;
					.radio-box {
						position: absolute;
						top: 50%;
						left: -10/100rem;
						transform: translateY(-50%);
					}
					.content {
						position: absolute;
						left: 60/100rem;
						top: 50/100rem;
						height: 250/100rem;
						width: 85%;
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
							width: 360/100rem;
							line-height: 30/100rem;
							font-size: 10px;
							margin-left: 20/100rem;
							color: #82888c;
							span {
								display: inline-block;
								padding: 1px;
								border: 1px solid red;
								color: red;
							}
						}
						.bottom {
							position: absolute;
							bottom: 20/100rem;
							font-size: 12px;
							color: #697074;
							line-height: 40/100rem;
							.price {
								color: red;
								margin: 0 10/100rem;
							}
							.btn {
								position: absolute;
								bottom: 0;
								right: -150/100rem;
								border-radius: 5px;
								border: 1px solid #dbdbdb;
								span {
									padding: 10/100rem;
								}
								.num {
									padding: 7/100rem 12/100rem;
									border: 1px solid #dbdbdb;
									border-top: none;
									border-bottom: none;
								}
							}
						}
					}
				}
			}
		}
	}
	
	.bottombox {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		font-size: 11px;
		.check {
			width: 100%;
			line-height: 50/100rem;
			background: #fff7ec;
			text-align: center;
			.checkdetail {
				color: red;
				margin: 0 20/100rem;
			}
		}
		.box {
			line-height: 100/100rem;
			height: 100/100rem;
			background: white;
			position: relative;
			.checkall {
				position: absolute;
				left: 20/100rem;
			}
			.real {
				position: absolute;
				right: 220/100rem;
				span {
					margin: 0 10/100rem;
					color: red;
				}
			}
			.play {
				position: absolute;
				right: 0;
				width: 200/100rem;
				background: #37a3ff;
				border: none;
				color: white;
				font-size: 14px;
				height: 100/100rem;
			}
		}
	}
	
	.radio {
		color: #1f9cdd;
	}
	
	.goods-card {
		margin: 0;
		background-color: white;
	}
	
	.delete-button {
		height: 100%;
	}
</style>
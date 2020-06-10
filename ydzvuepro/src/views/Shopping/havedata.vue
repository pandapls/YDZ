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
					<van-icon name="circle" class="radio" v-show="false" />
					<van-icon name="passed"  class="radio radio-check"/>
					
				</i> 租凭商品
			</div>
			<div class="item" v-for="(item,index) in updata">
				<mt-cell-swipe :right="[
			    {
			      content: '删除',
			      style: { background: 'red', color: '#fff' },
			      handler: () => deleteCell(item,index)
			    }
			  ]">
					<template #title>
						<div class="itemSlide">
							<i class="radio-box" @click="setSelet(item)">
								<van-icon name="circle" class="radio"  v-show="!item.Checkstate"/>
								<van-icon name="passed"  class="radio radio-check" v-show="item.Checkstate"/>
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
										<span class="reduce" @click="changeMoney(item,-1)">-</span>
										<span class="num">{{item.num}}</span>
										<span class="add" @click="changeMoney(item,1)">+</span>
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
					<i class="radio-box select-all"  @click="checkAll">
						<van-icon name="circle" class="radio" v-show="!checkAllFlag"/>
						<van-icon name="passed"  class="radio radio-check" v-show="checkAllFlag"/>	
					</i>
					全选
				</span>
				<span class="real">实付款:<span>￥{{allprice }}</span></span>
				<button class="play" @click="gotocomfirm">去结算</button>
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
				allpricearr:[],
				allprice: 0,
				isshow: true,
				checkAllFlag: true,
				circle: 'circle',
				passed: 'passed'
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
			this.Allprice()
		},
		computed: {
			updata() {
				return this.$store.state.goodsData

			}
		},
		methods: {
			setSelet(item) {
				let num = 0;
				if (typeof item.Checkstate == "undefined") {
					this.$set(item, "Checkstate", true);

				} else {
					item.Checkstate = !item.Checkstate;
				}
				this.goodsData.forEach(function (item, value) {
					if (item.Checkstate) {
						num++;
					}
				})
				// 如果选中的商品种类个数等于商品列表（数组）的长度，修改全选框的全选标志；
				if (num ==this.goodsData.length) {
					this.checkAllFlag = true;
				} else {
					this.checkAllFlag = false;
				}
				// 计算总价
				this.Allprice()
			},
			checkAll(){
				this.checkAllFlag = !this.checkAllFlag;
				this.goodsData.forEach((item, index)=>{
					if (typeof item.Checkstate == "undefined") {
						// 设置item的check属性
						this.$set(item, "Checkstate", this.checkAllFlag);
					} else {
						item.Checkstate = this.checkAllFlag;
					}
				})
				// 计算总价
				this.Allprice();

			},
			back() {
				console.log(this.$store.state.histroyPath)
				this.$router.push('/goodsdetail')
//				this.$router.go(-1)
			},
			formatDate(date) {
				let data = new Date()
				return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
			},
			onConfirm(date) {
				this.show = false;
				this.date = this.formatDate(date);
			},
			changeMoney: function (product, num) {
					if (num > 0) {
						product.num++;
					} else {
						product.num--;
						if (product.num < 1) {
							product.num = 1;
						}
					}
					// 每次修改商品数量之后，均重新计算商品总价
					this.Allprice();
			},
			Allprice() {
					this.allprice =0
					this.goodsData.forEach((item,index)=>{
						if(item.Checkstate){
							this.allprice += (parseInt(item.yajin)+parseInt(item.price))*parseInt(item.num)
						}
					})
					
					

				
			},
			deleteCell(val, index) {
				let deletindex =  this.$store.state.goodsData.indexOf(val)
				this.$store.state.goodsData.splice(index,1)
				this.goodsData = this.$store.state.goodsData
				this.Allprice()
				if(this.$store.state.goodsData.length== 0) {
					this.allprice=0
					
					this.$router.push('/shopping')
				}
			},
			gotocomfirm() {
				this.$router.push('/comfirm')
			}

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
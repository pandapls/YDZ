<template>
	<div class="nav animate__animated animate__zoomIn">
		<div class="navbox">
			<div @click="moren" :class="{active:index==1}">
				默认排行
			</div>
			<div @click="changeSell" :class="{active:index==2}">
				销量
				<div class="sort">
					<span class="icon iconfont icon-icon-test3 " :class="sortstatu3?'active2':''"></span>
					<span class="icon iconfont icon-icon-test4 " :class="sortstatu4?'active2':''"></span>
				</div>
			</div>
			<div @click="changePri" :class="{active:index==3}">
				价格
				<div class="sort">
					<span class="icon iconfont icon-icon-test3 " :class="sortstatu?'active2':''"></span>
					<span class="icon iconfont icon-icon-test4 " :class="sortstatu2?'active2':''"></span>
				</div>
			</div>
			<div class="active" @click="showRight">
				筛选
			</div>
		</div>
		<div class="mark" v-show="isShow">
			<div class="popup animate__animated " :class="ani">
				<div class="title">
					<van-icon name="arrow-left" @click="back" />
					<span>筛选</span>
				</div>
				<div class="labels">
					<p class="title">分类：</p>
					<div class="labelbox clearfloat">
						<span class="label" v-for="item,index in Sxlist" :key="index" @click="getIndex(index)" :class="{active:jug==index}">{{item.k}}</span>
					</div>
				</div>
				<div class="labels" v-for="zitem,zindex in labels.personal">
					<p class="title">{{zitem.label}}：</p>
					<div class="labelbox clearfloat">
						<span class="label" v-for="items,indexs in zitem.content" @click="getIndex2(items,zindex,indexs)" :class="{active:indexs==zitem.zindex}">{{items.k}}</span>

					</div>
				</div>
			</div>
		</div>
		<lazy-component>

			<section class="content " v-for="(item,index) in Goodslist" @click="godetail(item)">
				<div class="bleft">
					<img :src="item.pic" />
				</div>
				<div class="bright">
					<p class="title"><span class="red">{{item.title.substring(1,3)}}</span>{{item.title}}</p>
					<p class="dec clearfloat">
						<span>固定租期</span>
						<span>固定租期</span>
					</p>
					<p class="price">￥<span>{{item.price}}</span></p>
				</div>
			</section>

		</lazy-component>
	</div>
</template>

<script>
	export default {
		name: 'navitem',
		data: function() {
			return {
				Goodslist: [],
				show: false,
				isShow: false,
				Sxlist: [],
				labels: [],
				jug: 0,
				jug2: false,
				num: 0,
				ani: 'animate__fadeInRight',
				index: 1,
				sortstatu: false,
				sortstatu2: false,
				sortstatu3: false,
				sortstatu4: false,
				active2: 'active2',
				flag: true,
				flag2: true
			}
		},

		mounted: function() {
			this.getHoneData("http://localhost:8000/" + this.$store.state.listpath);
			this.getSXData("http://localhost:8000/subscreen")

		},
		methods: {
			getHoneData(path) {
				fetch(path)
					.then(res => res.json())
					.then(data => {
						this.Goodslist = data;
					})
					.catch(function(e) {
						console.log("oops! error:", e.message);
					});
			},
			getSXData(path) {
				fetch(path)
					.then(res => res.json())
					.then(data => {
						this.Sxlist = data[0].content;
						this.labels = this.Sxlist[0]
					})
					.catch(function(e) {
						console.log("oops! error:", e.message);
					});
			},
			showRight() {
				this.isShow = true
				this.ani = "animate__fadeInRight"
			},
			getIndex(val) {
				this.labels = this.Sxlist[val]
				this.jug = val
			},
			getIndex2(items, zindex, indexs) {
				this.labels.personal[zindex] = indexs
			},
			back() {
				this.isShow = false
				this.ani = "animate__fadeOutRight"
			},
			changeSell() {
				this.index = 2
				this.sortstatu = false
				this.sortstatu2 = false

				if(this.flag2) {
					this.sortstatu3 = true
					this.sortstatu4 =false;
					this.flag2 = false

					function sortRule(a, b) {
						return b.saleCount - a.saleCount
					}
					this.Goodslist.sort(sortRule)
				} else {
					this.sortstatu3 = false
					this.sortstatu4 = true;
					this.flag2 = true

					function sortRule(a, b) {
						return a.saleCount - b.saleCount
					}
					this.Goodslist.sort(sortRule)
				}

			},
			changePri() {
				this.index = 3
				this.sortstatu3 = false
				this.sortstatu4 = false;

				if(this.flag) {
					this.sortstatu = true
					this.sortstatu2 = false;
					this.flag = false

					function sortRule(a, b) {
						return parseInt(a.price) - parseInt(b.price)

					}
					this.Goodslist.sort(sortRule)
				} else {
					this.sortstatu = false
					this.sortstatu2 =true;
					this.flag = true

					function sortRule(a, b) {
						return parseInt(b.price) - parseInt(a.price)
					}
					this.Goodslist.sort(sortRule)
				}

				//				console.log('chang',this.Goodslist.sort(sortRule))
			},

			moren() {
				this.index = 1
				this.sortstatu3 = false
				this.sortstatu4 = false;
				this.sortstatu = false
				this.sortstatu2 = false

				this.getHoneData("http://localhost:8000/" + this.$store.state.listpath);
			},
			godetail(val) {
				this.$store.state.indexpath = val.id
				this.$router.push({
					path: '/goodsdetail'
				})
			}

		}
	}
</script>

<style scoped lang="less">
	@import url("../../assets/iconfont2/iconfont.css");
	* {
		margin: 0;
		padding: 0;
	}
	
	.nav {
		background: white;
		.navbox {
			height: 75/100rem;
			line-height: 75/100rem;
			display: flex;
			font-size: 10px;
			>div {
				flex: 1;
				text-align: center;
				position: relative;
				.sort {
					position: absolute;
					top: -5/100rem;
					right: 5/100rem;
					width: 30/100rem;
					height: 60/100rem;
					span {
						height: 12/100rem;
						float: left;
						color: #000000;
					}
					.active2 {
						color: #1fb3ea;
					}
				}
			}
			.active {
				color: #1fb3ea;
			}
		}
		.mark {
			width: 100%;
			height: 100%;
			position: fixed;
			right: 0;
			top: 0;
			background: rgba(0, 0, 0, .3);
			z-index: 20000;
			overflow: hidden;
		}
		.popup {
			height: 100%;
			width: 80%;
			background: white;
			position: fixed;
			right: 0%;
			top: 0;
			transition: 1s all;
			overflow: auto;
			z-index: 21000;
			>.title {
				font-size: 14px;
				color: #bfbfbf;
				padding: 0 10/100rem;
				height: 80/100rem;
				line-height: 100/100rem;
				font-size: 18px;
				position: relative;
				border-bottom: 1px solid #eeeeee;
				span {
					font-size: 14px;
					color: #5f5f5f;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}
			.labels {
				padding: 10/100rem;
				overflow: hidden;
				.title {
					font-size: 12px;
				}
				.labelbox {
					padding: 10/100rem;
					line-height: 20px;
					.label {
						float: left;
						width: 135/100rem;
						text-align: center;
						margin-bottom: 10/100rem;
						margin-right: 6/100rem;
						display: inline-block;
						padding: 4/100rem 8/100rem;
						background: #f0f2f5;
						font-size: 9.6px;
						border-radius: 10px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						border: 1px solid #f0f2f5;
						box-sizing: border-box;
					}
					.active {
						background: white;
						border: 1px solid #2ba1ff;
						color: #2ba1ff;
					}
				}
			}
		}
		.content {
			display: flex;
			padding: 20/100rem;
			&:last-of-type {
				margin-bottom: 100px;
			}
			.bleft {
				width: 30%;
				padding: 10/100rem;
				img {
					width: 150/100rem;
				}
			}
			.bright {
				font-size: 10/100rem;
				width: 70%;
				.title {
					line-height: 35/100rem;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					word-break: break-all;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.red {
					display: inline-block;
					background: #ef3e56;
					color: white;
					line-height: 25/100rem;
					padding: 0 5/100rem;
					margin-right: 10/100rem;
					border-radius: 5/100rem;
				}
				.dec {
					margin: 10/100rem 0;
					>span {
						display: inline-block;
						padding: 3/100rem;
						color: #ef334d;
						border: 1px solid #ef334d;
						margin-right: 10/100rem;
						border-radius: 8/100rem;
					}
				}
				.price {
					color: #f0334d;
					font-size: 24/100rem;
					span {
						font-size: 30/100rem;
					}
				}
			}
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
<template>
	<div class="nav">
		<div class="navbox">
			<div class="active">默认排行</div>
			<div>销量</div>
			<div>价格</div>
			<div class="active" @click="showRight">
					筛选
			</div>
		</div>
		<div class="mark" v-show="isShow">
			<div class="popup" >
			<div class="title">
				<van-icon name="arrow-left" @click="back"/>
				<span>筛选</span>
			</div>
			<div class="labels" >
				<p class="title" >分类：</p>
				<div class="labelbox clearfloat"  >
					<span class="label" v-for="item,index in Sxlist" :key="index" @click="getIndex(index)" :class="{active:jug==index}">{{item.k}}</span>
				</div>
			</div>
			<div class="labels" v-for="zitem,zindex in labels.personal">
				<p class="title" >{{zitem.label}}：</p>
				<div class="labelbox clearfloat" >
					<span class="label" v-for="items,indexs in zitem.content"   @click="getIndex2(indexs)" :class="{active:getIndex2==indexs}" >{{items.k}}</span>

				</div>
			</div>
		</div>
		</div>
		<section class="content" v-for="(item,index) in Goodslist">
			<div class="bleft">
				<img :src="item.pic" />
			</div>
			<div class="bright">
				<p class="title"><span class="red">{{item.title.substring(1,3)}}</span>{{item.title}}</p>
				<p class="dec">
					<span>固定租期</span>
					<span>固定租期</span>
				</p>
				<p class="price">￥<span>{{item.price}}</span></p>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: 'navitem',
		data: function() {
			return {
				Goodslist: [],
				show: false,
				isShow:false,
				Sxlist:[],
				labels:[],
				jug:0,
				jug2:false,
				num:0
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
//						console.log(data);
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
//						console.log(data);
						this.Sxlist = data[0].content;
						this.labels = this.Sxlist[0]
					})
					.catch(function(e) {
						console.log("oops! error:", e.message);
					});
			},
			showRight(){
				this.isShow=true
				
			},
			getIndex(val){
				this.labels=this.Sxlist[val]
				console.log(this.labels)
				this.jug = val
			},
			getIndex2(index){
					return index
			},
			back(){
				this.isShow=false
			}
		}
	}
</script>

<style scoped lang="less">
*{
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
			}
			.active {
				color: #1fb3ea;
			}
		}
		.mark{
			width: 100%;
			height: 100%;
			position: fixed;
			right: 0;
			top: 0;
			background: rgba(0,0,0,.3);
   			 z-index: 20000;
   			 overflow: hidden;
		}
		.popup{
			height: 100%;
			width: 80%;
			background: white;
			position: fixed;
			right: 0;
			top: 0;
			    overflow: auto;
			z-index: 21000;
			>.title{
				font-size: 14px;
				color: #bfbfbf;
				padding:0 10/100rem;
				height: 80/100rem;
				line-height: 100/100rem;
				font-size: 18px;
				position:relative;
				border-bottom:1px solid #eeeeee;
				span{
					font-size: 14px;
					color: #5f5f5f;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
				}
			}
			.labels{
				padding: 10/100rem;
				overflow: hidden;
				.title{
					font-size: 12px;
				}
				.labelbox{
					padding: 10/100rem;
					line-height: 20px;
					.label{
						
						float: left;
						width: 135/100rem;
						text-align: center;
						margin-bottom: 10/100rem ;
						margin-right: 6/100rem ;
						display: inline-block;
						padding: 4/100rem 8/100rem ;
						
						background: #f0f2f5;
						font-size: 9.6px;
						border-radius: 10px;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						border: 1px solid  #f0f2f5;
						box-sizing: border-box;
					}
					.active{
						background: white;
						border: 1px solid #2ba1ff;
						color: #2ba1ff ;
					}
				}
			}
		}
		.content {
			display: flex;
			padding: 20/100rem;
			&:last-of-type{
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
					color: #ef334d;
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
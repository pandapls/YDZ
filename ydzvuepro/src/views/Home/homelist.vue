<template>
		<section class="homelistBox">
			<div class="homlist" v-for="(item,index) in homelist" :key="index" >
				<div class="htitle">
					<span>{{item.htitle}}</span>
				</div>
				<ul class="clearfloat"  :class="index%2!=0?'event':'content'">
					<li v-for="(zitem,zindex) in item.list" :key="zindex" @click="getPath(zitem)">
						<router-link to="/goodsdetail">
							<img :src="zitem.imgSrc" />
							<p class="name">{{zitem.name}}</p>
							<p class="price">￥{{zitem.price}}/月</p>
							
						</router-link>
					</li>
					
				</ul>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: "homelist",
		data: function() {
			return {
				homelist: []
			}
		},
		mounted: function() {
			this.getHoneData("http://localhost:8000/homelist");
		},
		methods: {
			getHoneData(path) {
				fetch(path)
					.then(res => res.json())
					.then(data => {
//						console.log(data);
						this.homelist = data;
					})
					.catch(function(e) {
						console.log("oops! error:", e.message);
					});
			},
			getPath(val){
				console.log(val)
				 this.$store.state.listpath =val
			}
		}
	}
</script>

<style scoped lang="less">
.homelistBox{
	margin-bottom: 150/100rem;
	.homlist {
		margin: 20/100rem 0;
		background: white;
		.htitle {
			text-align: center;
			width: 100%;
			line-height: 100/100rem;
			border-bottom: 1px solid #f2f2f2;
			>span {
				color: #9d83e7;
				display: inline-block;
				padding: 0 50/100rem;
				background: url(../../assets/image/indeximg/bg.png) 0px 38/100rem no-repeat;
				background-size: contain;
			}
		}
		.content {
			list-style: none;
			li {
				float: left;
				padding: 25/100rem;
				border: 1px solid #f2f2f2;
				font-size: 12px;
				width: 41%;
				height: 180/100rem;
				box-sizing: content-box;
				border-right: none;
				position: relative;
				text-align: left;
				img{
					height: auto;
					width:140/100rem;
					position: absolute;
					bottom: 0;
					left: 120/100rem;
				}
				.name{
					font-size: 9.6px;
					color:#b1a8c1;
				}
				.price{
					color: #e77285;
					font-size: 9.6px;
					margin: 20/100rem 0;
				}
				&:first-child {
					height: 414/100rem;
					border-right: none;
					img{
						height: auto;
						width:200/100rem;
						position: absolute;
						bottom: 30/100rem;
						left: 60/100rem;
					}
				}
			}
		}
		.event{
			list-style: none;
				li {
				float: left;
				padding:10/100rem;
				border: 1px solid #f2f2f2;
				font-size: 12px;
				width: 28%;
				height:240/100rem;
				box-sizing: content-box;
				border-right: none;
				text-align: center;
				position: relative;
				img{
					height: auto;
					width:140/100rem;
					/*position: absolute;
					bottom: 0;
					left: 120/100rem;*/
				}
				.name{
					font-size: 9.6px;
					color:#b1a8c1;
				}
				.price{
					position: absolute;
					bottom: 10/100rem;
					left: 50%;
					transform: translateX(-50%);
					color: #e77285;
					font-size: 9.6px;
					margin: 5/100rem 0;
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
<template>
	<section class="box clearfloat">
		<div class="title">
			<img src="../../assets/image/indeximg/background01.png" />
		</div>
		<div class="content">
			<ul v-for="item,index in hotlist">
				<li @click="getPath(item.id)">
					<router-link to="/goodsdetail"  >
						<p>{{item.name}}</p>
						<p>￥{{item.money}}/月</p>
						<span class="go">GO></span>
						<img :src="item.imgSrc" alt="" />
					</router-link>
				</li>

			</ul>
		</div>
	</section>
</template>

<script>
	export default {
		name: "itemHot",
		data: function() {
			return {
				hotlist: [],
			}
		},
		mounted: function() {
			this.getHoneData("http://localhost:8000/homeHot");
		},

		methods: {
			getHoneData(path) {
				fetch(path)
					.then(res => res.json())
					.then(data => {
//						console.log(data);
						this.hotlist = data;
					})
					.catch(function(e) {
						console.log("oops! error:", e.message);
					});
			},
			getPath(val){
//				console.log(val)
				 this.$store.state.indexpath =val
			}
		}
	}
</script>

<style scoped lang="less">
	.box {
		/*height: 100/100rem;*/
		width: 100%;
		background: #8c72e5;
		img {
			width: 100%;
		}
		.content {
			font-size: 12px;
			padding: 10/100rem;
			ul {
				list-style: none;
				li {
					width: 48%;
					box-sizing: border-box;
					height: 150/100rem;
					background: white;
					margin: 5/100rem;
					float: left;
					border-radius: 2px;
					padding: 20/100rem;
					position: relative;
					img{
						position: absolute;
						right: 20/100rem;
						bottom: 0;
						width: 90/100rem;
						height: 90/100rem;
					}
					.go{
						position: absolute;
						left: 20/100rem;
						bottom: 20/100rem;
						display: inline-block;
						padding:  0 10/100rem;
						background: #d3cffb;
						color: white;
						border-radius: 20px;
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
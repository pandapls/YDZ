<template>
	<div id="banner">
		<!--轮播图-->
		<search :bgcolor='blurColor' login="登录"></search>
		<Banner>
			<mt-swipe :auto="4000" slot="swipe">
				<mt-swipe-item class="banner"><img src="../../assets/image/banner/banner01.jpg" /></mt-swipe-item>
				<mt-swipe-item class="banner"><img src="../../assets/image/banner/banner02.png" /></mt-swipe-item>
				<mt-swipe-item class="banner"><img src="../../assets/image/banner/banner03.jpg" /></mt-swipe-item>
				<mt-swipe-item class="banner"><img src="../../assets/image/banner/banner04.jpg" /></mt-swipe-item>
				<mt-swipe-item class="banner"><img src="../../assets/image/banner/banner05.jpg" /></mt-swipe-item>
				<mt-swipe-item class="banner"><img src="../../assets/image/banner/banner06.jpg" /></mt-swipe-item>
				<mt-swipe-item class="banner"><img src="../../assets/image/banner/banner07.jpg" /></mt-swipe-item>
			</mt-swipe>
		</Banner>
		<Itemhot></Itemhot>
		<div class="nowreg " @click="getPath">
			<div class="title"></div>
			<ul class="content clearfloat">
				<li>
					<p>1分种</p>
					<p class="gray">选择机型</p>
					<img src="../../assets/image/indeximg/img1.png"/>
				</li>
				<li>
					<p>1分种</p>
					<p class="gray">获得免押金额度</p>
					<img src="../../assets/image/indeximg/img2.png"/>
				</li>
				<li>
					<p>1分种</p>
					<p class="gray">提交订单</p>
					<img src="../../assets/image/indeximg/img3.png"/>
				</li>
			</ul>
		</div>
		<Homelist></Homelist>
	</div>

</template>
<script type="text/javascript">
	import Search from '../../components/search'
	import Banner from '../../components/banner'
	import Itemhot from './itemHot'
	import Homelist from './homelist'
	
	export default {
		name: 'Home',
		props:['path'],
		data: function() {
			return {
				blurColor: "#00a6ff"
			}
		},
		components: {
			Search,
			Banner,
			Itemhot,
			Homelist
		},
		methods:{
			getPath(){
				console.log(this.$store.state.listpath)
			}
		},
		
	}
</script>
<style lang="less">
	body{
		background: #fafafa;
	}
	#banner {
		height: 180px;
		width: 100%;
		.banner {
			img {
				width: 100%;
				height: 180px;
			}
		}
	}
	.nowreg{
		padding:10/100rem;
		margin-bottom: 10/100rem;
		text-align: center;
		background: white;
		.title{
			width: 100%;
			height: 100/100rem;
			background: url(../../assets/image/indeximg/background02.png)-1px -252px  no-repeat;
			background-size: cover;
		}
		.content{
			width: 100%;
			display: flex;
			list-style: none;
			li{
				font-size: 13px;
				margin: 20/100rem 0;
				flex: 1;
				text-align: center;
				border-right:1px solid #f2f2f2 ;
				p{
					margin: 10/100rem 0;
				}
				img{
					margin: 10/100rem 0;
					width: 80/100rem;
				}
				.gray{
					color: #b2b2b2;
					font-size: 10px;
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
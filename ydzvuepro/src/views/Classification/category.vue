<template>
	<div>
		<Search :bgcolor='witheColor'></Search>
		<div class="category-box">
			<div class="content" v-for="(item,index) in msg" :key="index">
				<h3> <i class="line"></i>{{item.hTitle}}</h3>
				<div>
					<van-grid :column-num="4" icon-size="40px">
						<van-grid-item v-for="(itemc,indexc) in item.products" :key="indexc" :text="itemc.name" :icon="itemc.imgSrc" to="/" @click="getPath(itemc.path)"/>
					</van-grid>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Search from '../../components/search'
	export default {
		name: "HelloWorld",
		data: function() {
			return {
				msg: [],
				witheColor:"#fefefe"
			};
		},
		components:{
			Search
		},
		mounted: function() {
			this.getHoneData("http://localhost:8000/Classification");
		},
		methods: {
			async getHoneData(path) {
				await fetch(path)
					.then(res => res.json())
					.then(data => {
//						console.log(data);
						this.msg = data;
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
	};
</script>

<style lang="less" scoped>
	.category-box {
		background: #f4f5f7;
		padding-bottom: 100/100rem;
	}
	
	.content {
		background: #fff;
		margin-bottom: 10/100rem;
		h3 {
			padding: 30/100rem;
			font-size: 50/100rem;
			.line {
				margin-right: 10/100rem;
				display: inline-block;
				width: 5/100rem;
				height: 25/100rem;
				background: #fafafa;
				vertical-align: -4/100rem;
			}
			font-size: 23/100rem;
			text-indent: 0.5em;
			color: #37a3ff;
		}
		.van-icon__image {
			width: 200/100rem;
			height: 200/100rem;
			background: #fafafa;
		}
	}
</style>
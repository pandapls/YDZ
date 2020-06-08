<template>
	<div class="shop">
		<div class="nav">
			<span @click="back"><van-icon name="arrow-left" /></span> 购物车
		</div>
		<div class="nothing">
			<div class="noshop">
				<span class="iconfont icon-gouwuche"></span>
				<p>购物车里是空的</p>
				<span class="gotoshop" @click="gotoshop">去逛逛</span>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name:"shopping",
	methods:{
		back(){
			this.$router.go(-1)
		},
		gotoshop(){
			this.$router.push('/home')
		},
		
	},
	beforeMount(){
		if(this.$store.state.loginstatus){
			this.$router.push("/shopping")
		}else{
			this.$router.push("/login")
		}
	}
}
</script>

<style lang="less" scoped>
	body {
		background: white;
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
	
	.nothing {
		text-align: center;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		.noshop{
			line-height:1rem;
			span {
				background-color: #d5d9e2;
				padding: .5rem;
				border-radius: 50%;
				color: white;
				font-size: 40px;
			}
			p{
				font-size: 13px;
				color: #a0a0a0;
			}
			.gotoshop{
				font-size: 16px;
				color: white;
				background-color: #37a3fe;
				border-radius:1rem;
				padding: .2rem .7rem;
			}
		}
	}
</style>
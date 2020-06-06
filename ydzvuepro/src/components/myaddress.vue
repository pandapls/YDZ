<template>
	<div>
		<div class="address">
			<div class="nav">
				<span @click="back"><van-icon name="arrow-left" /></span> 我的快递地址
			</div>
			<div class="addButton" @click="addBtn">
				<button>新增快递地址</button>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
		name: "shopping",
		methods: {
			back() {
				this.$router.go(-1)
			},
			addBtn() {
				this.$router.push('/comfirm/address/addmyress')
			}
		}
	}
</script>
<style scoped lang="less">
	.address {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 110100;
		width: 100%;
		height: 100%;
		background: white;
	}
	
	.nav {
		text-align: center;
		height: .7rem;
		line-height: .7rem;
		font-size: 14px;
		font-weight: bold;
		border-bottom: 3px solid #fafafa;
		span {
			float: left;
			margin-left: .2rem;
			color: #929292;
		}
	}
	
	.addButton {
		height: 1rem;
		width: 95%;
		button {
			border: none;
			background-color: #179de1;
			color: white;
			width: 100%;
			height: .65rem;
			font-size: 12px;
			margin: .2rem .18rem;
		}
	}
</style>
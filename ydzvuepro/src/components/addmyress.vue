<template>
	<div class="address">
		<div class="nav">
			<span @click="back"><van-icon name="arrow-left" /></span> 我的快递地址
		</div>
		<div class="direAddress">
			<form>
				<div>
					收货人：</br>
					<input type="text" />
				</div>
				<div>
					联系电话：</br>
					<input type="text" />
				</div>
				<div>
					所在地区：</br>
					<select class="select">
						<option value="请选择省份">请选择省份</option>
					</select>
					<select class="select">
						<option value="请选择城市">请选择城市</option>
					</select>
					<select class="select">
						<option value="请选择区县">请选择区县</option>
					</select>
				</div>
				<div>
					详细地址：</br>
					<input type="text" placeholder="详细地址" />
				</div>
				<div>
					<button>保存</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
	export default {
		name: "shopping",
		methods: {
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>
<style scoped lang="less">
.address{
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
	
	
	.direAddress {
		width: 92%;
		margin: .1rem .25rem;
		div {
			line-height: .7rem;
			color: #999999;
			font-size: 12px;
			.select {
				width: 1.81rem;
				height: .5rem;
				border: none;
				border: 1px solid #cccccc;
				margin-right: .152rem;
				font-size: 12px;
			}
			input {
				width: 100%;
				border: none;
				border: 1px solid #cccccc;
				height: .55rem;
				border-radius: 5px;
				color: #999999;
				font-size: 12px;
				text-indent: .1rem;
			}
			button {
				width: 100%;
				height: .6rem;
				border: none;
				background-color: #179de1;
				color: white;
				font-size: 12px;
				margin-top: .3rem;
				line-height: .6rem;
			}
		}
	}
</style>
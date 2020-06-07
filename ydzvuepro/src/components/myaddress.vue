<template>
	<div>
		<div class="address">
			<div class="nav">
				<span @click="back"><van-icon name="arrow-left" /></span> 我的快递地址
			</div>
			<div class="box" v-for="item,index in addresslist">
				<p class="name">{{item.username}} <span>{{item.phone}}</span></p>
				<p class="detailaddress">{{item.dizhi}}</p>
				<p class="icon">
					<i class="radio-box" @click="check(item)">
					<van-icon name="circle" class="radio" v-show="!item.nowCheck"/>
					<van-icon name="passed"  class="radio radio-check"  v-show="item.nowCheck"/>
					<span>默认地址</span>
					</i>
					<span class="chang">
						<van-icon name="records" />
						&nbsp;修改
					</span>
					<span class="delet">
						<van-icon name="delete" />
						&nbsp;删除
					</span>
				</p>
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
		data(){
			return {
				addresslist:[]
			}
		},
		mounted(){
			this.addresslist = this.$store.state.address
		},
		methods: {
			back() {
				this.$router.push('/comfirm')
			},
			addBtn() {
				this.$router.push('/comfirm/address/addmyress')
			},
			check(val){
				val.nowCheck =!val.nowCheck
				
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
		.box{
			height: 100/100rem;
			padding: 20/100rem;
			font-size: 12px;
			color: #808689;
			background: white;
			line-height:50/100rem;
			margin:30/100rem 0;
			.name{
				color: #808689;
				span{
					float: right;
				}
			}
			.icon{
				display: block;
				margin: 10/100rem 0;
				position: relative;
				
				.radio-box{
				font-size: 16px;
				font-style: normal;
				position: relative;
				color: #179de1;
					span{
						display: inline-block;
						width: 100/100rem;
						position: absolute;
						top: -10/100rem;
						left: 40/100rem;
						font-size: 10px;
					}
				}
				
				.chang{
					position: absolute;
					width: 100/100rem;
					right: 120/100rem;
					i{
						font-size: 16px;
					}
				}
				.delet{
					position: absolute;
					width:100/100rem;
					right: 10/100rem;
					i{
						font-size: 18px;
					}
				}
			
			}
			
		}
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
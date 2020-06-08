<template>
	<div class="address">
		<div class="nav">
			<span @click="back"><van-icon name="arrow-left" /></span> 我的快递地址
		</div>
		<div class="direAddress">
			<form>
				<div>
					收货人：</br>
					<input type="text" v-model="username"/>
				</div>
				<div>
					联系电话：</br>
					<input type="text" v-model="Phone"/>
				</div>
				<div>
					所在地区：</br>
					<select class="select"   v-model="selectProvices" >
						<option :value="op.id" v-for="op in Provices">{{op.name}}</option>
					</select>
					<select class="select"   v-model="selecCity" >
						<option :value="op.id" v-for="op in city">{{op.name}}</option>
					</select>
					<select class="select"   v-model="selecqu">
						<option :value="op.id" v-for="op in qu">{{op.name}}</option>
					</select>
				</div>
				<div>
					详细地址：</br>
					<input type="text" placeholder="详细地址" v-model="address"/>
				</div>
				<div>
					<button @click="btn">保存</button>
				</div>
			</form>
		</div>
		
	</div>
</template>
<script>
	export default {
		name: "shopping",
		data:function(){
			return {
				username:'',
				Phone:'',
				Provices:[
					{
						id:'广东省',
						name:'广东省'
					}
				],
				city:[
					{
						id:'深圳市',
						name:'深圳市'
					}
				],
				qu:[
					{
						id:'龙岗区',
						name:'龙岗区'
					},
					{
						id:'南山区',
						name:'南山区'
					},
					{
						id:'福田区',
						name:'福田区'
					},{
						id:'罗湖区',
						name:'罗湖区'
					},{
						id:'宝安区',
						name:'宝安区'
					}
				],
				address:''
				
			}
		},
		 created(){
　　　　　　//如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
            this.selectProvices = this.Provices[0].id;
            this.selecCity = this.city[0].id;
            this.selecqu = this.qu[0].id;
            
            
        },
		methods: {
			back() {
				this.$router.go(-1)
			},
			btn(){
				
				console.log(this.username,this.Phone,this.selectProvices,this.selecCity,this.selecqu)
				let address = {
					username:this.username,
					phone:this.Phone,
					dizhi:this.selectProvices+this.selecCity+this.selecqu,
					xiangxidizhi:this.address,
					nowCheck:false
				}
				this.$store.state.address.push(address)
//				console.log(address)
				this.$router.push('/comfirm/address')
			},
			
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
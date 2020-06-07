<template>
<div id="login">
	<div id="header">
		<!--<div class="nav">-->
			<img src="../../assets/image/detail/left.png" class="left"/>
			<h4>易点租注册</h4>
			
		<!--</div>-->
		<van-form >
			<van-field v-model="ip" name="iphone" label="手机号码" placeholder="请输入手机号" />
			<van-field  label="短信验证码" placeholder="请输入短信验证码">
				<!--<template #button>-->
				<!--</template>-->
			</van-field>

			<span class="huo">获取验证码</span>

			<van-field v-model="password" type="password" name="密码" label="密码" placeholder="8-32数字与字母组合" />
			<div @click="show = true">
				<button native-type="submit" @click="sub">
					立即提交
				</button>
				<van-overlay :show="show" @click="show = false" />
			</div>
			
		</van-form>
	</div>
</div>
</template>

<script>
	export default {
		data() {
			return {
				active: 2,
				username: '',
				password: '',
				ip:'',
				show:false,
//				Toast:''
			}
		},
		methods: {
	    sub(){
			let str2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,32}$/;
	    	let str=/^1(3|5|7|8)\d{9}$/;
	    	//验证手机号
			if(this.ip ==null || this.ip ==""){
				console.log("请输入手机号");
				this.$toast('请输入手机号码');
			}else if(str.test(this.ip)){
				//跳过验证码
				//验证密码
				if(this.password == null || this.password == ""){
					console.log("密码不能为空");
					this.$toast('请输入密码！');
				}else if(str2.test(this.password)){
					console.log("登录成功");
				}else{
					console.log("密码格式不正确");
					this.$toast('密码应为8-32位数字与字母组合！');
				}
			}else{
				console.log("手机号格式不正确");
				this.$toast('手机号码格式不正确！');
			}
		}
	}
}
</script>

<style lang="less">
	
	#header{
		position: relative;
		h4{
			text-align: center;
			position: absolute;
			top: 3px;
			left: 40%;
		}
		.left{
			width: 33px;
		}
		.huo{
			position: absolute;
			top: 92px;
			right: 11px;
			padding: 0 20px;
			height: 20px;
			border-left:1px solid #D1D2D4;
			font-size: 14px;
			color:#37A3FF;
		}
		button{
			background:#37A3FF;
			border: none;
			color: white;
			font-size: 14px;
			padding:9px 0px;
			width: 83%;
			margin: 18px 30px;
			border-radius: 6px;
		}
	}
</style>
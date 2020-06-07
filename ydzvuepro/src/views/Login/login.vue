<template>
	<div id="login">
	<div id="header">
		<img src="../../assets/image/detail/left.png" class="left"/>
		<h4>登录易点租</h4>
		<van-tabs v-model="active" color="#37A3FF">
			<van-tab title="手机快捷登录" >
				<van-form>
					<van-field
						 v-model="ip" name="iphone" label="手机号码"
						 placeholder="请输入手机号" id="iphone" />
					<van-field
						  label="短信验证码"
						  placeholder="请输入短信验证码"
						>
						  <!--<template #button>-->
						  <!--</template>-->
					</van-field>
					
					<span class="huo">获取验证码</span>
					
					<div>
						<button  native-type="submit" @click="sub">
							立即登录
						</button>
					</div>
				</van-form>
			</van-tab>
			
			<van-tab title="账号密码登录"><van-form >
					<van-field 
						v-model="username" name="user" label="账号"
						placeholder="用户名 / 绑定手机号" id="user" />
					<van-field 
						v-model="password" type="password" name="pwd" label="密码" 
						placeholder="请输入密码" id="pwd"/>
					<div  @click="show = true">
						<button native-type="submit" @click="sub2">
							立即登录
						</button>
						<van-overlay :show="show" @click="show = false" />
					</div>
				</van-form></van-tab>
		</van-tabs>
	</div>

	<div id="later">
		<form action="" method="post">
			<input type="checkbox" value="" />两周内自动登录
			<span><a href="">立即注册</a></span>
			<span><a href="">忘记密码</a></span>
		</form>
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
			}
		},
		methods: {
	   		sub(){
	    	//手机号验证
	    	let str=/^1(3|5|7|8)\d{9}$/;
	    	let str2=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/;

		      if(this.ip==null||this.ip==""){
		      	console.log("手机号不能为空");
		      	this.$toast('请输入手机号码');
		      }else if(str.test(this.ip)) {
		      	console.log("登录成功");
		      }else{
//		      	this.showPhone=true;
		      	console.log("手机号格式不正确");
		      	this.$toast('手机号码格式不正确！');
		      }
		      
		      
		    },
	   		sub2(){
	   			let str2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,32}$/;
	   			let str=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/;
	   			//账户密码验证
		      if(this.username==null||this.username==""){
		      	console.log("账号不能为空");
		      	this.$toast('请输入账号');
		      }else if(str.test(this.username)) {
			      	if(this.password == null || this.password == ""){
						console.log("密码不能为空");
						this.$toast('请输入密码！');
					}else if(str2.test(this.password)){
						console.log("登录成功");
					}else{
						console.log("密码格式不正确");
						this.$toast('密码长度最多6位,最多32位');
					}
		      }else{
//		      	this.showPhone=true;
		      	console.log("账号格式不正确");
		      	this.$toast('账号应为6-32位数字与字母组合！');
		      }
	   		}
		  }
		}
</script>

<style lang="less">
	h4{
		padding: 7px 0;
		text-align: center;
	}
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
			top:100px;
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
	#later form {
		margin-top: 10px;
		text-align: center;
		font-size: 14px;
		input{
			margin:0 5px;
		}
			span a{
			color:#5A6876;
			margin-left:40px;
		}
	}
</style>
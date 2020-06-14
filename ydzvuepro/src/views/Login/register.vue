<template>
	<div id="login">
		<div id="header">
			<!--<div class="nav">-->
			<h4>
        <van-icon name="arrow-left" class="left" @click="back" />登录易点租
      </h4>
			<!--</div>-->
			<van-form>
				<van-field v-model="ip" name="iphone" label="手机号码" placeholder="请输入手机号" />
				<div class="duanxi">
					<van-field v-model="note" label="短信验证码" placeholder="请输入短信验证码"></van-field>
					<button class="huo" :disabled="disabled" @click="huoquYZM">{{btntxt}}</button>
				</div>

				<van-field v-model="paw" type="password" name="密码" label="密码" placeholder="8-32数字与字母组合" />
				<div class="zeBtn" @click="show = true">
					<button native-type="submit" @click="sub">立即提交</button>
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
				username: "",
				paw: "",
				ip: "",
				disabled: false,
				time: 5,
				note:null,
				btntxt: "获取验证码",
				randnum:null
			
				//				Toast:''
			};
		},
		methods: {
			sub() {
				let str2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,32}$/;
				let str = /^1(3|5|7|8)\d{9}$/;
				let noteReg = /^[0-9]{6}$/;
				//验证手机号
				if(this.ip == null || this.ip == "") {
					this.$toast("请输入手机号码");
					return false;
				} else if(!str.test(this.ip)) {
					this.$toast("手机号码格式不正确！");
					return false;
					// 验证码
				} else if(this.note == "") {
					this.$toast("验证码不能为空");
					return false;
				} else if(this.note!=this.randnum) {
					this.$toast("验证码错误");
					return false;
				} else if(this.paw == null || this.paw == "") {
					this.$toast("请输入密码！");
					return false;
				} else if(!str2.test(this.paw)) {
					this.$toast("密码应为8-32位数字与字母组合！");
					return false;
				} else {
					this.$toast("注册成功");
					this.$router.push("/login");
					return true;
				}
			},

			back() {
				console.log(1);
				this.$router.push("/login");
			},
			huoquYZM() {
				this.time = 60;
				if(this.ip !== "") {
					this.timer();
					console.log(1)

					function rand(min, max) {
						return Math.floor(Math.random() * (max - min)) + min;
					}
					this.randnum = rand(1000, 9999);
					console.log(this.randnum)

//					this.sendnote(this.ip, this.randnum)
				}else{
					this.$toast("请输入手机号！");
				}

			},

			sendnote(tel, code) { //tel:电话号码，code：自定义的验证码
				const text = '验证码：' + code + ',您正在使用登陆功能,该验证码仅用于身份验证,在五分钟之内有效，请勿泄露给其他人使用。'
				let param = new URLSearchParams();
				param.append('Uid', 'pandapls');
				param.append('Key', "d41d8cd98f00b204e980");
				param.append('smsMob', tel);
				param.append('smsText', text);
				this.$axios.post('/api/', param, { //post请求，在请求时会自动把param拼接再Param后面
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' //必须要加头
					},
				}).then((response) => {
					//					console.log(2)
					console.log(response)
				})
			},

			//发送手机验证码倒计时
			timer() {
				if(this.time > 0) {
					this.disabled = true;
					this.time--;
					this.btntxt = this.time + "秒重新发送";
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.btntxt = "发送验证码";
					this.disabled = false;
				}
			},
		}
	};
</script>

<style lang="less" scoped>
	#header {
		position: relative;
		h4 {
			background: #fff;
			text-align: center;
			height: 60/100rem;
			line-height: 60/100rem;
		}
		.left {
			float: left;
			margin-top: 15/100rem;
			margin-left: 30/100rem;
		}
		.duanxi {
			background: #fff;
			width: 100%;
			position: relative;
			/deep/ .van-cell {
				width: 100%;
				.van-field__value {
					.van-field__body {
						width: 100%;
						.van-field__control {
							width: 100%;
						}
					}
				}
			}
		}
		button {
			background: #37a3ff;
			border: none;
			color: white;
			font-size: 25/100rem;
			padding: 20/100rem 0px;
			width: 83%;
			margin: 28/100rem 40/100rem;
			border-radius: 6px;
		}
		.huo {
			font-size: 16/100rem;
			position: absolute;
			right: -30/100rem;
			width: 140/100rem;
			text-align: center;
			display: inline-block;
			z-index: 2;
			top: -15/100rem;
			color: white;
			background: #37a3ff;
		}
	}
	
	.zeBtn {
		text-align: center;
	}
</style>
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
      note: "",
      btntxt: "获取验证码"

      //				Toast:''
    };
  },
  methods: {
    sub() {
      let str2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,32}$/;
      let str = /^1(3|5|7|8)\d{9}$/;
      let noteReg = /^[0-9]{6}$/;
      //验证手机号
      if (this.ip == null || this.ip == "") {
        this.$toast("请输入手机号码");
      } else if (!str.test(this.ip)) {
        this.$toast("手机号码格式不正确！");
        return;
        // 验证码
      } else if (this.note == "") {
        this.$toast("验证码不能为空");
        return;
      } else if (!noteReg.test(this.note)) {
        this.$toast("验证码为6位数字");
        return;
      } else if (this.paw == null || this.paw == "") {
        this.$toast("请输入密码！");
        return;
      } else if (!str2.test(this.paw)) {
        this.$toast("密码应为8-32位数字与字母组合！");
        return;
      } else {
        this.$toast("注册成功");
        this.$router.push("/login");
      }
    },

    back() {
      console.log(1);
      this.$router.push("/login");
    },
    // 点击获取验证码
    huoquYZM() {
      this.time = 5;
      this.timer();
    },
    //发送手机验证码倒计时
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.btntxt = this.time + "秒重新发送";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "发送验证码";
        this.disabled = false;
      }
    }
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
    font-size: 20/100rem;
    position: absolute;
    right: -30/100rem;
    width: 180/100rem;
    text-align: center;
    display: inline-block;
    z-index: 6;
    top: -28/100rem;
    color: #37a3ff;
    background: #fff;
  }
}
.zeBtn {
  text-align: center;
}
</style>
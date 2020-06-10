<template>
  <div id="login">
    <div id="header">
      <h4>
        <van-icon name="arrow-left" class="left" @click="back" />登录易点租
      </h4>
      <van-tabs v-model="active" color="#37A3FF">
        <van-tab title="手机快捷登录">
          <van-form>
            <div class="logindx">
              <van-field v-model="ip" name="iphone" label="手机号码" placeholder="请输入手机号" id="iphone" />
              <van-field label="短信验证码" v-model="note" placeholder="请输入短信验证码">
                <!--<template #button>-->
                <!--</template>-->
              </van-field>

              <button class="huo" :disabled="disabled" @click="huoquYZM">{{btntxt}}</button>
            </div>

            <div class="logninbtnB">
              <button native-type="submit" @click="sub">立即登录</button>
            </div>
          </van-form>
        </van-tab>

        <van-tab title="账号密码登录">
          <van-form>
            <van-field
              v-model="username"
              name="user"
              label="账号"
              placeholder="用户名 / 绑定手机号"
              id="user"
            />
            <van-field
              v-model="pwd"
              type="password"
              name="pwd"
              label="密码"
              placeholder="请输入密码"
              id="pwd"
            />
            <div class="logninbtnB" @click="show = true">
              <button native-type="submit" @click="sub2">立即登录</button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
    </div>

    <div id="later">
      <form action method="post">
        <label for="lz">
          <input id="lz" type="checkbox" value /> 两周内自动登录
        </label>
        <span>
          <router-link to="/register">立即注册</router-link>
        </span>
        <span>
          <a href>忘记密码</a>
        </span>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      username: "",
      pwd: "",
      disabled: false,
      time: 5,
      ip: "",
      note: "",
      btntxt: "获取验证码"
    };
  },

  methods: {
    // 获取验证码
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
    },

    sub() {
      //手机号验证
      let str = /^1(3|5|7|8)\d{9}$/;
      let str2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/;
      let noteReg = /^[0-9]{6}$/;
      if (this.ip == null || this.ip == "") {
        this.$toast("请输入手机号码");
        this.$store.state.loginstatus = false;
        return;
      } else if (!str.test(this.ip)) {
        this.$toast("手机号码格式不正确！");
        this.$store.state.loginstatus = false;
        return;
      } else if (this.note == "") {
        this.$toast("验证码不能为空");
        this.$store.state.loginstatus = false;
        return;
      } else if (!noteReg.test(this.note)) {
        this.$toast("验证码为6位数字");
        this.$store.state.loginstatus = false;
        return;
      } else {
        this.$router.push("/shopping");
        this.$store.state.loginphone = this.ip;
        this.$store.state.loginstatus = true;
      }
    },
    sub2() {
      let str2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,32}$/;
      let str = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/;
      //账户密码验证
      if (this.username == null || this.username == "") {
        this.$toast("请输入账号");
        this.$store.state.loginstatus = false;
        return;
      } else if (!str.test(this.username)) {
        this.$toast("账号应为6-32位数字与字母组合！");
        this.$store.state.loginstatus = false;
        return;
      } else if (this.pwd == null || this.pwd == "") {
        this.$toast("请输入密码！");
        this.$store.state.loginstatus = false;
        return;
      } else if (!str2.test(this.pwd)) {
        this.$toast("密码应为8-32位数字与字母组合");
        this.$store.state.loginstatus = false;
        return;
      } else {
        this.$router.push("/shopping");
        this.$store.state.loginphone = this.ip;
        this.$store.state.loginstatus = true;
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
#header {
  background: #fff;
  position: relative;
  width: 100%;
  h4 {
    text-align: center;
    height: 60/100rem;
    line-height: 60/100rem;
  }
  .left {
    float: left;
    margin-top: 15/100rem;
    margin-left: 30/100rem;
  }
  .logindx {
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
  .huo {
    font-size: 23/100rem;
    position: absolute;
    right: -30/100rem;
    width: 180/100rem;
    text-align: center;

    display: inline-block;
    z-index: 2;
    top: -30/100rem;
    color: #37a3ff;
    background: #fff;
  }
  button {
    background: #37a3ff;
    border: none;
    color: white;
    text-align: center;
    font-size: 14px;
    padding: 13/100rem 0px;
    width: 83%;
    margin: 30/100rem 40/100rem;
    border-radius: 6px;
  }
}

#later form {
  margin-top: 20/100rem;
  text-align: center;
  font-size: 14px;
  input {
    margin: 0 10 / rem;
  }
  span a {
    color: #5a6876;
    margin-left: 50/100rem;
  }
}
.logninbtnB {
  text-align: center;
}
</style>
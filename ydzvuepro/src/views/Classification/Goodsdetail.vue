<template>
  <div class="goodsdetail_box">
    <div class="back_title">
      <mt-header fixed title="商品详情">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="goodsdetail_content">
      <van-tabs
        v-model="active"
        scrollspy
        sticky
        offset-top="40"
        color="#31a8fb"
        title-active-color="#31a8fb"
      >
        <van-tab title="商品">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#e45050">
            <van-swipe-item v-for="(item,index) in msg.productPicInfos" :key="index">
              <img :src="item.filePath" alt />
            </van-swipe-item>
          </van-swipe>
          <div>
            <img class="tagImg" src="../../assets/image/detail/detail-tag1.png" alt />
          </div>
          <!-- 商品介绍 -->
          <div class="txt-introduce">
            <div class="introduce">
              <p class="price">
                ￥
                <span class="pricem">89.00</span> /月
                <van-tag round color="#ffeaea" text-color="#fa5b59" type="primary">设备押金：￥1700.00</van-tag>
              </p>
              <p class="introduce_brand">
                <van-tag type="danger">准新</van-tag>&nbsp;&nbsp;
                <span>{{title}}</span>
              </p>
            </div>

            <!-- 已选商品 -->
            <div class="selectProduct">
              <span>已选商品</span> &nbsp;i3-7020U/4G/128GSSD/核显1件 可选服务
              <span class="shenluo">···</span>
            </div>
            <!-- 租赁方式 -->
            <div class="rent">
              <div>
                <span>租赁方式</span> &nbsp;月租金
                <span class="redFont">￥89</span>，租期
                <span class="redFont">36</span>个月&nbsp;
                <van-tag color="#ffac13" text-color="white">随租随还</van-tag>
                <span class="shenluo">···</span>
              </div>
              <div class="byStages">
                <p>
                  <van-tag color="#f2826a" plain>1-12期</van-tag>&nbsp;89元/月
                </p>
                <p>
                  <van-tag color="#f2826a" plain>13-24期</van-tag>&nbsp;79元/月
                </p>
                <p>
                  <van-tag color="#f2826a" plain>25-36期</van-tag>&nbsp;69元/月
                </p>
                <!-- 到期说明 -->
                <p class="mature">到期归还易点租，6个月后课随时退还，未满6个月还需缴纳服务费</p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="详情">
          <div class="shangpDetail" v-html="productProfile"></div>
        </van-tab>
        <van-tab title="参数">
          <div class="canShu" v-html="canshu"></div>
        </van-tab>
        <van-tab title="清单">
          <div class="qindan">
            <h4>包装清单</h4>
            <p>{{qingDan}}</p>
          </div>
        </van-tab>
      </van-tabs>
    </div>

  <div class="dubtabbar">
    <button class="addGoods" @click="getGoods">加入购物车</button>
    <button class="nowGoods">立即下单</button>
  </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      active: 0,
      msg: [],
      title: "",
      productProfile: "",
      canshu: "",
      qingDan: "",
      goodsdata:{},
      num :1
    };
  },

  mounted: function() {
  	console.log("http://localhost:8000/"+this.$store.state.indexpath)
    this.getHoneData("http://localhost:8000/"+this.$store.state.indexpath);
     
   
  },
  methods: {
    async getHoneData(path) {
      await fetch(path)
        .then(res => res.json())
        .then(data => {
//        console.log(data);
          this.msg = data;
          this.title = data.title;
          this.productProfile = data.productProfile;
          this.canshu = data.productConfig;
          this.qingDan = data.packageDescribe;
          
        })
        .catch(function(e) {
          console.log("oops! error:", e.message);
        });
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
     onClickIcon() {
      Toast('点击图标');
    },
    onClickButton() {
      Toast('点击按钮');
    },
    getGoods(){
    	this.goodsdata = {
    		title : this.title ,
    		price : this.msg.minRentAmount,
    		yajin : this.msg.deposit,
    		imgSrc : this.msg.productPicInfos[0].filePath,
    		num : this.num
    	}
    		let obj = {};
    		let arr =[]
//  		this.$store.state.goodsData.push(this.goodsdata)
//			arr = arr.reduce(function(item,next){
////				console.log(item,next)
//	  			obj[next.key]?'':obj[next.key] = true && item.push(next)
//	  			return item;
//			},[])
				this.$store.commit("setData",this.goodsdata);
			console.log(this.$store.state.goodsData)

				
				
    }
  }
};
</script>

<style lang="less" scoped>

* {
  margin: 0;
  padding: 0;
}
.dubtabbar{
  height: 80/100rem;
  z-index: 1000001;
  position: fixed;
  bottom: 40/100rem;
  right: 0;
  button{
  	width: 170/100rem;
  	background: #f5615a;
  	color: white;
  	height: 120/100rem;
  	border: none;
  	font-size: 14px;
  }
  .addGoods{
  	background: #48aeff;
  }
}

.goodsdetail_box {
	overflow: hidden;
  .goodsdetail_content {
    width: 100%;

    .biaojian {
      border-top: 1px solid #cfd1d7;
    }
    .van-tabs__line {
      background-color: #31a8fb;
    }
    .van-nav-bar__title {
      font-weight: 700;
    }
    .van-tab {
      width: 200/75rem;
    }

    .my-swipe .van-swipe-item {
      text-align: center;
      img {
        height: 250px;
      }
    }
    .tagImg {
      width: 100%;
    }
    .txt-introduce {
      background: #f4f5f7;
      width: 100%;
      .introduce {
        background: #fff;
        padding: 15/100rem;
        width: 100%;
        .price {
          height: 60/100rem;
          line-height: 60/100rem;
          color: #fa5b59;
          font-size: 25/100rem;
          .pricem {
            font-size: 30/100rem;
            font-weight: 700;
          }
        }
      }
      .selectProduct {
        position: relative;
        text-indent: 15/100rem;
        background: #fff;
        width: 100%;
        height: 70/100rem;
        line-height: 70/100rem;
        box-sizing: border-box;
        border-top: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
        margin-top: 15/100rem;
        font-size: 23/100rem;
        span {
          color: #8f8f8f;
        }
        .shenluo {
          position: absolute;
          right: 5/100rem;
          font-size: 45/100rem;
        }
      }
      .rent {
        font-size: 23/100rem;
        padding: 15/100rem 0;
        border-top: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
        background: #ffff;
        margin-top: 15/100rem;
        padding: 15/100rem;
        span {
          color: #8f8f8f;
        }
        .shenluo {
          position: absolute;
          right: 5/100rem;
          font-size: 45/100rem;
        }
        .redFont {
          color: #fa6260;
        }
        .byStages {
          text-align: center;
          p {
            margin-top: 15/100rem;
          }
          .mature {
            text-align: center;
            color: #8f8f8f;
          }
        }
      }
    }
  }
}
/deep/.shangpDetail {
  /deep/ element.style {
    width: 100%;
  }
  img {
    width: 100%;
  }
}

/deep/.canShu {
  .fjd {
    font-size: 24/100rem;
    color: #757575;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid #ddddde;
  }
  .fjd td,
  .fjd th {
    padding: 2px 8px;
    line-height: 50/100rem;
    border-top: 1px solid #ccc;
  }
  .fjd .fjd_left {
    border-right: 1px solid #ccc;
    width: 200/100rem;
    text-align: right;
    background: #f5fafe;
  }
}
.qindan {
  margin-top: 25/100rem;
}
</style>
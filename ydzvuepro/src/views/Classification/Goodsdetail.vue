<template>
  <div class="goodsdetail_box">
    <div class="back_title">
      <mt-header fixed title="商品详情">

          <mt-button icon="back"  slot="left" @click="back"></mt-button>

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
          <div class="banner">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#e45050">
              <van-swipe-item v-for="(item,index) in msg.productPicInfos" :key="index">
                <img :src="item.filePath" alt />
              </van-swipe-item>
            </van-swipe>
          </div>
          <div>
            <img class="tagImg" src="../../assets/image/detail/detail-tag1.png" alt />
          </div>
          <!-- 商品介绍 -->
          <div class="txt-introduce">
            <div class="introduce">
              <p class="price">
                ￥
                <span class="pricem">{{minPrice}}</span> /月
                <van-tag round color="#ffeaea" text-color="#fa5b59" type="primary">设备押金：￥1700.00</van-tag>
              </p>
              <p class="introduce_brand">
                <van-tag type="danger">准新</van-tag>&nbsp;&nbsp;
                <span>{{title}}</span>
              </p>
            </div>

            <!-- 已选商品 -->
            <div class="selectProduct" @click="shangpSumbit">
              <span>已选商品</span> &nbsp;i3-7020U/4G/128GSSD/核显1件 可选服务
              <span class="shenluo">···</span>
            </div>

            <!-- 租赁方式 -->
            <div class="rent" v-for="(it,ie) in rents" :key="ie">
              <van-cell is-link @click="showPopup1">
                <div>
                  <span>租赁方式</span>
                  &nbsp;{{it.payTypeDes}}
                  <span class="redFont">￥{{it.rentAmount}}</span>，租期
                  <span class="redFont">{{it.totalMonth}}</span>个月&nbsp;
                  <van-tag color="#ffac13" text-color="white">{{it.rentDesc[0]}}</van-tag>
                </div>
              </van-cell>
              <van-popup v-model="showPopup" position="bottom" :style="{ height: '40%' }">
                <div class="rent_al">
                  <h4>
                    租赁方式
                    <span>
                      <van-icon name="cross" @click="showPopup=false" size="20" />
                    </span>
                  </h4>
                  <p class="zupin">
                    <van-icon id="gou" name="passed" size="20" color="#eb283c" />
                    &nbsp;{{it.payTypeDes}}
                    <span>￥{{it.rentAmount}}</span>，租期36个月
                    <van-tag color="#ffac13" text-color="white">{{it.rentDesc[0]}}</van-tag>
                  </p>
                  <div class="rent_detail">
                    <div class="rent-left fl">{{it.rentDesc[0]}}：</div>
                    <div class="rent-right">
                      <!--{{it.perMonthList}}-->
                      <!--<br /> {{it.perMonthList[1]}}-->
                      <!--<br /> {{it.perMonthList[2]}}-->
                      <br />
                      {{it.rentDesc[1]}}
                    </div>
                  </div>
                </div>
              </van-popup>

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
                <p class="mature">{{it.rentDesc[1]}}</p>
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
      <button class="nowGoods" @click="goComfirm">立即下单</button>
    </div>

    <!--<div class="dubtabbar">
			<Tabber />
    </div>-->

    <!-- 商品规格 -->
    <div class="sku">
      <van-sku
        v-model="showsku"
        :sku="sku"
        :show-add-cart-btn="false"
        buy-text="加入购物车  "
        :goods="goods"
        @buy-clicked="onBuyClicked"
      />
    </div>
  </div>
</template>

<script>

	let sku = {
		// 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
		// 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
		tree: [{
			k: "配置：", // skuKeyName：规格类目名称
			v: [{
				id: "30349", // skuValueId：规格值 id
				name: "红色" // skuValueName：规格值名称
			}],
			k_s: "s-1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
		}],
		// 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
		list: [{}],
		price: "1.00", // 默认价格（单位元）
		stock_num: 50,
		collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
		none_sku: false // 是否无规格商品
	};
	export default {
		data() {
			return {
				active: 0,
				minPrice:"",
				showPopup: false,
				msg: [],
				title: "",
				productProfile: "",
				canshu: "",
				qingDan: "",
				goodsdata: {},
				num: 1,
				rents: [],
				showsku: false,
				sku: sku,
				goods: {
					// 默认商品 sku 缩略图
					title: "",
					picture: "https://img.yzcdn.cn/1.jpg"
				},
			};

		},

		mounted: function() {
			this.getHoneData("http://localhost:8000/" + this.$store.state.indexpath);

		},
		methods: {
			async getHoneData(path) {
				await fetch(path)
					.then(res => res.json())
					.then(data => { 
//						console.log(data)
						this.msg = data;
						this.title = data.title;
						this.minPrice = data.minRentAmount;
						
						this.productProfile = data.productProfile;
						this.canshu = data.productConfig;
						this.qingDan = data.packageDescribe; 
						this.rents = data.rents;
						this.goods.picture = data.productPicInfos[0].filePath;
						this.goods.title = data.title;
						this.sku.price = data.minRentAmount + "/月";
						this.sku.stock_num = data.limitedNum;
						this.sku.list[0].stock_num = data.limitedNum;
						this.sku.tree[0].v[0].name = data.miniTitle; 
//						this.sku.list[0].price = data.minRentAmount*100
//						this.sku.tree[0].v[0].name = data.minTitle*100
						
					})
					.catch(function(e) {
						console.log("oops! error:", e.message);
					});
			},
			back() {
				this.$router.go(-1); //返回上一层
//					console.log(this.$router.histroyPath)
			},
			shangpSumbit() {
				this.showsku = true;
			},
			// 立即提交
			onAddCartClicked() {
				this.showsku = false;
			},
			onBuyClicked(){
				this.getGoods();
				this.showsku =false
			},
			getGoods() {
					this.goodsdata = {
						title: this.title,
						price: this.msg.minRentAmount,
						yajin: this.msg.deposit,
						imgSrc: this.msg.productPicInfos[0].filePath,
						num: this.num,
						Checkstate:true,
						id:this.msg.id
					}
					this.$store.commit("setData", this.goodsdata);

					
					
			},
			showPopup1() {
						this.showPopup = true;
			},
			goComfirm(){
				this.$router.push('/comfirm')
				this.getGoods()
			}
		}
	}

</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.banner {
  background: #fff;
}
.dubtabbar {
  height: 80/100rem;
  z-index: 1000001;
  position: fixed;
  bottom: 40/100rem;
  right: 0;
  button {
    width: 170/100rem;
    background: #f5615a;
    color: white;
    height: 120/100rem;
    border: none;
    font-size: 14px;
  }
  .addGoods {
    background: #48aeff;
  }
  z-index: 1002;
}

.fl {
  float: left;
}

.goodsdetail_box {
  overflow: hidden;
  .sku {
    width: 95%;
  }
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
    width: 100%!important;
     height:100%!important;
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

.rent_al {
  width: 90%;
  padding: 15/100rem;
  .rent_detail {
    border: 1px solid #eb283c;
    color: #eb283c;
    padding: 15/100rem;
    margin-top: 15/100rem;
    .rent-left {
      height: 200/100rem;
    }
  }
  h4 {
    text-align: center;
    font-size: 25/100rem;
    span {
      float: right;
    }
  }
  .zupin {
    margin-top: 10/100rem;
    span {
      color: #eb283c !important;
    }
    #gou {
      vertical-align: -5/100rem;
    }
  }
}

.qindan {
  margin-top: 25/100rem;
}
</style>
<template>
  <div>
    <div class="category-box">
      <div class="content" v-for="(item,index) in msg" :key="index">
        <h3>
          <i class="line"></i>
          {{item.hTitle}}
        </h3>
        <div>
          <van-grid :column-num="4" icon-size="40px">
            <van-grid-item 
              v-for="(itemc,indexc) in item.products"
              :key="indexc"
              :text="itemc.name"
              :icon="itemc.imgSrc"
			  to=""
            />
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: function() {
    return {
      msg: []
    };
  },
  mounted: function() {
    this.getHoneData("http://localhost:8000/Classification");
  },
  methods: {
    async getHoneData(path) {
      await fetch(path)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.msg = data;
        })
        .catch(function(e) {
          console.log("oops! error:", e.message);
        });
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.category-box{
	background: #f4f5f7;
}
.content {
		background: #fff;
        margin-bottom: 10/100rem;
  h3 {
    padding: 15/100rem;

    .line {
      margin-right: 10/100rem;
      display: inline-block;
      width: 5/100rem;
      height: 25/100rem;
      background: #37a3ff;
      vertical-align: -4/100rem;
    }
    font-size: 23/100rem;
    text-indent: 0.5em;
    color: #37a3ff;
  }
  .van-icon__image{
       width: 200/100rem;
	   height:200/100rem;
  }
}

</style>
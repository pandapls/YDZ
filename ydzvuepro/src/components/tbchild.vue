<template>
	<div class="tbchild" @click="send">
		<span :class="{active:jug}"><slot name="normalImg"></slot></span>
		<p :class="{active:jug}"><slot name="normalFont"></slot></p>
		<slot name="zero"></slot>
	</div>
</template>
<script>
	export default {
		name: "tbchild",
		props: ['mark', 'currname'],
		computed: {
			jug() {
				if(this.mark == this.currname) {
					return true;
				} else {
					return false;
				}

			}
		},
		methods: {
            send(){
            	this.$emit('change',this.mark)
            	this.$router.push('/'+this.mark)
            }
		}
	}
</script>
<style lang="less">
	@import url("../assets/iconfont/iconfont.css");
	.tbchild {
		
		flex: 1;
		font-size: 16px;
		line-height: .15rem;
		position:relative;
		
		.iconfont  {
			font-size: 30px;
		}
		.active{
			color: #69baff;
		}
	}
</style>
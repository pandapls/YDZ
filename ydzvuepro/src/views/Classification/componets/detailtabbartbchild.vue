<template>
	<div class="detailtbchild" @click="send">
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
            	
            }
		}
	}
</script>
<style lang="less">
	@import url("../../../assets/iconfont/iconfont.css");
	.detailtbchild {
		width: 23%;
		position:relative;
		text-align: center;
		p{
			margin-top: 5/100rem;
		}
		.iconfont  {
			font-size:22px;
		}
		.active{
			color: #69baff;
		}
	}
</style>
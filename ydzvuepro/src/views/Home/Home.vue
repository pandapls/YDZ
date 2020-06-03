<template>
	<div id="banner">
		这里是首页Home
			<!--轮播图-->
		<mt-swipe :auto="4000" >
			<mt-swipe-item><img src="../../assets/image/banner/banner01.jpg" /></mt-swipe-item>
			<mt-swipe-item><img src="../../assets/image/banner/banner02.png" /></mt-swipe-item>
			<mt-swipe-item><img src="../../assets/image/banner/banner03.jpg" /></mt-swipe-item>
			<mt-swipe-item><img src="../../assets/image/banner/banner04.jpg" /></mt-swipe-item>
			<mt-swipe-item><img src="../../assets/image/banner/banner05.jpg" /></mt-swipe-item>
			<mt-swipe-item><img src="../../assets/image/banner/banner06.jpg" /></mt-swipe-item>
			<mt-swipe-item><img src="../../assets/image/banner/banner07.jpg" /></mt-swipe-item>
		</mt-swipe>
	</div>



</template>、
<style lang="less">
	*{
		margin: 0;
		padding: 0;
	}
	#banner {
	height: 180px;
		width: 100%;
		img {
			width: 100%;
			height: 180px;
		}
	}
</style>
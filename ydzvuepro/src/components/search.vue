<template>
	<div class="search">
		<form action="/">
			<van-search v-model="value" shape="round" show-action background="#00a6ff" placeholder="免押金租电脑" @search="onSearch" @cancel="onCancel" />
		</form>
	</div>
</template>
<script>
	export default {
		name: "search"
	}
</script>
<style lang="less">

</style>
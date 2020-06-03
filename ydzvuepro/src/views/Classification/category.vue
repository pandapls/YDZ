<template>
	<div>
		这里是分类页面category
	</div>
</template>

<script>
	export default {
		name: "HelloWorld",
		data: function() {
			return {
				msg: []
			}
		},
		mounted: function() {
			this.getHoneData("http://localhost:8000/taishiji");
		},
		methods: {
			async getHoneData(path) {
				await fetch(path)
					.then(res => res.json())
					.then(data => {
						console.log(data)
						this.msg = data
					})
					.catch(function(e) {
						console.log("oops! error:", e.message);
					});
			}

		}
	}
</script>

<style>

</style>
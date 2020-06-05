<template>
	<div >
		<Search></Search>
		<Navitem></Navitem>
	</div>
</template>

<script>
	import Search from '../../components/search'
	import Navitem from './navitem'
	export default{
		name:"Goodslist",
		components:{
			Search,
			Navitem
		}
		
	}
</script>

<style>
</style>
<template>
  <div id="app">     
      <Tabbar></Tabbar>
    <router-view/>
  </div>
</template>
<script type="text/javascript">
	import {obj} from './utils.js'
	import Tabbar from './components/tabbar.vue'
	export default {
	  name: 'App',
	  components:{
	  	Tabbar
	  },
	  mounted:function(){
	  	obj.setRem()
	  }
	}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
	font-size: 16px;
}



</style>

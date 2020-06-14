<template>
	<div class="getaddress">
		<baidu-map v-bind:style="mapStyle" class="bm-view" @ready="handler" ak="wlrOaPCqmSBICVaoybtuThDvmaWHjHrq" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" @click="getClickInfo" @moving="syncCenterAndZoom" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom">
			<bm-view style="width: 100%; height:470px;"></bm-view>
			 <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
			<bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
			</bm-marker>
			<bm-control :offset="{width: '10px', height: '10px'}">
				<bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}" class="getadd">
					<input type="text" placeholder="请输入搜索关键字" class="serachinput">
				</bm-auto-complete>
			</bm-control>
			<bm-local-search :keyword="keyword" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
		</baidu-map>
	</div>
</template>
<script>
	  import {BaiduMap, BmControl, BmView, BmAutoComplete, BmLocalSearch, BmMarker,BmGeolocation} from 'vue-baidu-map'
	
	export default {
		name: "getaddress",
		components: {
			BaiduMap, BmControl, BmView, BmAutoComplete, BmLocalSearch, BmMarker,BmGeolocation
		},
		data: function() {
			return {
				showMapComponent: this.value,
				keyword: '',
				mapStyle: {
					width: '100%',
					height: this.mapHeight + 'px'
				},
				center: {
					lng: 116.404,
					lat: 39.915
				},
				zoom: 15
			}
		},
		watch: {
			value: function(currentValue) {
				this.showMapComponent = currentValue
				if(currentValue) {
					this.keyword = ''
				}
			}
		},
		methods: {
			/***
			 * 地图点击事件。
			 */
			getClickInfo(e) {
				this.center.lng = e.point.lng
				this.center.lat = e.point.lat
				let geoCoder = new BMap.Geocoder();
				geoCoder.getPoint(this.keyword, point => {
				      this.center.lng = e.point.lng
					this.center.lat = e.point.lat
			      })
				 geoCoder.getLocation(e.point, res=>{
//			          console.log(res);
			          this.$store.state.mapaddress = res.address
			     })
			},
			syncCenterAndZoom(e) {
				const {
					lng,
					lat
				} = e.target.getCenter()
				this.center.lng = lng
				this.center.lat = lat
				this.zoom = e.target.getZoom()
//				console.log(this.center.lng,this.center.lat)
				let map = new BMap.Map("bm-view");      
//				map.centerAndZoom(new BMap.Point(this.center.lng, this.center.lat), 11);      
				// 创建地理编码实例, 并配置参数获取乡镇级数据
				let myGeo = new BMap.Geocoder({extensions_town: true});      
				// 根据坐标得到地址描述    
				let that =this
				myGeo.getLocation(new BMap.Point(this.center.lng, this.center.lat), function(result){      
				    if (result){      
				   	 that.$store.state.mapaddress = result.address
				    }      
				});

			},
			handler({BMap,map}){
				let that =this;
				let geolocation = new BMap.Geolocation()
				geolocation.getCurrentPosition(function(r){
//					console.log(r)
					that.center = {
						lng:r.longitude,
						lat:r.latitude
					}
					let myGeo = new BMap.Geocoder({extensions_town: true});  
					myGeo.getLocation(new BMap.Point(r.longitude,r.latitude), function(result){      
				    if (result){      
				      that.$store.state.mapaddress = result.address
				    }      
				});
				},{enableHighAccuracy:true})
			}
		}
	}
</script>
<style scoped>
	.getaddress{
		position: fixed;
		/*height: 600/100rem;*/
		width: 100%;
		top: 0;
		left: 0;
		z-index: 200000;
	}
	.serachinput {
		position: fixed;
		bottom: 70px;
		width: 100%;
		box-sizing: border-box;
		padding: 9px;
		border: 1px solid #dddee1;
		line-height: 20px;
		font-size: 16px;
		height: 38px;
		color: #333;
		/*position: relative;*/
		border-radius: 4px;
		-webkit-box-shadow: #666 0px 0px 10px;
		-moz-box-shadow: #666 0px 0px 10px;
		box-shadow: #666 0px 0px 10px;
	}
</style>
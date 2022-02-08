<template>
  <div id="map"></div>
</template>
<script>
export default {
  props: {
    position: {
      type: Object,
      require: true
    }
  },
  mounted() {
    this.loadMap()
  },
  methods: {
    loadMap() {
      const { latitude, longitude } = this.position
      var map = new BMap.Map('map')
      var point = new BMap.Point(longitude, latitude) // MARK 经纬度
      map.disableDoubleClickZoom()
      map.centerAndZoom(point, 18)
      var marker = new BMap.Marker(point)
      map.addOverlay(marker)
    }
  }
}
</script>

<style>
  #map{
    width: 100%;
    height: 100%;
    min-height: 200px;
  }
</style>
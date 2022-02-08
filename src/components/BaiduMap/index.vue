<template>
  <div id="map"></div>
</template>
<script>
export default {
  data() {
    return {
      os: '',
      map: ''
    }
  },
  mounted() {
    this.isOpenGPS()
  },
  methods: {
    // IS OPEN GPS
    isOpenGPS() {
      if (window.plus && window.plus.os) {
        this.os = window.plus.os.name;
        if (window.plus.os.name === 'Android') {
          const context = window.plus.android.importClass('android.content.Context')
          const locationManager = window.plus.android.importClass('android.location.LocationManager')
          const main = window.plus.android.runtimeMainActivity()
          const mainSvr = main.getSystemService(context.LOCATION_SERVICE)
          const androidIsOpen = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)
          if (androidIsOpen) {
            this.loadMap()
          } else {
            window.plus.nativeUI.toast('Please open the GPS!')
            this.$emit('err')
          }
        } else if (window.plus.os.name === 'iOS') {
          const CLLocationManager = window.plus.ios.importClass('CLLocationManager')
          if (CLLocationManager.locationServicesEnabled()) {
            this.loadMap()
          } else {
            window.plus.nativeUI.toast('Please open the GPS!')
            this.$emit('err')
          }
        }
      }
    },
    // INIT MAP AND LOAD
    loadMap() {
      const map = new BMap.Map('map')
      this.map = map
      const point = new BMap.Point(105.810926,21.033778) // 越南首都河内坐标[BaiDu]
      this.getLocation(point)
      map.disableDoubleClickZoom()
      map.centerAndZoom(point, 18)
      this.getCurrentPosition()
    },
    // GET LOCATION INFO
    getCurrentPosition() {
      if (window.plus && window.plus.geolocation) {
        window.plus.geolocation.getCurrentPosition((p) => {
          const currentPoint = new BMap.Point(p.coords.longitude, p.coords.latitude)
          const convertor = new BMap.Convertor()
          this.$toast.loading({ duration: 0 })
          convertor.translate([currentPoint], 1, 5, this.translateCallback)
        }, () => {
          window.plus.nativeUI.toast('Please open the GPS!')
        }, {
          provider: 'system',
          enableHighAccuracy: true
        })
      }
    },
    // TRANSLATE MAP POINT
    translateCallback (data) {
      if (data.status == 0) {
        setTimeout(() => {
          this.$toast.clear()
        }, 1000)
        this.map.panTo(data.points[0])
        this.getLocation(data.points[0])
      }
    },
    // GET POINT AND ADD MAKER
    getLocation (point) {
      this.map.clearOverlays()
      const geoc = new BMap.Geocoder()
      geoc.getLocation(point, (rs) => {
        const location = {
          address: rs.address,
          point: point
        }
        const { lng, lat } = point
        var pt = new BMap.Point(lng, lat)
        var marker = new BMap.Marker(pt)
        this.map.addOverlay(marker)
        this.$emit('ok', location)
      })
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
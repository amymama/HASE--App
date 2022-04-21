<template>
  <div class="location-box">
    <van-popup
      v-model="visible"
      position="bottom"
      closeable
      close-icon="clear"
      :style="{ height: '100%', width: '100%' }">
      <baidu-map-mark
        :position="position"
        ref="baiduMap"
      />
      <div class="action__footer">
        <van-cell
          icon="shop-o"
          center
          :title="shop_name"
          :label="shop_code"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import BaiduMapMark from '@/components/BaiduMapMark'

export default {
  name: 'ShopLocation',
  components: {
    BaiduMapMark
  },
  data() {
    return {
      visible: false,
      position: {},
      shop_name: '',
      shop_code: ''
    }
  },
  methods: {
    // show modal
    show() {
      this.visible = true
      const {
        new_latitude,
        new_longitude,
        new_name,
        new_code
      } = this.$route.query
      this.position = {
        latitude: new_latitude,
        longitude: new_longitude
      }
      this.shop_name = new_name
      this.shop_code = new_code
    }
  }
}
</script>
<style lang="scss" scoped>
.location-box{
  position: relative;
  padding: 12px;
  .action__footer{
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    i{
      font-size: 42px;
      color: #2058AB;
    }
  }
}
</style>
<style lang="scss">
.location-box{
  .van-popup__close-icon{
    color: #3e86d0;
    font-size: 48px;
  }
}
</style>
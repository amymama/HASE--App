<template>
  <div class="location-box">
    <van-popup
      v-model="visible"
      position="bottom"
      closeable
      close-icon="clear"
      :style="{ height: '100%', width: '100%' }"
    >
      <baidu-map v-if="visible" ref="baiduMap" @ok="handleOk" />
      <div class="shop-positon__info">
        <div class="shop-positon__address">Area: {{ position.address }}</div>
        <div class="shop-positon__submit">
          <van-button
            round
            block
            :disabled="!GPSeditable"
            color="linear-gradient(to right, #5287d8, #2058AB)"
            @click="handleSubmit"
          >{{ $t('shopCommon.Submit') }}</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import BaiduMap from '@/components/BaiduMap'

export default {
  name: 'ShopLocation',
  components: {
    BaiduMap
  },
  props: {
    GPSeditable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      position: '',
    }
  },
  methods: {
    // show modal
    show() {
      this.visible = true
      const { new_latitude, new_longitude } = this.$route.query
      this.position = {
        latitude: new_latitude,
        longitude: new_longitude
      }
      this.positionCopy.longitude = new_longitude
    },
    // get shop position
    handleOk(position) {
      this.position = position
    },
    // submit
    handleSubmit() {
      const { new_latitude, new_longitude } = this.$route.query
      const { point } = this.position
      if (point.latitude === new_latitude && point.longitude === new_longitude) {
        this.position.editable = true // 地理位置相同则允许再次编辑
        this.$emit('ok', this.position)
        this.visible = false
        return
      }
      this.$dialog
        .confirm({
          message: this.$t('shopMaster.GPSInfo')
        }).then(() => {
          this.$emit('ok', this.position)
          this.visible = false
        }).catch(() => { })
    }
  }
}
</script>
<style lang="scss">
.location-box {
  position: relative;
  .van-popup__close-icon {
    color: #3e86d0;
    font-size: 48px;
  }
  .shop-positon__info {
    background: #fff;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    .shop-positon__address {
      padding: 32px;
      border-bottom: 1px solid #e2e2e2;
    }
    .shop-positon__submit {
      padding: 42px 32px;
    }
  }
}
</style>
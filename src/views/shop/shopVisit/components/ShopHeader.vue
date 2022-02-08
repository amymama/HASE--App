<template>
  <div class="shop-visit-header">
    <div class="header-level">
      {{ shopInfo.new_shop_class || 'NA' }}
    </div>
    <div class="header-info">
      <h2>{{ shopInfo.new_name }}</h2>
      <p class="header-code-tag">
        <span>{{ shopInfo.new_code }}</span>
        <span>{{ shopInfo.new_customer_code }}</span>
        <van-tag color="#2058AB">{{ shopInfo.new_channel_name }}</van-tag>
      </p>
    </div>
    <router-link
      class="shop-i"
      :to="{
        name: 'ShopMasterData',
        query: {
          shop_id: shopInfo.new_shopid
        }
      }">
      <van-icon name="info" />
    </router-link>
    <shop-position ref="shopPosition" />
  </div>
</template>

<script>
import ShopPosition from '@/components/ShopPosition'

export default {
  name: 'ShopHeader',
  components: {
    ShopPosition
  },
  props: {
    shopInfo: {
      type: Object,
      require: true
    }
  },
  methods: {
    // show location
    handleShowLocation() {
      const { new_latitude, new_longitude } = this.shopInfo
      if (new_latitude && new_longitude) {
        this.$refs.shopPosition.show()
      } else {
        this.$toast('Longitude and latitude are not maintained')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .shop-visit-header{
    background: #3e86d0;
    color: #FFF;
    padding: 24px;
    display: flex;
    align-items: center;
    position: relative;
    height: 150px;
    .header-level{
      width: 64px;
      height: 64px;
      line-height: 64px;
      text-align: center;
      border-radius: 50%;
      font-size: $font32;
      background: #FFF;
      color: #333;
      overflow: hidden;
    }
    .header-info{
      overflow: hidden;
      flex: 1;
      padding: 12px 24px;
      h2{
        width: 90%;
        font-size: $font28;
        line-height: 150%;
        margin-bottom: 10px;
      }
      p{
        font-size: $font24;
        line-height: 34px;
        span{
          display: inline-block;
          margin-right: 24px;
          margin-bottom: 6px;
        }
      }
    }
    .shop-location{
      position: absolute;
      right: 24px;
      font-size: 42px;
      top: 42px;
    }
    .shop-i{
      position: absolute;
      right: 24px;
      bottom: 32px;
      i{
        color: #FFF;
        font-size: 42px;
      }
    }
  }
</style>
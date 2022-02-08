<template>
  <div class="flex-layout shopcard">
    <div class="flex-layout__header">
      <!-- TOP BAR -->
      <van-nav-bar
        left-arrow
        @click-left="goBack"
        title="Shop Card"
        right-text="Latest visit"
        @click-right="onClickRight"
      />
      <!-- SHOP HEADER -->
      <shop-header :shopInfo="query" />
    </div>
    <!-- tabs -->
    <div class="flex-layout__body shopcard-tabs">
      <van-tabs v-model="active">
        <van-tab title="AQUA RANK">
          <aqua-rank />
        </van-tab>
        <van-tab title="AQUA CLASS">
          <aqua-class />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import ShopHeader from '@/views/shop/shopVisit/components/ShopHeader'
import AquaRank from './components/AquaRank'
import AquaClass from './components/AquaClass'

export default {
  name: 'ShopCard',
  components: {
    ShopHeader,
    AquaRank,
    AquaClass
  },
  data() {
    return {
      query: {},
      active: 0
    }
  },
  created () {
    this.query = this.$route.query
  },
  methods: {
    onClickRight () {
      const {
        new_visit_total_id,
        new_shopid,
        new_channel_name,
        new_code,
        new_name,
        new_customer_code,
        new_shop_class
      } = this.query
      if (new_visit_total_id) {
        this.$router.push({
          name: 'ShopVisitHistoryDetail',
          query: {
            new_channel_name: new_channel_name || '',
            new_code: new_code,
            new_customer_code: new_customer_code || '',
            new_name: new_name,
            new_shop_class: new_shop_class || '',
            new_shopid: new_shopid,
            new_visit_totalid: new_visit_total_id
          }
        })
      } else {
        this.$toast.fail('Have not any visit recorded')
      }
    }
  }
}
</script>
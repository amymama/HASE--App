<template>
  <div class="aqua-class">
    <filter-month @ok="handleOk" />
    <div class="aqua-class-list">
      <div class="aqua-class-group">
        <van-cell-group class="aqua-class-group">
          <van-cell title="Shop Class" :value="new_aqua_class" />
          <van-cell title="AQUA Class" :value="new_shop_class" />
        </van-cell-group>
      </div>
      <div class="aqua-class-group">
        <van-grid :column-num="3">
          <van-grid-item
            v-for="(item, index) in shopClass"
            :key="index"
            :text="item.title"
          >
            <template #icon>
              <span class="aqua-level">{{ item.value }}</span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>
<script>
import { getShopCardOfAquaClass } from '@/api/shop'
import FilterMonth from './FilterMonth'

export default {
  name: 'AquaClass',
  components: {
    FilterMonth
  },
  data () {
    return {
      new_aqua_class: '',
      new_shop_class: '',
      shopClass: [
        { title: 'Shop Size', value: '' },
        { title: 'Location', value: '' },
        { title: 'Shop Retail', value: '' },
        { title: 'AQUA Retail', value: '' },
        { title: 'Display Share', value: '' },
        { title: 'Retail Share', value: '' }
      ],
      record: {}
    }
  },
  methods: {
    // get AQUA Class
    handleGet (values) {
      const { new_shopid } = this.$route.query
      this.$toast.loading({ duration: 0, forbidClick: true })
      getShopCardOfAquaClass({
        new_year: values[0],
        new_month: values[1],
        new_shop_id: new_shopid
      }).then((res) => {
        this.$toast.clear()
        const { success, data } = res
        if (success) {
          this.record = data.Items
          if (this.record) {
            this.new_aqua_class = this.record.new_aqua_class || 'N/A'
            this.new_shop_class = this.record.new_shop_class || 'N/A'
            this.shopClass[0].value = this.record.new_shop_size_level || 'N/A'
            this.shopClass[1].value = this.record.new_shop_location_level || 'N/A'
            this.shopClass[2].value = this.record.new_shop_retail_amount_level || 'N/A'
            this.shopClass[3].value = this.record.new_aqua_retail_amount_level || 'N/A'
            this.shopClass[4].value = this.record.new_display_share_percent_level || 'N/A'
            this.shopClass[5].value = this.record.new_retail_share_percent_level || 'N/A'
          } else {
            this.new_aqua_class = 'N/A'
            this.new_shop_class = 'N/A'
            this.shopClass[0].value = 'N/A'
            this.shopClass[1].value = 'N/A'
            this.shopClass[2].value = 'N/A'
            this.shopClass[3].value = 'N/A'
            this.shopClass[4].value = 'N/A'
            this.shopClass[5].value = 'N/A'
          }
        }
      }).catch(() =>{
        this.$toast.fail('Network Error')
      })
    },
    handleOk (values) {
      this.handleGet(values)
    }
  }
}
</script>
<style lang="scss" scoped>
.aqua-class-list{
  padding: 24px;
  .aqua-class-group{
    margin-bottom: 12px;
    border-radius: 12px;
    overflow: hidden;
    .aqua-level{
      display: inline-block;
      width: 64px;
      height: 64px;
      line-height: 64px;
      text-align: center;
      border-radius: 50%;
      background: #2058AB;
      color: #FFF;
      font-size: $font24;
    }
  }
}
</style>
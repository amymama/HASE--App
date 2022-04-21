<template>
  <div class="aqua-rank">
    <filter-month @ok="handleOk" />
    <div class="aqua-rank-table" v-if="record">
      <div class="aqua-rank-grid">
        <van-grid :column-num="4" :border="false">
          <van-grid-item
            v-for="(item, index) in aquaRank"
            :key="index"
            :text="item.title">
            <template #icon>
              <span class="rank-level">
                {{ item.value }}
              </span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="aqua-rank-table__inner">
        <table>
          <thead>
          <tr>
            <th colspan="2">Shop</th>
            <th>PMT</th>
            <th>Product</th>
            <th colspan="4">AQUA Display</th>
            <th colspan="3">Retail</th>
            <th colspan="2">Promotion</th>
          </tr>
          <tr>
            <th>Shop Size</th>
            <th>Shop Class</th>
            <th>PMT Class</th>
            <th>Product Category</th>
            <th>Display Class</th>
            <th>Display QTY</th>
            <th>Display Ratio</th>
            <th>Display Rank</th>
            <th>Retail Ammount</th>
            <th>Retail Ratio</th>
            <th>Retail Rank</th>
            <th>Promotion QTY</th>
            <th>Shop Promotion Rank</th>
          </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in list"
              :key="index"
              :class="{
                'bglight': item.new_product_category == 'AQUA Total',
                'bgDeep': item.new_product_category == 'Shop Total'
              }">
              <template v-if="index == 0">
                <td :rowspan="list.length">{{ parseInt(new_shop_size) }}</td>
                <td :rowspan="list.length">{{ new_shop_class }}</td>
                <td :rowspan="list.length">{{ new_pmt_class }}</td>
              </template>
              <td>{{ item.new_product_category }}</td>
              <td>
                <template v-if="item.new_product_category == 'AQUA Total' || item.new_product_category == 'Shop Total'">-</template>
                <template v-else>{{ item.new_display_class || 'N/A' }}</template>
              </td>
              <td>{{ item.new_display_qty || 0 }}</td>
              <td>
                <template v-if="item.new_product_category == 'Shop Total'">-</template>
                <template v-else>{{ item.new_display_radio ? `${(Number(item.new_display_radio)*100).toFixed(2)}%` : '0%' }}</template>
              </td>
              <td>
                <template v-if="item.new_product_category == 'Shop Total'">-</template>
                <template v-else>{{ item.new_display_rank || 'N/A' }}</template>
              </td>
              <td>{{ item.new_retail_amount || 'N/A' }}</td>
              <td>
                <template v-if="item.new_product_category == 'Shop Total'">-</template>
                <template v-else>{{ item.new_retail_radio ? `${(Number(item.new_retail_radio)*100).toFixed(2)}%` : '0%' }}</template>
              </td>
              <td>
                <template v-if="item.new_product_category == 'Shop Total'">-</template>
                <template v-else>{{ item.new_retail_rank || 'N/A' }}</template>
              </td>
              <td>{{ item.new_promotion_qty || 0 }}</td>
              <td>
                <template v-if="item.new_product_category == 'Shop Total'">-</template>
                <template v-else>{{ item.new_promotion_rank || 'N/A' }}</template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <van-empty v-else :description="$t('shopCommon.NoData')" />
  </div>
</template>
<script>
import { getShopCardOfAquaRank } from '@/api/shop'
import FilterMonth from './FilterMonth'

export default {
  name: 'AquaRank',
  components: {
    FilterMonth
  },
  data () {
    return {
      query: {},
      aquaRank: [
        {
          title: 'Promoter Class',
          value: ''
        },
        {
          title: 'Retail Rank',
          value: ''
        },
        {
          title: 'Display Rank',
          value: ''
        },
        {
          title: 'Promotion Rank',
          value: ''
        },
      ],
      new_shop_size: '',
      new_shop_class: '',
      new_pmt_class: '',
      list: [],
      record: null
    }
  },
  methods: {
    handleGet (values) {
      const { new_shopid } = this.$route.query
      this.$toast.loading({ duration: 0, forbidClick: true })
      this.record = null
      getShopCardOfAquaRank({
        new_year: values[0],
        new_month: values[1],
        new_shop_id: new_shopid
      }).then((res) => {
        this.$toast.clear()
        const { success, data } = res
        if (success) {
          this.record = data.Items
          if (this.record) {
            this.new_shop_size = this.record.new_shop_size || 'N/A'
            this.new_shop_class = this.record.new_shop_class || 'N/A'
            this.new_pmt_class = this.record.new_pmt_class || 'N/A'
            this.list = this.record.new_cate_data || []
            this.aquaRank[0].value = this.record.new_promoter_class || 'N/A'
            this.aquaRank[1].value = this.record.new_retail_rank || 'N/A'
            this.aquaRank[2].value = this.record.new_display_rank || 'N/A'
            this.aquaRank[3].value = this.record.new_promotion_rank || 'N/A'
          }
        } else {
          this.$toast.fail('Error')
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
.aqua-rank-grid{
  padding: 24px 12px;
  .rank-level{
    display: block;
    margin-bottom: 12px;
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
.aqua-rank-table{
  background: #FFF;
  padding-bottom: 24px;
  .aqua-rank-table__inner{
    width: 94%;
    margin: 0 auto;
    overflow-x: scroll;
    th,td {
      text-align: center;
      border: 1PX solid #EEE;
      padding: 18px;
      white-space: nowrap;
    }
    thead{
      background: #F1F8FF;
      color: rgb(51, 51, 51);
    }
    tbody{
      color: #666;
    }
  }
}
.bglight {
  background: #5997d8;
  td{
    color: #FFF;
  }
}
.bgDeep{
  background: #2058AB;
  td{
    color: #FFF;
  }
}
</style>
<style lang="scss">
.aqua-rank-grid{
  .van-grid-item__content{
    padding-left: 0;
    padding-right: 0;
    .van-grid-item__text{
      font-size: $font24;
    }
  }
}
</style>
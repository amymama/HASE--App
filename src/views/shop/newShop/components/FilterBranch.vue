<template>
  <div class="region">
    <van-popup
      v-model="visible"
      round
      position="bottom">
        <van-cascader
          title="Select Region"
          :options="list"
          :field-names="{
            text: 'new_name',
            value: 'new_sale_regionid',
            children: 'children',
          }"
          @close="visible = false"
          @change="onChangeSaleRegion"
        />
      <div>
         <van-button
            block
            square
            color="#2058AB"
            @click="onChangeBranch"
          >
            {{ $t("shopCommon.Submit") }}
          </van-button>
      </div>
    </van-popup> 
  </div>
</template>
<script>
import { getSaleregionTreelist } from '@/api/shop'

export default {
  name: 'FilterBranch',
  data () {
    return {
      visible: false,
      list: [],
      selectedOptions: [],
      tabIndex: null,
    }
  },
  created () {
    this.handleGetBranch()
  },
  methods: {
    show () {
      this.visible = true
    },
    // GET REGION BRANCH
    handleGetBranch () {
      getSaleregionTreelist().then((res) => {
        const { success, data } = res
        if (success) {
          var list = data.Items
          list.unshift({
            new_name: this.$t('shopCommon.All'),
            new_sale_regionid: '',
            new_short_name: this.$t('shopCommon.All'),
            regionlist: []
          })
          this.list = list
        }
      })
    },
        // change saleRegion
    onChangeSaleRegion(values) {
      const { selectedOptions, tabIndex } = values;
      this.selectedOptions = selectedOptions
      this.tabIndex = tabIndex
    },
    // CHANGE BRANCH
    onChangeBranch () {
      this.$emit('ok', this.selectedOptions, this.tabIndex)
      this.visible = false
    }
  }
}
</script>
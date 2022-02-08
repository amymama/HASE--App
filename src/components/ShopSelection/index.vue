<template>
  <van-popup v-model="showShopPicker" position="bottom" round>
    <van-search
      v-model="searchShopKey"
      :placeholder="$t('pmt.SelectShopTitle')"
      @input="changeShopKey"
    />
      <van-picker
        show-toolbar
        :columns="shopSelectData"
        @cancel="onCancel"
        @confirm="onConfirm"
        value-key="text"
        :confirm-button-text="$t('pmt.confirmButton')"
        :cancel-button-text="$t('pmt.cancelButton')"
      />
  </van-popup>
</template>

<script>
import {getAllShopList} from '@/api/common'
let timeout, currentValue

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  currentValue = value

  function fake() {
    let params = {
      text: value,
      id: value
    }
    getAllShopList(params).then((res) => {
      const { success, data } = res
      if (success) {
        callback(data)
      }
    })
  }
  timeout = setTimeout(fake, 400);
}
export default {
  name: 'ShopSelection',
  props: {
    value: Boolean
  },
  watch: {
    value(val) {
      this.showShopPicker = val
    }
  },
  data() {
    return {
      searchShopKey: "",
      shopSelectData: [],
      showShopPicker: false,
    }
  },
  created() {
    // this.getAllShopList()
  },
  methods: {
    getAllShopList() {
      // getAllShopList().then((res) => {
      //   console.log(res)
      //   const { success, data } = res
      //   if(success) {
      //     data.forEach(item => {
      //       item.upText = (item.text).toUpperCase()
      //       item.lowText = (item.text).toLowerCase()
      //     })
      //     this.shopSelectData = data
      //     this.shopSaveSelectData = data
      //   }
      // }).catch((err) =>{
      //   console.log(err)
      // })
    },

    onCancel() {
      this.$emit('input', false)
    },

    onConfirm(value) {
      this.$emit('input', false)
      this.$emit('confirm', value)
    },

    changeShopKey() {
      if (this.searchShopKey) {
        fetch(this.searchShopKey, (data) => {
          this.shopSelectData = data
        })
      }
    },
  }
}
</script>
<style lang="scss" scoped>

</style>

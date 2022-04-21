<template>
  <div class="region">
    <van-popup
      v-model="visible"
      round
      position="bottom">
      <van-cascader
        title="Select channel"
        :options="list"
        :closeable="false"
        :field-names="{
          text: 'new_name',
          value: 'new_channelid',
          children: 'children'
        }"
        @close="visible = false"
        @finish="onChangeBranch"
      />
    </van-popup> 
  </div>
</template>
<script>
import { getChannelTree } from '@/api/shop'

export default {
  name: 'SelectRegionBranch',
  data () {
    return {
      visible: false,
      list: []
    }
  },
  created () {
    this.handleGetChannel()
  },
  methods: {
    show () {
      this.visible = true
    },
    // GET REGION BRANCH
    handleGetChannel () {
      getChannelTree().then((res) => {
        const { success, data } = res
        if (success) {
          var list = data.Items
          list.unshift({
            new_name: this.$t('shopCommon.All'),
            new_channelid: '',
            new_parentid: '',
            children: [],
          })
          list.map((item) => {
            item.children.unshift({
              new_name: this.$t('shopCommon.All'),
              new_channelid: '',
              new_parentid: item.new_channelid
            })
          })
          this.list = list
        }
      })
    },
    // CHANGE BRANCH
    onChangeBranch (values) {
      const { selectedOptions } = values
      this.$emit('ok', selectedOptions)
      this.visible = false
    }
  }
}
</script>
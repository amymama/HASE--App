<template>
  <div class="flex-layout visit-history">
    <div class="flex-layout__header">
      <!-- TOP BAR -->
      <van-nav-bar
        left-arrow
        @click-left="goBack"
        :title="$t('shopVisit.MyShopVisits')" />
      <!-- TABS -->
      <van-tabs
        v-model="active"
        animated
        @click="onChangeTabs">
        <van-tab
          v-for="(item, index) in tabs"
          :key="index"
          :title="item.title" >
        </van-tab>
      </van-tabs>
    </div>
    <div class="flex-layout__body">
      <history-list ref="historyList" :queryParams="queryParams" :isMy="true" />
    </div>
  </div>
</template>

<script>
import HistoryList from './components/HistoryList'

export default {
  name: 'MyVisitHistory',
  components: {
    HistoryList
  },
  data() {
    return {
      active: 0,
      tabs: [
        { title: this.$t('shopStatus.Draft') },
        { title: this.$t('shopStatus.Submited') }
      ],
      // data list
      queryParams: {
        new_status: 2
      }
    }
  },
  methods: {
    // change tabs
    onChangeTabs (index) {
      switch (index) {
        case 0:
          this.queryParams.new_status = 2
          break;
        case 1:
          this.queryParams.new_status = 0
          break
      }
      this.$refs.historyList.initData()
    }
  }
}
</script>
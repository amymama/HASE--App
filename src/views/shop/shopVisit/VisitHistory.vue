<template>
  <div class="flex-layout visit-history">
    <div class="flex-layout__header">
      <!-- TOP BAR -->
      <van-nav-bar
        left-arrow
        @click-left="goBack"
        :title="$t('shopVisit.MyShopVisits')"
        @click-right="$refs.filterVisit.show()">
        <template #right>
          <van-icon
            name="wap-nav"
            class="right-icon-filter"/>
        </template>
      </van-nav-bar>
      <!-- TABS -->
      <div class="inner-fliter">
        <div class="filter-branch van-ellipsis"
          @click="$refs.selectRegion.show()">
          {{ branchName }}
        </div>
        <div class="filter-search">
          <van-search
            clearable
            v-model="queryParams.new_name"
            @click="$refs.searchHistory.handleShow()"
            readonly
            shape="round"
            background="none"
            :placeholder="$t('shopVisit.VisitSearch')">
            <template #right-icon>
              <van-icon
                v-if="queryParams.new_name"
                name="clear"
                color="#CCC"
                @click.stop="clearSearch"
              />
            </template>
          </van-search>
        </div>
        <div class="filter-icon" @click="$refs.selectChannel.show()">
          <van-icon name="filter-o" />
        </div>
      </div>

    </div>
    <div class="flex-layout__body">
      <history-list ref="historyList" :queryParams="queryParams" />
    </div>
    <!-- CHANNEL SELECT -->
    <search-history ref="searchHistory" searchType="shop" @ok="handleSearchOk" />
    <filter-branch ref="selectRegion" @ok="handleRegionOk" />
    <filter-channel ref="selectChannel" @ok="handleChannelOk" />
    <filter-visit ref="filterVisit" @ok="handleVisitOk" />
  </div>
</template>

<script>
import SearchHistory from "@/components/SearchHistory"
import FilterBranch from '@/views/shop/newShop/components/FilterBranch'
import FilterChannel from "@/views/shop/newShop/components/FilterChannel"
import FilterVisit from './components/FilterVisit'
import HistoryList from './components/HistoryList'

export default {
  name: 'VisitHistory',
  components: {
    SearchHistory,
    FilterBranch,
    FilterChannel,
    FilterVisit,
    HistoryList
  },
  data() {
    return {
      active: 0,
      tabs: [
        { title: this.$t('shopStatus.Submited') }
      ],
      // data list
      queryParams: {
        new_status: 0,
        new_name: '',
        new_code: ''
      },
      branchName: this.$t('shopCommon.All')
    }
  },
  methods: {
    initData () {
      this.$refs.historyList.initData()
    },
    // search ok
    handleSearchOk(key) {
      this.queryParams.new_name = key
      this.queryParams.new_code = key
      this.initData()
    },
    // clear search
    clearSearch() {
      this.queryParams.new_name = ''
      this.queryParams.new_code = ''
      this.initData()
    },
    // filter for region
    handleRegionOk(selectedOptions, tabIndex) {
      if (selectedOptions.length > 0) {
        this.queryParams.new_region_id =
          tabIndex >= 0 ? selectedOptions[0].new_sale_regionid : "";
        this.queryParams.new_branch_id =
          tabIndex >= 1 ? selectedOptions[1].new_sale_regionid : "";
        this.branchName = selectedOptions[tabIndex].new_name;
        this.initData();
      }
    },
    // filter for region
    handleChannelOk(values) {
      this.queryParams.new_channel_id = values[1].new_channelid
      this.queryParams.new_channel_parentid = values[1].new_parentid
      this.initData()
    },
    // filter other
    handleVisitOk (params) {
      this.queryParams = Object.assign(this.queryParams, params)
      this.initData()
    }
  }
}
</script>
<style lang="scss" scoped>
  .inner-fliter {
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 60px;
    text-align: center;
    .filter-branch {
      display: block;
      overflow: hidden;
      max-width: 150px;
      line-height: 30px;
      font-size: $font24;
      color: #666;
    }
    .filter-search {
      flex: 1;
    }
    .filter-icon {
      padding: 0 14px;
      i {
        font-size: $font32;
      }
    }
  }
</style>
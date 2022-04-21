<template>
  <div class="flex-layout notice-list">
    <div class="flex-layout__header">
      <!-- TOP BAR -->
      <van-nav-bar
        left-arrow
        @click-left="goBack"
        title="Notice List"
      />
    </div>
    <div class="flex-layout__body">
      <van-empty v-if="noRes" :description="$t('shopCommon.NoData')" />
      <van-list
        v-else
        v-model="loading"
        :finished="finished"
        :finished-text="$t('shopCommon.NoMoreData')"
        @load="onLoad"
        :error.sync="error"
        :error-text="$t('shopCommon.RequestErrorText')">
        <van-cell-group>
          <van-cell
            center
            is-link
            v-for="(item, index) in list"
            :key="index"
            :title="item.new_title"
            :label="item.new_publish_time"
            @click="$refs.noticeDetail.show(item)">
            <template #icon>
              <div v-if="item.new_announce_type == 0" class="notice-type notice-type__a">A</div>
              <div v-if="item.new_announce_type == 1" class="notice-type notice-type__p">P</div>
            </template>
          </van-cell>
        </van-cell-group>
      </van-list>
      <!-- NOTICE DETAIL -->
      <notice-detail ref="noticeDetail" />
    </div>
  </div>
</template>
<script>
import { getAnnounceReadList } from '@/api/annoucement'
import NoticeDetail from './components/NoticeDetail'

export default {
  name: 'NoticeList',
  components: {
    NoticeDetail
  },
  data() {
    return{
      list: [],
      // load more data
      page_no: 0,
      page_size: 20,
      loading: false,
      finished: false,
      noRes: false,
      error: false
    }
  },
  methods: {
    // Init Data
    initData() {
      this.list = []
      this.page_no = 0
      this.loading = true
      this.finished = false
      this.noRes = false
      this.error = false
      this.onLoad()
    },
    // PULL UP LOAD DATA
    onLoad() {
      setTimeout(() => {
        this.page_no++
        getAnnounceReadList({
          itemsperpage: this.page_size,
          page: this.page_no
        }).then((res) => {
          const { success, data } = res
          if (success) {
            var Items = data.Items || []
            this.loading = false
            this.list = this.list.concat(Items)
            if (this.list.length === 0) {
              this.noRes = true
            }
            if (Items.length < this.page_size) {
              this.finished = true
            }
          }
        }).catch(() => {
          this.page_no = 0
          this.loading = false
          this.error = true
        })
      }, 100)
    }
  }
}
</script>
<style lang="scss" scoped>
.notice-type{
  display: block;
  width: 64px;
  height: 64px;
  color: #FFF;
  line-height: 64px;
  text-align: center;
  border-radius: 50%;
  margin-right: 12px;
  font-size: $font32;
  &.notice-type__a{
    background: #1989fa;
  }
  &.notice-type__p{
    background: #ff976a;
  }
}
</style>
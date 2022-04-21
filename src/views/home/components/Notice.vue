<template>
  <div class="notice-box" 
    v-if="list.length > 0">
    <van-notice-bar
      left-icon="volume-o"
      background="#FFF"
      color="#2058AB"
      :scrollable="false">
      <template #right-icon>
        <router-link :to="{ name: 'Notice' }">
          <van-icon name="wap-nav" />
        </router-link>
      </template>
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item
          class="notice-item"
          v-for="(item, index) in list"
          :key="index"
          @click="$refs.noticeDetail.show(item)">
          <van-tag v-if="item.new_announce_type == 0" type="primary" style="margin-right: 10px">
            Announce
          </van-tag>
          <van-tag v-if="item.new_announce_type == 1" type="warning" style="margin-right: 10px">
            Policy
          </van-tag>
          {{ item.new_title }}
        </van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <!-- NOTICE DETAIL -->
    <notice-detail ref="noticeDetail" />
  </div>
</template>
<script>
import { getAnnounceReadList } from '@/api/annoucement'
import NoticeDetail from '@/views/notice/components/NoticeDetail'

export default {
  name: 'Notice',
  components: {
    NoticeDetail
  },
  data() {
    return {
      list: []
    }
  },
  created () {
    this.handleGet()
  },
  methods: {
    handleGet () {
      this.$toast.loading({ duration: 0 })
      getAnnounceReadList({
        itemsPerPage: 10,
        page: 1
      }).then((res) => {
        this.$toast.clear()
        const { success, data } = res
        if (success) {
          if (data.length == 0) {
            this.visible = false
          } else {
            this.visible = true
            this.list = data.Items
          }
        } else {
          this.visible = false
        }
      }).catch(() => {
        this.visible = false
        this.$toast.clear()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .notice-box {
    .view-more{
      padding-left: 12px;
      font-size: $font24;
      color: #999;
    }
    .notice-item{
      color: #666;
      font-size: $font24;
    }
    .notice-swipe {
      height: 40px;
      line-height: 40px;
    }
  }
</style>

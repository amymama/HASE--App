<template>
  <van-popup
    v-model="visible"
    position="right"
    :overlay="false"
    :style="{
      height: '100%',
      width: '100%'
    }">
    <div class="flex-layout notice-detail">
      <div class="flex-layout__header">
        <van-nav-bar
          left-arrow
          @click-left="visible = false"
          title="Notice Detail"
        />
      </div>
      <div class="flex-layout__body notice-content">
        <div class="notice-detail__title">
          <h2>{{ new_title }}</h2>
          <div class="notice-detail__desc">
            <van-tag v-if="new_announce_type == 0" type="primary">
              {{ $t('shopCommon.Announce') }}
            </van-tag>
            <van-tag v-if="new_announce_type == 1" type="warning">
              {{ $t('shopCommon.Policy') }}
            </van-tag>
            <span style="margin-left: 10px">{{ new_publish_time }}</span>
          </div>
        </div>
        <div class="notice-detail-content" v-html="content"></div>
      </div>
    </div>
  </van-popup>
</template>
<script>
import { getAnnounceContentById } from '@/api/annoucement'

export default {
  name: 'NoticeDetail',
  data() {
    return {
      visible: false,
      id: '',
      new_title: '',
      new_announce_type: '',
      new_publish_time: '',
      content: ''
    }
  },
  methods: {
    // SHOW MODAL
    show (record) {
      this.visible = true
      this.id = record.new_announceid
      this.new_title = record.new_title
      this.new_publish_time = record.new_publish_time
      this.new_announce_type = record.new_announce_type
      this.handleGetDetail()
    },
    // GET DETAIL
    handleGetDetail () {
      this.$toast.loading({
        message: "Loading...",
        forbidClick: true,
        duration: 0
      })
      this.content = ''
      getAnnounceContentById({
        id: this.id
      }).then((res) => {
        this.$toast.clear()
        const { success, data } = res
        if (success) {
          this.content = data.new_content
        }
      }).catch(() => {
        this.$toast.clear()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .notice-content{
    background: #FFF;
    padding: 0 24px;
    .notice-detail__title{
      padding: 24px 0;
      border-bottom: 1PX solid #E2E2E2;
      h2{
        font-size: $font32;
        margin-bottom: 12px;
      }
      .notice-detail__desc{
        font-size: 20px;
        color: #999;
      }
    }
    .notice-detail-content{
      padding: 24px 0;
      line-height: 180%;
      color: #333;
    }
  }
</style>
<style>
.notice-detail-content img{
  display: block;
  max-width: 100% !important;
  height: auto !important;
}
</style>

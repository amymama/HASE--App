<template>
  <div class="annoucement-detail">
    <van-popup
      v-model="visible"
      :close-on-click-overlay="false"
      :style="{
        width: '100%',
        height: '100%'
      }">
      <template v-for="(item, index) in list">
        <div class="flex-layout" v-if="current == index" :key="index">
          <div class='flex-layout__body' style="position: relative">
            <div class="annoucement-inner" :key="index">
              <div class="annoucement-innter-item">
                <div class="annoucement-inner__header">
                  <h2>{{ item.new_title }}</h2>
                  <p>{{ $t('shopAnnouncement.ReleaseDate') }}: {{ moment(item.new_publish_time).format('YYYY-MM-DD') }}</p>
                  <p>{{ $t('shopAnnouncement.ExpiredDate') }}: {{ moment(item.new_start_time).format('YYYY-MM-DD') }}-{{ moment(item.new_end_time).format('YYYY-MM-DD') }}</p>
                </div>
                <div class="annoucement-inner__body" v-html="item.new_content"></div>
              </div>
              <div class="custom-indicator">{{ current + 1 }}/{{ list.length }}</div>
            </div>
          </div>
          <div class="flex-layout__footer annoucement-footer">
            <van-checkbox v-model="checked">
              {{ $t('shopAnnouncement.AlreadyRead') }}
            </van-checkbox>
            <div class="next-notice">
              <van-button
                color="#2058AB"
                round
                block
                size="small"
                @click="handleClose(item)">
                Close
              </van-button>
            </div>
          </div>
        </div>
      </template>
    </van-popup>
  </div>
</template>
<script>
import moment from 'moment'
import { getAnnounceList, postUpInsertRecord } from '@/api/annoucement'

export default {
  name: 'Annoucement',
  data() {
    return {
      visible: false,
      checked: false,
      current: 0,
      list: []
    }
  },
  created () {
    this.handleGetAnnoucement()
  },
  methods: {
    moment,
    // get list
    handleGetAnnoucement () {
      this.$toast.loading({ duration: 0 })
      getAnnounceList().then((res) => {
        this.$toast.clear()
        const { success, data } = res
        if (success) {
          if (data.length == 0) {
            this.visible = false
          } else {
            this.visible = true
            this.list = data
          }
        } else {
          this.visible = false
        }
      }).catch(() => {
        this.visible = false
        this.$toast.clear()
      })
    },
    // close notice
    handleClose(item) {
      if (this.checked) {
        this.checked = false
        this.current ++
        if (this.current == this.list.length) {
          this.visible = false
        }
        this.uploadNoticeStatus(item)
      }
    },
    uploadNoticeStatus (item) {
      postUpInsertRecord({
        announceId: item.new_announceid,
        new_announce_recordId: item.new_announce_recordId
      }).then(() => {

      }).catch(() => {

      })
    },
  }
}
</script>
<style lang="scss" scoped>

.annoucement-detail{
  position: relative;
  .annoucement-body{
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    padding-bottom: 32px;
    padding: 0 24px;
    position: relative;
    .annoucement-item{
      padding: 24px;
    }
  }
  .custom-indicator {
    position: absolute;
    right: 12px;
    bottom: 12px;
    padding: 2px 10px;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.1);
    font-size: $font24;
  }
  .annoucement-inner{
    height: 100%;
    overflow-y: scroll;
    .annoucement-inner__header{
      padding: 24px;
      h2{
        font-weight: bold;
        font-size: $font32;
        margin-bottom: 12px;
        line-height: 50px;
      }
      p{
        font-size: $font24;
        color: #999;
        margin-bottom: 5px;
      }
    }
    .annoucement-inner__body{
      padding: 24px;
      padding-bottom: 48px;
      img{
        max-width: 100%;
        height: auto;
      }
    }
  }
  .annoucement-footer{
    background: #FFF;
    width: 100%;
    padding: 24px;
    border-top: 1PX solid #E2E2E2;
    box-sizing: border-box;
    font-size: $font24;
    .next-notice{
      padding: 12px 200px;
    }
  }
}
</style>
<style lang="scss">
  .annoucement-inner__body{
    font-size: $font24 !important;
    line-height: 180%;
    img{
      display: block;
      max-width: 100%;
      height: auto;
    }
  }
</style>
<template>
  <van-popup
    v-model="visible"
    position="right"
    closeable
    class="share-qrbox"
    :style="{
      height: '100%',
      width: '100%',
      background: '#2058AB'
    }"
  >
    <div class="share-qr" v-for="(item, index) in list" :key="index">
      <vue-qr :text="item.url" :size="220" />
      <p>{{ item.name }}</p>
    </div>
  </van-popup>
</template>
<script>
import VueQr from 'vue-qr'

export default {
  name: 'ShareQr',
  components: {
    VueQr
  },
  data() {
    return {
      list: [
        { 
          url: '',
          name: 'IOS & Android'
        }
      ],
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
      this.list[0].url = process.env.VUE_APP_DOWNLOAD_URL
    }
  }
}
</script>
<style lang="scss" scoped>
  .share-qrbox{
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .share-qr{
      text-align: center;
      margin-bottom: 24px;
      p{
        line-height: 60px;
        color: #FFF;
        font-size: $font32;
      }
    }
  }
</style>
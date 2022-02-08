<template>
  <div class="prev-imgs">
    <van-image-preview
      v-model="visible"
      :images="imgs"
      @change="onChange"
      :startPosition="index">
      <template v-slot:index>{{ index+1 }}</template>
      <template v-slot:cover v-if="showDownload">
        <span class="download-icon" @click="downloadNetImg">
          <van-icon name="down" />
        </span>
      </template>
    </van-image-preview>
  </div>
</template>

<script>
import downloadImg from '@/utils/downloadImg'

export default {
  name: 'PrevImgs',
  props: {
    imgs: {
      type: Array,
      required: true
    },
    showDownload : {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      visible: false,
      index: 0
    }
  },
  methods: {
    // 显示组件
    show(index) {
      this.visible = true
      this.index = index
    },
    // 切换图片
    onChange(index) {
      this.index = index
    },
    // 下载图片到本地
    downloadNetImg() {
      let link = this.imgs[this.index]
      downloadImg(link)
    }
  }
}
</script>

<style lang="scss">
.prev-imgs{
  .van-image-preview__cover{
    width: 100%;
  }
  .download-icon{
    display: block;
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    border-radius: 50%;
    background: #2058AB;
    color: #FFF;
    position: absolute;
    right: 32px;
    top: 32px;
    z-index: 9999;
  }
}
</style>
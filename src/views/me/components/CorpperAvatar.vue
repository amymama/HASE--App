<template>
	<!-- 剪裁图片组件 -->
  <van-popup
    class="bg-tran"
    v-model="visible"
    closeable
    position="top"
    :style="{
      height: '100%',
      background: '#FFF'
    }"
  >
    <div class="flex-column-center" style="height: 100%; position: relative">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.outputSize"
        :outputType="option.outputType"
        :info="option.info"
        :full="option.full"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
        :centerBox="option.centerBox"
        :infoTrue="option.infoTrue"
        :fixedBox="option.fixedBox"
        :high="option.high"
        :mode="option.mode"
      ></vueCropper>
      <van-col span="24" class="font14 col-white">
        <van-col span="8" class="avatar-action" @click="cancelCropper">
          Cancel
        </van-col>
        <van-col span="8" class="avatar-action" @click="rotateImage">
          <van-icon name="replay" />
        </van-col>
        <van-col span="8" class="avatar-action" @click="getCropData">
          OK
        </van-col>
      </van-col>
    </div>
  </van-popup>
</template>
<script>
import moment from 'moment'
import { postUplodWaterImg } from '@/api/common'
import { postUploadAvatar } from '@/api/user'
import { VueCropper }  from 'vue-cropper'

export default {
  name: 'CropperAvatar',
  components: {
    VueCropper,
  },
  data() {
    return {
      visible: false,
      s: '',
      option: {
        img: '',
        outputSize: 0.8,
        info: false, // 裁剪框的大小信息
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: window.innerWidth - 100 + 'px', // 默认生成截图框宽度
        autoCropHeight: window.innerWidth - 100 + 'px', // 默认生成截图框高度
        high: true, // 是否按照设备的dpr 输出等比例图片
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        mode: '100% auto' // 图片默认渲染方式
      }
    }
  },
  methods: {
    moment,
    // random string
    randomString (len) {
      len = len || 6
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
      var maxPos = chars.length
      var str = ''
      for (let i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return str
    },
    show(f) {
      this.visible = true
      this.option.img = f
    },
    // totate
    rotateImage() {
      this.$refs.cropper.rotateRight()
    },
    getCropData() {
      this.$refs.cropper.getCropData((data) => {
        this.handleUpload(data)
      })
    },
    // upload img
    handleUpload (content) {
      var file = {
        base64: content,
        text: '',
        folder: 'Sysuser',
        filename: `${moment().format('YYYYMMDDhhmmssSSS')}_${this.randomString(6)}.jpg`
      }
      this.$toast.loading({ duration: 0 })
      postUplodWaterImg(file).then((res) => {
        const { success, data } = res
        if (success) {
          var url = data.Items
          this.uploadAvatar(url)
        } else {
          this.$toast.fail('Upload fail')
        }
      }).catch(() => {
        this.$toast.fail('Network error')
      })
    },
    // upload avatar
    uploadAvatar (url) {
      this.$toast.loading({ duration: 0, forbidClick: true })
      var data = {
        userid: this.$store.getters.userInfo.id,
        url: url
      }
      postUploadAvatar(data).then((res) => {
        const { success } = res
        if (success) {
          this.$toast.success('Upload success')
          this.$store.commit('user/SET_AVATAR', url)
          this.visible = false
        } else {
          this.$toast.fail('Upload fail')
        }
      }).catch(() => {
        this.$toast.fail('Network error')
      })
    },
    // cancel
    cancelCropper() {
      this.showCropper = false
      this.showPopup = true
    }
  }
}
</script>
<style lang="less" scoped>
.col-white{
  background: #FFF;
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  z-index: 999;
  text-align: center;
  .avatar-action{
    padding: 32px 0;
  }
}
</style>
<template>
  <div>
    <van-action-sheet
      v-model="visible"
      :actions="actions"
      cancel-text="Close"
      close-on-click-action
      @select="onSelect"
      @cancel="onCancel"
    />
    <img :src="avatar" alt="">
    <!-- corpper avatar -->
    <corpper-avatar ref="corpperAvatar" @ok="changeAvatarOK"/>
  </div>
</template>
<script>
import CorpperAvatar from './CorpperAvatar'

export default {
  components: { CorpperAvatar },
  name: 'ChangeAvatar',
  data() {
    return {
      actions: [
        { type: 0, name: 'Camera' },
        { type: 1, name: 'Gallery' }
      ],
      visible: false,
      avatar: '',
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    onCancel() {
      this.visible = false
    },
    // select opation
    onSelect(item) {
      this.visible = false;
      switch (item.type) {
        case 0:
          this.handleTakePhoto()
          break;
        case 1:
          this.hangleGalleryImg(1)
          break;
      }
    },
    // [H5+]拍照
    handleTakePhoto() {
      var _this = this
      var c = plus.camera.getCamera()
      c.captureImage((e) => { 
        plus.io.resolveLocalFileSystemURL(e, (entry) => {
          entry.file((file) => {
            const fileReader = new window.plus.io.FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onloadend = (e) => {
              const base64Data = e.target.result.toString()
              _this.$refs.corpperAvatar.show(base64Data)
            }
          })
        }, (e) => { 
          console.log('Error:' + e.message)
        }) 
      }, (s) => { 
        console.log('error' + s)
      }, { 
        filename: '_doc/head.png' 
      })
    },
    // [H5+]选择相册
    hangleGalleryImg(num) {
      var _this = this
      plus.gallery.pick((e) => {
        for (var i in e.files) {
          plus.io.resolveLocalFileSystemURL(
            e.files[i],
            function(entry) {
              entry.file((file) => {
                const fileReader = new window.plus.io.FileReader()
                fileReader.readAsDataURL(file)
                fileReader.onloadend = (e) => {
                  const base64Data = e.target.result.toString()
                  _this.$refs.corpperAvatar.show(base64Data)
                }
              })
            },
            function(e) {
              outLine('Error reading photo file:' + e.message)
            }
          )
        }
      }, (e) => {
        console.log('Cancel')
      },{
        filter: 'image',
        multiple: true,
        maximum: num,
        system: false,
        onmaxed: function() {
          plus.nativeUI.alert(`You can select a maximum of ${num} image`)
        }
      })
    },
    changeAvatarOK (url) {
      this.$store.commit('user/SET_SET_AVATAR', url)
    }
  }
}
</script>
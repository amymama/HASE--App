<template>
    
</template>
<script>
export default {
  data() {
    return{
      
    } 
  },
  methods: {
    // 初始化相机
    initCamera() {
      if (window.plus) {
        const camera = window.plus.camera.getCamera()
        camera.captureImage((photo) => {
          window.plus.io.resolveLocalFileSystemURL(photo, (entry) => {
            Compress(entry.toLocalURL(), entry.name)
          }, () => {
            window.plus.nativeUI.toast('reading file error')
          })
        }, () => {
          window.plus.nativeUI.toast('camera error')
        }, {
          filename: '_downloads/shop/',
          format: camera.supportedImageFormats[0],
          index: 1,
          optimize: true,
          resolution: camera.supportedImageResolutions[0],
          popover: {
            top: '10px',
            left: '10px',
            width: '200px',
            height: '200px',
          }
        })
      }
    },

  }
}
</script>
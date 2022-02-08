<template>
  <van-popup :value="visible" position="right" style="width: 100%; height: 100%">
    <van-nav-bar left-arrow @click-left="handleClose"></van-nav-bar>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      barcode: null,
      promise: null,
      resolve: null,
      reject: null,
    };
  },
  mounted() {
    window.addEventListener('popstate', (e) => {
      e.stopPropagation()
      this.handleClose()
    })
  },
  methods: {
    showDialog() {
      return (this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
        this.createBarcode();
      }));
    },
    handleClose() {
      if (this.barcode) {
        this.barcode.cancel();
        this.barcode.close();
        this.barcode = null;
      }
      this.visible = false;
      this.reject();
    },
    createBarcode() {
      const { plus } = window;
      if (plus) {
        this.visible = true;
        if (!this.barcode) {
          this.barcode = plus.barcode.create("barcode", [plus.barcode.QR], {
            top: "42px",
            left: "0px",
            width: "100%",
            height: "100%",
            position: "absolute",
          });
          this.barcode.onmarked = (type, result) => {
            // 扫码成功回调
            /* switch (type) {
              case plus.barcode.QR:
                text = "QR: ";
                break;
              case plus.barcode.EAN13:
                text = "EAN13: ";
                break;
              case plus.barcode.EAN8:
                text = "EAN8: ";
                break;
            } */
            this.resolve(result);
            this.barcode.cancel();
            this.barcode.close();
            this.barcode = null;
            this.visible = false;
          };
          plus.webview.currentWebview().append(this.barcode);
        }
        this.barcode.start();
      } else {
        this.$toast("Please Use Mobile Devices");
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.handleClose)
    this.handleClose();
  },
};
</script>

<style lang="scss" scoped>
.scan-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  .scan-btn_close {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
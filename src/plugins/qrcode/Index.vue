<template>
  <van-overlay class-name="qr-container" :show="visible" @click="visible = false">
    <img :src="qrcode" alt="" class="qr-content" />
  </van-overlay>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      qrcode: null,
    };
  },
  methods: {
    init(opt) {
      for (let key in opt) {
        this[key] = opt[key];
      }
    },
    showDialog() {
      this.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.qr-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .qr-content {
    width: 500px;
    height: 500px;
  }
}
</style>
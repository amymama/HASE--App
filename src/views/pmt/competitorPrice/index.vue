<template>
  <div class="competitor-price-wrap">
    <TopBar
      :topBarTitle="this.$t('pmt.competitorPrice.title')"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
    ></TopBar>
    <div class="competitor-price-frame">
      <iframe :src="webUrl" frameborder="0" scrolling="auto" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>
<script>
  import TopBar from "@/components/TopBar";
export default {
  name: "competitorPrice",
  components: {
    TopBar
  },
  data() {
    return {
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",
      webUrl: ''
    }
  },
  created() {
    // this.webUrl = 'https://www.baidu.com'
    this.webUrl = 'https://ywzt.haier.net/ynocr/home?token=' + this.$store.getters.token
  },
  methods: {
    // 返回上一页
    topBarClickLeft() {
      this.$router.go(-1);
    },
  }

};
</script>
<style lang="scss" scoped>
.competitor-price-wrap{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .competitor-price-frame{
    position: absolute;
    top: 1.22667rem;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>

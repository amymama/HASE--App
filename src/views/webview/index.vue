<template>
  <div class="webview-wrap">
    <TopBar
      :topBarTitle="title"
      :leftHtml="topBarLeftHtml"
      :rightHtml="topBarRightHtml"
      @set_onClickLeft="topBarClickLeft"
    ></TopBar>
    <div class="webview-wrap-frame">
      <iframe :src="webUrl" frameborder="0" scrolling="auto" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>
<script>
  import TopBar from "@/components/TopBar";
export default {
  name: "Webview",
  components: {
    TopBar
  },
  data() {
    return {
      topBarLeftHtml: '<i class="van-icon van-icon-arrow-left"></i>',
      topBarRightHtml: "",
      webUrl: '',
      title: '',
    }
  },
  created() {
    this.title = decodeURI(this.$route.query.title)
    this.webUrl = decodeURI(this.$route.query.url)
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
.webview-wrap{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .webview-wrap-frame{
    position: absolute;
    top: 1.22667rem;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>

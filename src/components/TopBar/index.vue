<template>
  <div class="top-bar">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #title>
        <span class="page_header_title">{{ topBarTitle }}</span>
      </template>
      <template #left>
        <div class="page_header_left" v-html="leftHtml"></div>
      </template>
      <template #right>
        <div class="page_header_right" v-html="rightHtml"></div>
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  name: "TopBar",
  props: {
    templateStyle: String,
    topBarTitle: {
      type: String,
      default: "HOME",
    },
    leftHtml: {
      type: String,
      default: '<i class="van-icon van-icon-arrow-left"></i>',
    },
    rightHtml: {
      type: String,
      default: '<i class="van-icon van-icon-search"></i>',
    },
  },
  data() {
    return {};
  },
  methods: {
    //导航栏左侧点击
    onClickLeft() {
      this.$emit("set_onClickLeft");
    },
    //导航栏右侧点击
    onClickRight() {
      this.$emit("set_onClickRight");
    },
  },
};
</script>

<style lang="scss" scoped>
.top-bar {
  .page_header_right {
    font-size: 0.5rem;
  }
  .page_header_left {
    font-size: 0.5rem;
  }
}
</style>
<template>
  <van-popup :value="value" position="right" style="width: 100%; height: 100%">
    <van-nav-bar
      :title="`${$t('shopPosm.POP')} ${$t('shopPosm.GuideImage')}`"
      left-arrow
      @click-left="closePopup"
    ></van-nav-bar>
    <p v-if="!!guideImg" v-html="guideImg" class="guide-image"></p>
    <van-empty v-else :description="$t('shopCommon.NoGuideImage')"></van-empty>
  </van-popup>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    guideImg: {
      type: String,
      default: "",
    },
  },
  methods: {
    closePopup() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss">
.guide-image {
  padding: 10px;
  img {
    width: 100% !important;
    height: auto !important;
    object-fit: contain;
  }
}
</style>
<template>
  <div>
    <van-nav-bar fixed :title="title" left-arrow @click-left="clickLeft">
      <a
        v-action:NewPromotion:Add
        class="right-action"
        href="javascript:void(0)"
        slot="right"
        @click="clickRight"
        >{{ rightText }}</a
      >
    </van-nav-bar>
    <div class="page-hasnav">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$route.meta.title;
    },
    showRight() {
      return this.$route.name === "promotionList";
    },
    rightText() {
      return this.showRight ? "New" : "";
    },
  },
  methods: {
    clickLeft() {
      this.$router.go(-1);
    },
    clickRight() {
      this.$router.push({
        name: "newPromotion",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.right-action {
  color: #fff;
}
</style>
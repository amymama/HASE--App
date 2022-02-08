<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      :fixed="true"
      @click-left="clickLeft"
    >
      <van-badge
        v-action:PosmInOut:Add
        slot="right"
        :content="rightCount"
        @click.native="clickRight"
      >
        <span style="color: #fff">
          {{ rightText }}
        </span>
      </van-badge>
    </van-nav-bar>
    <div class="container page-hasnav">
      <router-view @getShop="getShop" @getCount="getCount"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopItem: {}, // 接收POSMList传来的shop值
      count: 0,
    };
  },
  computed: {
    isPosmList() {
      return this.$route.name === "PosmList";
    },
    isPosmInOut() {
      return this.$route.name === "PosmInOut";
    },
    isPosmRecord() {
      return this.$route.name === "PosmRecord";
    },
    title() {
      return this.$route.meta.title;
    },
    rightText() {
      return this.isPosmList
        ? this.$t("shopPosm.InOUT")
        : this.isPosmInOut
        ? ""
        : "New";
    },
    rightCount() {
      return this.isPosmList && this.count > 0 ? this.count : void 0;
    },
  },
  methods: {
    getCount(count) {
      this.count = count;
    },
    getShop(shop) {
      this.shopItem = shop;
    },
    clickLeft() {
      const route = {};
      switch (this.$route.name) {
        case "PosmRecord":
          route.name = "ShopHome";
          break;
        case "PosmHistoryDetail":
        case "PosmList":
          route.name = "PosmRecord";
          break;
        case "PosmInOut":
          route.name = "PosmList";
          route.query = this.shopItem;
          break;
        default:
          break;
      }
      this.$router.push(route);
    },
    clickRight() {
      const route = {
        name: this.isPosmList ? "PosmInOut" : "PosmList",
      };
      if (this.isPosmList) {
        route.query = this.shopItem;
        this.rightCount > 0 && this.$router.push(route);
        return;
      }
      this.$router.push(route);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>